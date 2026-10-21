import type { OpenAPIV3 } from 'openapi-types';
import type { DateTimeType } from './config.js';
import { dateTimeZodSchema } from './utils/date-time.js';
import type { OperationInfo, InlineRequestBody, ParsedSpec, ParameterInfo, RemoteType, UrlEncodedProperty } from './types.js';

// Extended operation type to include our custom extensions
type OperationWithExtensions = OpenAPIV3.OperationObject & {
  'x-remote-type'?: RemoteType;
  'x-remote-invalidates'?: string[];
  'x-client-property'?: string;
  'x-remote-batch'?: boolean;
};

export interface ParseOptions {
  /** As `GeneratorConfig.dateTimeType`; shapes inline request bodies. Default: `'Date'`. */
  dateTimeType?: DateTimeType;
}

export function parseOpenApiSpec(spec: OpenAPIV3.Document, options: ParseOptions = {}): ParsedSpec {
  const dateTimeType = options.dateTimeType ?? 'Date';
  const operations: OperationInfo[] = [];
  const tagsSet = new Set<string>();

  for (const [path, pathItem] of Object.entries(spec.paths ?? {})) {
    if (!pathItem) continue;

    const methods = ['get', 'post', 'put', 'patch', 'delete'] as const;

    for (const method of methods) {
      const operation = pathItem[method] as OperationWithExtensions | undefined;
      if (!operation) continue;

      const remoteType = operation['x-remote-type'];
      if (!remoteType) continue;

      const tag = operation.tags?.[0] ?? 'Default';
      tagsSet.add(tag);

      const invalidates = operation['x-remote-invalidates'] ?? [];

      const parameters = parseParameters(
        operation.parameters ?? [],
        pathItem.parameters ?? [],
        spec.components
      );
      const requestBodyResult = parseRequestBody(
        operation.requestBody as OpenAPIV3.RequestBodyObject | undefined,
        dateTimeType
      );
      const requestBodySchema = requestBodyResult?.schema;
      const isArrayBody = requestBodyResult?.isArray ?? false;

      // Detect multipart/form-data file uploads (NSwag decomposes IFormFile into metadata properties)
      const fileUploadResult = parseFileUpload(operation.requestBody as OpenAPIV3.RequestBodyObject | undefined);

      // Detect application/x-www-form-urlencoded (e.g., OAuth endpoints)
      const urlEncodedResult = parseUrlEncodedBody(operation.requestBody as OpenAPIV3.RequestBodyObject | undefined);

      // Check success response codes in priority order (200, 201, 202)
      const responseSchema =
        parseResponse(operation.responses?.['200'] as OpenAPIV3.ResponseObject | undefined) ??
        parseResponse(operation.responses?.['201'] as OpenAPIV3.ResponseObject | undefined) ??
        parseResponse(operation.responses?.['202'] as OpenAPIV3.ResponseObject | undefined);

      // Detect void response: commands with no JSON response body (204 No Content, or 200 with no body)
      const isVoidResponse = !responseSchema && (remoteType === 'command' || remoteType === 'form');
      const isBatch = remoteType === 'query' && (operation['x-remote-batch'] === true);

      operations.push({
        operationId: operation.operationId ?? `${method}_${path}`,
        tag,
        method,
        path,
        remoteType,
        invalidates,
        parameters,
        requestBodySchema,
        requestBodyRequired: requestBodyResult?.required,
        isArrayBody,
        inlineRequestBody: requestBodyResult?.inline,
        isFileUpload: fileUploadResult?.isFileUpload,
        fileFieldName: fileUploadResult?.fieldName,
        isUrlEncoded: urlEncodedResult?.isUrlEncoded,
        urlEncodedProperties: urlEncodedResult?.properties,
        responseSchema,
        isVoidResponse,
        isBatch,
        summary: operation.summary,
        clientPropertyName: operation['x-client-property'],
      });
    }
  }

  return {
    operations,
    tags: Array.from(tagsSet),
  };
}

function parseParameters(
  opParams: (OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject)[],
  pathParams: (OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject)[],
  components?: OpenAPIV3.ComponentsObject
): ParameterInfo[] {
  const allParams = [...pathParams, ...opParams];
  const result: ParameterInfo[] = [];

  for (const param of allParams) {
    if ('$ref' in param) continue;

    const schema = param.schema as OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject | undefined;
    const resolved = resolveSchema(schema, components);

    const paramInfo: ParameterInfo = {
      name: param.name,
      in: param.in as 'query' | 'path' | 'header',
      required: param.required ?? false,
      type: getSchemaType(resolved),
    };

    // Check if the resolved schema is an enum
    if (resolved?.enum) {
      const enumName = findEnumName(schema, components);
      if (enumName) {
        paramInfo.enumName = enumName;
      }
    }

    // For array parameters, capture the item type and enum name
    if (resolved?.type === 'array' && resolved.items) {
      const itemSchemaRaw = resolved.items as OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject;
      const itemSchema = resolveSchema(itemSchemaRaw, components);
      paramInfo.itemType = getSchemaType(itemSchema);

      if (itemSchema?.enum) {
        const itemEnumName = findEnumName(itemSchemaRaw, components);
        if (itemEnumName) {
          paramInfo.itemEnumName = itemEnumName;
        }
      }
    }

    result.push(paramInfo);
  }

  return result;
}

