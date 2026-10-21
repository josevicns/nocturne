import { describe, it, expect } from 'vitest';
import { parseOpenApiSpec } from '../parser.js';
import type { OpenAPIV3 } from 'openapi-types';

function createSpec(overrides: Partial<OpenAPIV3.Document> = {}): OpenAPIV3.Document {
  return {
    openapi: '3.0.0',
    info: { title: 'Test', version: '1.0.0' },
    paths: {},
    ...overrides,
  };
}

describe('parseOpenApiSpec', () => {
  it('parses operations with remote annotations', () => {
    const spec = createSpec({
      paths: {
        '/api/v4/trackers': {
          get: {
            tags: ['V4 Trackers'],
            operationId: 'Trackers_GetDefinitions',
            'x-remote-type': 'query',
            parameters: [],
            responses: {
              '200': {
                description: 'Success',
                content: {
                  'application/json': {
                    schema: { type: 'array', items: { $ref: '#/components/schemas/TrackerDto' } },
                  },
                },
              },
            },
          } as any,
        },
      },
    });

    const result = parseOpenApiSpec(spec);
    expect(result.operations).toHaveLength(1);
    expect(result.operations[0].operationId).toBe('Trackers_GetDefinitions');
    expect(result.operations[0].remoteType).toBe('query');
    expect(result.operations[0].tag).toBe('V4 Trackers');
  });

  it('skips operations without remote annotations', () => {
    const spec = createSpec({
      paths: {
        '/api/v4/trackers': {
          get: {
            tags: ['V4 Trackers'],
            operationId: 'Trackers_GetDefinitions',
            parameters: [],
            responses: { '200': { description: 'OK' } },
          } as any,
        },
      },
    });

    const result = parseOpenApiSpec(spec);
    expect(result.operations).toHaveLength(0);
  });

  it('detects enum parameters via $ref through oneOf', () => {
    const spec = createSpec({
      components: {
        schemas: {
          TrackerCategory: {
            type: 'string',
            enum: ['Consumable', 'Reservoir', 'Appointment'],
          } as any,
        },
      },
      paths: {
        '/api/v4/trackers': {
          get: {
            tags: ['V4 Trackers'],
            operationId: 'Trackers_GetDefinitions',
            'x-remote-type': 'query',
            parameters: [
              {
                name: 'category',
                in: 'query',
                schema: {
                  oneOf: [
                    { nullable: true, oneOf: [{ $ref: '#/components/schemas/TrackerCategory' }] },
                  ],
                },
              },
            ],
            responses: { '200': { description: 'OK' } },
          } as any,
        },
      },
    });

    const result = parseOpenApiSpec(spec);
    expect(result.operations[0].parameters[0].enumName).toBe('TrackerCategory');
    expect(result.operations[0].parameters[0].type).toBe('string');
  });

  it('detects enum parameters via direct $ref', () => {
    const spec = createSpec({
      components: {
        schemas: {
          TrackerCategory: {
            type: 'string',
            enum: ['Consumable', 'Reservoir'],
          } as any,
        },
      },
      paths: {
        '/api/v4/trackers': {
          get: {
            tags: ['V4 Trackers'],
            operationId: 'Trackers_GetDefinitions',
            'x-remote-type': 'query',
            parameters: [
              {
                name: 'category',
                in: 'query',
                schema: { $ref: '#/components/schemas/TrackerCategory' },
              },
            ],
            responses: { '200': { description: 'OK' } },
          } as any,
        },
      },
    });

    const result = parseOpenApiSpec(spec);
    expect(result.operations[0].parameters[0].enumName).toBe('TrackerCategory');
  });

  it('detects void response for 204 command endpoints', () => {
    const spec = createSpec({
      paths: {
        '/api/v4/trackers/{id}': {
          delete: {
            tags: ['V4 Trackers'],
            operationId: 'Trackers_DeleteDefinition',
            'x-remote-type': 'command',
            'x-remote-invalidates': ['GetDefinitions'],
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
            responses: { '204': { description: 'No content' } },
          } as any,
        },
      },
    });

    const result = parseOpenApiSpec(spec);
    expect(result.operations[0].isVoidResponse).toBe(true);
  });

  it('detects void response for commands with 200 but no JSON body', () => {
    const spec = createSpec({
      paths: {
        '/api/v4/trackers/{id}': {
          delete: {
            tags: ['V4 Trackers'],
            operationId: 'Trackers_DeleteDefinition',
            'x-remote-type': 'command',
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
            responses: { '200': { description: '' } },
          } as any,
        },
      },
    });

    const result = parseOpenApiSpec(spec);
    expect(result.operations[0].isVoidResponse).toBe(true);
  });

  it('does not mark as void when command 200 has JSON content', () => {
    const spec = createSpec({
      paths: {
        '/api/v4/trackers': {
          post: {
            tags: ['V4 Trackers'],
            operationId: 'Trackers_Create',
            'x-remote-type': 'command',
            parameters: [],
            requestBody: {
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Request' } } },
            },
            responses: {
              '200': {
                description: 'OK',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/TrackerDto' } } },
              },
            },
          } as any,
        },
      },
    });

    const result = parseOpenApiSpec(spec);
    expect(result.operations[0].isVoidResponse).toBe(false);
  });

  it('does not mark queries as void even without response schema', () => {
    const spec = createSpec({
      paths: {
        '/api/v4/trackers': {
          get: {
            tags: ['V4 Trackers'],
            operationId: 'Trackers_GetDefinitions',
            'x-remote-type': 'query',
            parameters: [],
            responses: { '200': { description: 'OK' } },
          } as any,
        },
      },
    });

    const result = parseOpenApiSpec(spec);
    expect(result.operations[0].isVoidResponse).toBe(false);
  });

  it('parses 201 response schema for create endpoints', () => {
    const spec = createSpec({
      paths: {
        '/api/v4/trackers': {
          post: {
            tags: ['V4 Trackers'],
            operationId: 'Trackers_Create',
            'x-remote-type': 'command',
            parameters: [],
            requestBody: {
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Request' } } },
            },
            responses: {
              '201': {
                description: 'Created',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/TrackerDto' } } },
              },
            },
          } as any,
        },
      },
    });

    const result = parseOpenApiSpec(spec);
    expect(result.operations[0].responseSchema).toBe('TrackerDto');
    expect(result.operations[0].isVoidResponse).toBe(false);
  });

  it('parses array response types', () => {
    const spec = createSpec({
      paths: {
        '/api/v4/trackers': {
          get: {
            tags: ['V4 Trackers'],
            operationId: 'Trackers_GetDefinitions',
            'x-remote-type': 'query',
            parameters: [],
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: { type: 'array', items: { $ref: '#/components/schemas/TrackerDefinitionDto' } },
                  },
                },
              },
            },
          } as any,
        },
      },
    });

    const result = parseOpenApiSpec(spec);
    expect(result.operations[0].responseSchema).toBe('TrackerDefinitionDto[]');
  });

  it('parses single-object response types', () => {
    const spec = createSpec({
      paths: {
        '/api/v4/trackers/{id}': {
          get: {
            tags: ['V4 Trackers'],
            operationId: 'Trackers_GetDefinition',
            'x-remote-type': 'query',
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
            responses: {
              '200': {
                description: 'OK',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/TrackerDefinitionDto' } } },
              },
            },
          } as any,
        },
      },
    });

    const result = parseOpenApiSpec(spec);
    expect(result.operations[0].responseSchema).toBe('TrackerDefinitionDto');
  });

  it('parses request body schema', () => {
    const spec = createSpec({
      paths: {
        '/api/v4/trackers': {
          post: {
            tags: ['V4 Trackers'],
            operationId: 'Trackers_Create',
            'x-remote-type': 'command',
            parameters: [],
            requestBody: {
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/CreateTrackerDefinitionRequest' },
                },
              },
            },
            responses: {
              '200': {
                description: 'OK',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/TrackerDto' } } },
              },
            },
          } as any,
        },
      },
    });

    const result = parseOpenApiSpec(spec);
    expect(result.operations[0].requestBodySchema).toBe('CreateTrackerDefinitionRequestSchema');
  });

  it('parses invalidation targets', () => {
    const spec = createSpec({
      paths: {
        '/api/v4/trackers': {
          post: {
            tags: ['V4 Trackers'],
            operationId: 'Trackers_Create',
            'x-remote-type': 'command',
            'x-remote-invalidates': ['GetDefinitions', 'Trackers_GetActiveInstances'],
            parameters: [],
            requestBody: {
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Request' } } },
            },
            responses: { '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/Dto' } } } } },
          } as any,
        },
      },
    });

    const result = parseOpenApiSpec(spec);
    expect(result.operations[0].invalidates).toEqual(['GetDefinitions', 'Trackers_GetActiveInstances']);
  });

  it('parses array request body schema', () => {
    const spec = createSpec({
      paths: {
        '/api/v4/treatments/bulk': {
          post: {
            tags: ['V4 Treatments'],
            operationId: 'Treatments_CreateTreatments',
            'x-remote-type': 'command',
            'x-remote-invalidates': ['GetTreatments'],
            parameters: [],
            requestBody: {
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Treatment' },
                  },
                },
              },
            },
            responses: {
              '201': {
                description: 'Created',
                content: {
                  'application/json': {
                    schema: { type: 'array', items: { $ref: '#/components/schemas/Treatment' } },
                  },
                },
              },
            },
          } as any,
        },
      },
    });

    const result = parseOpenApiSpec(spec);
    expect(result.operations[0].requestBodySchema).toBe('TreatmentSchema');
    expect(result.operations[0].isArrayBody).toBe(true);
  });

  it('sets isArrayBody to false for non-array request bodies', () => {
    const spec = createSpec({
      paths: {
        '/api/v4/trackers': {
          post: {
            tags: ['V4 Trackers'],
            operationId: 'Trackers_Create',
            'x-remote-type': 'command',
            parameters: [],
            requestBody: {
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/CreateTrackerDefinitionRequest' },
                },
              },
            },
            responses: {
              '200': {
                description: 'OK',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/TrackerDto' } } },
              },
            },
          } as any,
        },
      },
    });

    const result = parseOpenApiSpec(spec);
    expect(result.operations[0].requestBodySchema).toBe('CreateTrackerDefinitionRequestSchema');
    expect(result.operations[0].isArrayBody).toBe(false);
  });

  it('parses x-client-property from operations', () => {
    const spec = createSpec({
      paths: {
        '/api/v4/foods': {
          get: {
            tags: ['V4 Foods'],
            operationId: 'Foods_GetFavorites',
            'x-remote-type': 'query',
            'x-client-property': 'foodsV4',
            parameters: [],
            responses: { '200': { description: 'OK' } },
          } as any,
        },
      },
    });

    const result = parseOpenApiSpec(spec);
    expect(result.operations[0].clientPropertyName).toBe('foodsV4');
  });

  it('sets clientPropertyName to undefined when x-client-property is absent', () => {
    const spec = createSpec({
      paths: {
        '/api/v4/trackers': {
          get: {
            tags: ['V4 Trackers'],
            operationId: 'Trackers_GetDefinitions',
            'x-remote-type': 'query',
            parameters: [],
            responses: { '200': { description: 'OK' } },
          } as any,
        },
      },
    });

    const result = parseOpenApiSpec(spec);
    expect(result.operations[0].clientPropertyName).toBeUndefined();
  });

  it('does not include schemas property in ParsedSpec', () => {
    const spec = createSpec({
      components: { schemas: { Foo: { type: 'object' } as any } },
      paths: {},
    });

    const result = parseOpenApiSpec(spec);
    expect(result).not.toHaveProperty('schemas');
  });

  it('parses form remote type', () => {
    const spec = createSpec({
      paths: {
        '/api/v4/foods/favorites': {
          post: {
            tags: ['V4 Foods'],
            operationId: 'Foods_AddFavorite',
            'x-remote-type': 'form',
            'x-remote-invalidates': ['GetFavorites'],
            parameters: [],
            requestBody: {
              content: { 'application/json': { schema: { $ref: '#/components/schemas/AddFavoriteRequest' } } },
            },
            responses: { '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/FoodDto' } } } } },
          } as any,
        },
      },
    });

    const result = parseOpenApiSpec(spec);
    expect(result.operations[0].remoteType).toBe('form');
    expect(result.operations[0].invalidates).toEqual(['GetFavorites']);
  });

  it('detects void response for form endpoints', () => {
    const spec = createSpec({
      paths: {
        '/api/v4/foods/favorites/{id}': {
          delete: {
            tags: ['V4 Foods'],
            operationId: 'Foods_RemoveFavorite',
            'x-remote-type': 'form',
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
            responses: { '204': { description: 'No content' } },
          } as any,
        },
      },
    });

    const result = parseOpenApiSpec(spec);
    expect(result.operations[0].isVoidResponse).toBe(true);
  });

  it('parses x-remote-batch on query endpoints', () => {
    const spec = createSpec({
      paths: {
        '/api/v4/trackers/{id}': {
          get: {
            tags: ['V4 Trackers'],
            operationId: 'Trackers_GetDefinition',
            'x-remote-type': 'query',
            'x-remote-batch': true,
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
            responses: { '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/TrackerDefinitionDto' } } } } },
          } as any,
        },
      },
    });

    const result = parseOpenApiSpec(spec);
    expect(result.operations[0].isBatch).toBe(true);
  });

  it('isBatch is false when x-remote-batch is absent', () => {
    const spec = createSpec({
      paths: {
        '/api/v4/trackers/{id}': {
          get: {
            tags: ['V4 Trackers'],
            operationId: 'Trackers_GetDefinition',
            'x-remote-type': 'query',
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
            responses: { '200': { description: 'OK' } },
          } as any,
        },
      },
    });

    const result = parseOpenApiSpec(spec);
    expect(result.operations[0].isBatch).toBe(false);
  });

  it('detects multipart/form-data file upload endpoints (IFormFile)', () => {
    const spec = createSpec({
      paths: {
        '/api/v4/me/avatar': {
          post: {
            tags: ['Avatar'],
            operationId: 'Avatar_Upload',
            'x-remote-type': 'command',
            requestBody: {
              content: {
                'multipart/form-data': {
                  schema: {
                    properties: {
                      ContentType: { type: 'string', nullable: true },
                      ContentDisposition: { type: 'string', nullable: true },
                      Headers: { type: 'array', nullable: true, items: {} },
                      Length: { type: 'integer', format: 'int64' },
                      Name: { type: 'string', nullable: true },
                      FileName: { type: 'string', nullable: true },
                    },
                  },
                },
              },
            },
            responses: {
              '200': {
                description: '',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/UploadResponse' } } },
              },
            },
          } as any,
        },
      },
    });

    const result = parseOpenApiSpec(spec);
    expect(result.operations[0].isFileUpload).toBe(true);
    expect(result.operations[0].fileFieldName).toBe('file');
  });

  it('does not detect non-IFormFile multipart as file upload', () => {
    const spec = createSpec({
      paths: {
        '/api/v4/form': {
          post: {
            tags: ['Forms'],
            operationId: 'Forms_Submit',
            'x-remote-type': 'command',
            requestBody: {
              content: {
                'multipart/form-data': {
                  schema: {
                    properties: {
                      name: { type: 'string' },
                      email: { type: 'string' },
                    },
                  },
                },
              },
            },
            responses: { '200': { description: 'OK' } },
          } as any,
        },
      },
    });

    const result = parseOpenApiSpec(spec);
    expect(result.operations[0].isFileUpload).toBeUndefined();
  });

  it('detects application/x-www-form-urlencoded request bodies', () => {
    const spec = createSpec({
      paths: {
        '/api/oauth/device-approve': {
          post: {
            tags: ['OAuth'],
            operationId: 'OAuth_DeviceApprove',
            'x-remote-type': 'form',
            requestBody: {
              required: true,
              content: {
                'application/x-www-form-urlencoded': {
                  schema: {
                    type: 'object',
                    required: ['user_code'],
                    properties: {
                      user_code: { type: 'string' },
                      remember: { type: 'boolean' },
                    },
                  },
                },
              },
            },
            responses: { '200': { description: 'OK' } },
          } as any,
        },
      },
    });

    const result = parseOpenApiSpec(spec);
    expect(result.operations[0].isUrlEncoded).toBe(true);
    expect(result.operations[0].urlEncodedProperties).toEqual([
      { name: 'user_code', type: 'string', required: true },
      { name: 'remember', type: 'boolean', required: false },
    ]);
  });

  it('does not set isUrlEncoded when multipart/form-data is also present', () => {
    const spec = createSpec({
      paths: {
        '/api/form': {
          post: {
            tags: ['Forms'],
            operationId: 'Forms_Submit',
            'x-remote-type': 'form',
            requestBody: {
              content: {
                'application/x-www-form-urlencoded': {
                  schema: {
                    type: 'object',
                    properties: { name: { type: 'string' } },
                  },
                },
                'multipart/form-data': {
                  schema: {
                    type: 'object',
                    properties: { name: { type: 'string' } },
                  },
                },
              },
            },
            responses: { '200': { description: 'OK' } },
          } as any,
        },
      },
    });

    const result = parseOpenApiSpec(spec);
    expect(result.operations[0].isUrlEncoded).toBeUndefined();
  });

  it('does not set isUrlEncoded for application/json bodies', () => {
    const spec = createSpec({
      paths: {
        '/api/v4/trackers': {
          post: {
            tags: ['V4 Trackers'],
            operationId: 'Trackers_Create',
            'x-remote-type': 'command',
            parameters: [],
            requestBody: {
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Request' },
                },
              },
            },
            responses: { '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/Dto' } } } } },
          } as any,
        },
      },
    });

    const result = parseOpenApiSpec(spec);
    expect(result.operations[0].isUrlEncoded).toBeUndefined();
  });

  it('isBatch is false for command endpoints even with x-remote-batch', () => {
    const spec = createSpec({
      paths: {
        '/api/v4/trackers/{id}': {
          delete: {
            tags: ['V4 Trackers'],
            operationId: 'Trackers_DeleteDefinition',
            'x-remote-type': 'command',
            'x-remote-batch': true,
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
            responses: { '204': { description: 'No content' } },
          } as any,
        },
      },
    });

    const result = parseOpenApiSpec(spec);
    expect(result.operations[0].isBatch).toBe(false);
  });
  it('binds an array of primitives as an inline body (bulk operations taking Guid[])', () => {
    const spec = createSpec({
      paths: {
        '/api/v4/trackers/bulk-restore': {
          post: {
            tags: ['V4 Trackers'],
            operationId: 'Trackers_BulkRestore',
            'x-remote-type': 'command',
            parameters: [],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: { type: 'array', items: { type: 'string', format: 'uuid' } },
                },
              },
            },
            responses: { '204': { description: 'No content' } },
          } as any,
        },
      },
    });

    const op = parseOpenApiSpec(spec).operations[0];
    expect(op.inlineRequestBody).toEqual({
      zodSchema: 'z.array(z.string())',
      tsType: 'string[]',
      emptyValue: '[]',
    });
    expect(op.requestBodySchema).toBe('');
    expect(op.isArrayBody).toBe(false);
    expect(op.requestBodyRequired).toBe(true);
  });

  it('maps each primitive item type in an array body', () => {
    const cases: [OpenAPIV3.SchemaObject, string, string][] = [
      [{ type: 'integer' }, 'z.array(z.number())', 'number[]'],
      [{ type: 'number' }, 'z.array(z.number())', 'number[]'],
      [{ type: 'boolean' }, 'z.array(z.boolean())', 'boolean[]'],
      [{ type: 'string', format: 'date-time' }, 'z.array(z.coerce.date())', 'Date[]'],
    ];

    for (const [items, zodSchema, tsType] of cases) {
      const spec = createSpec({
        paths: {
          '/api/v4/things/bulk': {
            post: {
              tags: ['V4 Things'],
              operationId: 'Things_Bulk',
              'x-remote-type': 'command',
              parameters: [],
              requestBody: {
                required: true,
                content: { 'application/json': { schema: { type: 'array', items } } },
              },
              responses: { '204': { description: 'No content' } },
            } as any,
          },
        },
      });

      const op = parseOpenApiSpec(spec).operations[0];
      expect(op.inlineRequestBody).toEqual({ zodSchema, tsType, emptyValue: '[]' });
    }
  });

  it('leaves an array of non-primitive, non-$ref items unbound', () => {
    const spec = createSpec({
      paths: {
        '/api/v4/things/bulk': {
          post: {
            tags: ['V4 Things'],
            operationId: 'Things_Bulk',
            'x-remote-type': 'command',
            parameters: [],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: { type: 'array', items: { type: 'object', properties: {} } },
                },
              },
            },
            responses: { '204': { description: 'No content' } },
          } as any,
        },
      },
    });

    const op = parseOpenApiSpec(spec).operations[0];
    expect(op.inlineRequestBody).toBeUndefined();
    expect(op.requestBodySchema).toBeUndefined();
  });

  it('binds dictionary bodies to the value type the client declares', () => {
    const cases: [OpenAPIV3.SchemaObject | boolean, string, string][] = [
      [{ type: 'string' }, 'z.record(z.string(), z.string())', '{ [key: string]: string; }'],
      [{ type: 'integer' }, 'z.record(z.string(), z.number())', '{ [key: string]: number; }'],
      [{ type: 'boolean' }, 'z.record(z.string(), z.boolean())', '{ [key: string]: boolean; }'],
      [
        { type: 'string', format: 'date-time' },
        'z.record(z.string(), z.coerce.date())',
        '{ [key: string]: Date; }',
      ],
      [true, 'z.record(z.string(), z.unknown())', '{ [key: string]: any; }'],
    ];

    for (const [additionalProperties, zodSchema, tsType] of cases) {
      const spec = createSpec({
        paths: {
          '/api/v4/settings': {
            put: {
              tags: ['V4 Settings'],
              operationId: 'Settings_Replace',
              'x-remote-type': 'command',
              parameters: [],
              requestBody: {
                required: true,
                content: {
                  'application/json': { schema: { type: 'object', additionalProperties } },
                },
              },
              responses: { '204': { description: 'No content' } },
            } as any,
          },
        },
      });

      const op = parseOpenApiSpec(spec).operations[0];
      expect(op.inlineRequestBody).toEqual({ zodSchema, tsType });
    }
  });

  describe('dateTimeType', () => {
    function arrayBodySpec(items: OpenAPIV3.SchemaObject): OpenAPIV3.Document {
      return createSpec({
        paths: {
          '/api/v4/things/bulk': {
            post: {
              tags: ['V4 Things'],
              operationId: 'Things_Bulk',
              'x-remote-type': 'command',
              parameters: [],
              requestBody: {
                required: true,
                content: { 'application/json': { schema: { type: 'array', items } } },
              },
              responses: { '204': { description: 'No content' } },
            } as any,
          },
        },
      });
    }

    it('binds an inline date-time as an ISO string when the client uses strings', () => {
      const spec = arrayBodySpec({ type: 'string', format: 'date-time' });
      const op = parseOpenApiSpec(spec, { dateTimeType: 'string' }).operations[0];
      expect(op.inlineRequestBody).toEqual({
        zodSchema: 'z.array(z.iso.datetime({ offset: true }))',
        tsType: 'string[]',
        emptyValue: '[]',
      });
    });

    it('binds an inline date-time as a Date by default', () => {
      const spec = arrayBodySpec({ type: 'string', format: 'date-time' });
      const op = parseOpenApiSpec(spec).operations[0];
      expect(op.inlineRequestBody?.tsType).toBe('Date[]');
    });

    it('marks a date-time parameter Date whatever the option, for the generator to decide', () => {
      const spec = createSpec({
        paths: {
          '/api/v4/things': {
            get: {
              tags: ['V4 Things'],
              operationId: 'Things_List',
              'x-remote-type': 'query',
              parameters: [
                { name: 'from', in: 'query', required: true, schema: { type: 'string', format: 'date-time' } },
              ],
              responses: { '200': { description: 'OK' } },
            } as any,
          },
        },
      });
      const op = parseOpenApiSpec(spec, { dateTimeType: 'string' }).operations[0];
      expect(op.parameters[0].type).toBe('Date');
    });
  });
});
