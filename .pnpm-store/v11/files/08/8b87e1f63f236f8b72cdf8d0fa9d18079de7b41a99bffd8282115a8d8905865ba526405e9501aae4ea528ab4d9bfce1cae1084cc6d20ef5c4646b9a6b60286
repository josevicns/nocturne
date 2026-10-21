export type RemoteType = 'query' | 'command' | 'form';

export interface ParameterInfo {
  name: string;
  in: 'query' | 'path' | 'header';
  required: boolean;
  type: string;
  enumName?: string;
  /** For array-type parameters, the type of each item (e.g., 'string', 'number') */
  itemType?: string;
  /** For array-type parameters whose items are an enum, the enum type name */
  itemEnumName?: string;
}

/**
 * Represents an inline request body that doesn't have a named $ref schema.
 * Used for types like Dictionary<string, string> which become { type: "object", additionalProperties: ... }.
 */
export interface InlineRequestBody {
  /** Zod schema expression (e.g., "z.record(z.string(), z.string())") */
  zodSchema: string;
  /** TypeScript type for the NSwag client cast (e.g., "{ [key: string]: string; }") */
  tsType: string;
  /**
   * Expression substituted for an omitted optional body. Defaults to `{}`;
   * array bodies set `[]` so the cast to their TS type stays sound.
   */
  emptyValue?: string;
}

export interface OperationInfo {
  operationId: string;
  tag: string;
  method: string;
  path: string;
  remoteType: RemoteType;
  invalidates: string[];
  parameters: ParameterInfo[];
  requestBodySchema?: string;
  requestBodyRequired?: boolean;
  isArrayBody?: boolean;
  /** Inline request body for schemas that don't have a named $ref (e.g., Dictionary<string, string>) */
  inlineRequestBody?: InlineRequestBody;
  /** Whether this operation accepts a file upload (multipart/form-data with IFormFile) */
  isFileUpload?: boolean;
  /** The form field name for file upload (e.g., "file") */
  fileFieldName?: string;
  /** Whether this operation uses application/x-www-form-urlencoded (not multipart/form-data) */
  isUrlEncoded?: boolean;
  /** Property names and types for url-encoded request bodies */
  urlEncodedProperties?: UrlEncodedProperty[];
  responseSchema?: string;
  isVoidResponse: boolean;
  /** Whether this query should use query.batch() for N+1 prevention */
  isBatch?: boolean;
  summary?: string;
  clientPropertyName?: string;
}

export interface UrlEncodedProperty {
  name: string;
  type: string;
  required: boolean;
}

export interface ParsedSpec {
  operations: OperationInfo[];
  tags: string[];
}