/**
 * Resolve a schema through $ref and oneOf to get the underlying schema object.
 */
function resolveSchema(
  schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject | undefined,
  components?: OpenAPIV3.ComponentsObject
): OpenAPIV3.SchemaObject | undefined {
  if (!schema) return undefined;

  if ('$ref' in schema) {
    const refName = schema.$ref.split('/').pop();
    if (refName && components?.schemas?.[refName]) {
      return components.schemas[refName] as OpenAPIV3.SchemaObject;
    }
    return undefined;
  }

  // Handle oneOf wrapping (NSwag nullable enums)
  const schemaObj = schema as OpenAPIV3.SchemaObject;
  if (schemaObj.oneOf) {
    for (const item of schemaObj.oneOf) {
      const resolved = resolveSchema(
        item as OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject,
        components
      );
      if (resolved?.type || resolved?.enum) return resolved;
    }
  }

  return schemaObj;
}

/**
 * Find the enum type name from a schema that may be wrapped in oneOf/$ref.
 */
function findEnumName(
  schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject | undefined,
  components?: OpenAPIV3.ComponentsObject
): string | undefined {
  if (!schema) return undefined;

  if ('$ref' in schema) {
    const refName = schema.$ref.split('/').pop();
    if (refName && components?.schemas?.[refName]) {
      const resolved = components.schemas[refName] as OpenAPIV3.SchemaObject;
      if (resolved.enum) return refName;
    }
    return undefined;
  }

  const schemaObj = schema as OpenAPIV3.SchemaObject;
  if (schemaObj.oneOf) {
    for (const item of schemaObj.oneOf) {
      const name = findEnumName(
        item as OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject,
        components
      );
      if (name) return name;
    }
  }

  return undefined;
}

interface RequestBodyParseResult {
  schema: string;
  isArray: boolean;
  required: boolean;
  inline?: InlineRequestBody;
}

function parseRequestBody(
  body: OpenAPIV3.RequestBodyObject | undefined,
  dateTimeType: DateTimeType
): RequestBodyParseResult | undefined {
  if (!body?.content?.['application/json']?.schema) return undefined;

  const required = body.required ?? false;
  const schema = body.content['application/json'].schema;
  if ('$ref' in schema) {
    const refName = schema.$ref.split('/').pop();
    return refName ? { schema: `${refName}Schema`, isArray: false, required } : undefined;
  }

  // Handle array request bodies (e.g., Treatment[])
  const schemaObj = schema as OpenAPIV3.SchemaObject;
  if (schemaObj.type === 'array' && schemaObj.items) {
    const items = schemaObj.items as OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject;
    if ('$ref' in items) {
      const itemName = items.$ref.split('/').pop();
      return itemName ? { schema: `${itemName}Schema`, isArray: true, required } : undefined;
    }

    // Arrays of primitives (e.g., Guid[]) have no named schema to import, so they bind inline.
    const item = resolvePrimitiveSchema(items as OpenAPIV3.SchemaObject, dateTimeType);
    if (item) {
      return {
        schema: '',
        isArray: false,
        required,
        inline: {
          zodSchema: `z.array(${item.zodSchema})`,
          tsType: `${item.tsType}[]`,
          emptyValue: '[]',
        },
      };
    }
  }

  // Handle inline object schemas (e.g., Dictionary<string, string> -> { type: "object", additionalProperties: ... })
  if (schemaObj.type === 'object' && schemaObj.additionalProperties) {
    const inline = resolveInlineObjectSchema(schemaObj, dateTimeType);
    if (inline) {
      return { schema: '', isArray: false, required, inline };
    }
  }

  return undefined;
}

/**
 * Convert an inline OpenAPI object schema with additionalProperties to a Zod schema and TS type.
 * Handles Dictionary<TKey, TValue> patterns from C#.
 */
function resolveInlineObjectSchema(
  schema: OpenAPIV3.SchemaObject,
  dateTimeType: DateTimeType
): InlineRequestBody | undefined {
  const additionalProps = schema.additionalProperties;
  const unknownRecord: InlineRequestBody = {
    zodSchema: 'z.record(z.string(), z.unknown())',
    tsType: '{ [key: string]: any; }',
  };

  // additionalProperties: true or {} -> Record<string, unknown>
  if (!additionalProps || additionalProps === true) return unknownRecord;

  if (typeof additionalProps === 'object' && !('$ref' in additionalProps)) {
    const value = resolvePrimitiveSchema(additionalProps as OpenAPIV3.SchemaObject, dateTimeType);
    if (!value) return unknownRecord;
    return {
      zodSchema: `z.record(z.string(), ${value.zodSchema})`,
      tsType: `{ [key: string]: ${value.tsType}; }`,
    };
  }

  return undefined;
}

/**
 * Convert a primitive OpenAPI schema to a Zod schema and the TypeScript type the
 * generated NSwag client declares for it. Returns undefined for anything that is
 * not a primitive, so callers can fall back to their own handling.
 */
function resolvePrimitiveSchema(
  schema: OpenAPIV3.SchemaObject,
  dateTimeType: DateTimeType
): { zodSchema: string; tsType: string } | undefined {
  switch (getSchemaType(schema)) {
    case 'string':
      return { zodSchema: 'z.string()', tsType: 'string' };
    case 'number':
      return { zodSchema: 'z.number()', tsType: 'number' };
    case 'boolean':
      return { zodSchema: 'z.boolean()', tsType: 'boolean' };
    case 'Date':
      return { zodSchema: dateTimeZodSchema(dateTimeType), tsType: dateTimeType };
    default:
      return undefined;
  }
}

function parseResponse(response: OpenAPIV3.ResponseObject | undefined): string | undefined {
  if (!response?.content?.['application/json']?.schema) return undefined;

  const schema = response.content['application/json'].schema;
  if ('$ref' in schema) {
    return schema.$ref.split('/').pop();
  }

  // Handle array responses (e.g., TrackerDefinitionDto[])
  const schemaObj = schema as OpenAPIV3.SchemaObject;
  if (schemaObj.type === 'array' && schemaObj.items) {
    const items = schemaObj.items as OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject;
    if ('$ref' in items) {
      const itemName = items.$ref.split('/').pop();
      return itemName ? `${itemName}[]` : undefined;
    }
  }

  return undefined;
}

/**
 * Detect multipart/form-data file upload endpoints.
 *
 * NSwag decomposes C# IFormFile into its properties (ContentType, ContentDisposition,
 * Headers, Length, Name, FileName). We detect this pattern and mark the operation as a
 * file upload so the generator can produce a function that accepts a File object.
 *
 * The heuristic: a multipart/form-data schema that contains properties typical of
 * IFormFile (FileName, ContentType, Length) rather than normal form fields.
 */
function parseFileUpload(body: OpenAPIV3.RequestBodyObject | undefined): { isFileUpload: boolean; fieldName: string } | undefined {
  if (!body?.content?.['multipart/form-data']?.schema) return undefined;

  const schema = body.content['multipart/form-data'].schema;
  if ('$ref' in schema) return undefined;

  const schemaObj = schema as OpenAPIV3.SchemaObject;
  const props = schemaObj.properties;
  if (!props) return undefined;

  const propNames = new Set(Object.keys(props).map(k => k.toLowerCase()));

  // IFormFile signature: has FileName, ContentType, and Length properties
  const isIFormFile = propNames.has('filename') && propNames.has('contenttype') && propNames.has('length');

  if (isIFormFile) {
    // The field name defaults to "file" — the actual parameter name from the C# controller.
    // NSwag doesn't preserve it in the decomposed schema, so we use the conventional name.
    return { isFileUpload: true, fieldName: 'file' };
  }

  return undefined;
}

/**
 * Detect application/x-www-form-urlencoded request bodies.
 *
 * When an endpoint specifies `application/x-www-form-urlencoded` (and NOT `multipart/form-data`),
 * the generated code should use URLSearchParams instead of FormData.
 * If both content types are present, we skip this (FormData handles both).
 */
function parseUrlEncodedBody(
  body: OpenAPIV3.RequestBodyObject | undefined
): { isUrlEncoded: boolean; properties: UrlEncodedProperty[] } | undefined {
  if (!body?.content?.['application/x-www-form-urlencoded']?.schema) return undefined;

  // If multipart/form-data is also present, prefer FormData (it handles both)
  if (body.content['multipart/form-data']) return undefined;

  const schema = body.content['application/x-www-form-urlencoded'].schema;
  if ('$ref' in schema) return undefined;

  const schemaObj = schema as OpenAPIV3.SchemaObject;
  const props = schemaObj.properties;
  if (!props) return { isUrlEncoded: true, properties: [] };

  const requiredSet = new Set(schemaObj.required ?? []);
  const properties: UrlEncodedProperty[] = Object.entries(props).map(([name, propSchema]) => {
    const prop = propSchema as OpenAPIV3.SchemaObject;
    return {
      name,
      type: prop.type ?? 'string',
      required: requiredSet.has(name),
    };
  });

  return { isUrlEncoded: true, properties };
}

/**
 * The parameter type token for a schema. `'Date'` marks `format: date-time`
 * whatever {@link ParseOptions.dateTimeType} says; the generator decides how a
 * date-time is validated.
 */
function getSchemaType(schema: OpenAPIV3.SchemaObject | undefined): string {
  if (!schema) return 'unknown';

  if (schema.type === 'string') {
    if (schema.format === 'uuid') return 'string';
    if (schema.format === 'date-time') return 'Date';
    return 'string';
  }
  if (schema.type === 'integer' || schema.type === 'number') return 'number';
  if (schema.type === 'boolean') return 'boolean';
  if (schema.type === 'array') return 'array';

  return 'unknown';
}
