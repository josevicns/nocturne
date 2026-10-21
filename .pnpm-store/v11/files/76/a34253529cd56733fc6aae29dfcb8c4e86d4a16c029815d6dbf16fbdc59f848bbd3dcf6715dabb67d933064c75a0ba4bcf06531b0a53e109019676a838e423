import { describe, it, expect } from 'vitest';
import { generateRemoteFunctions } from '../generators/remote-functions.js';
import { resolveConfig } from '../config.js';
import type { OperationInfo, ParsedSpec } from '../types.js';

const defaultConfig = resolveConfig({});

function createOperation(overrides: Partial<OperationInfo> = {}): OperationInfo {
  return {
    operationId: 'Foods_GetFavorites',
    tag: 'V4 Foods',
    method: 'get',
    path: '/api/v4/foods/favorites',
    remoteType: 'query',
    invalidates: [],
    parameters: [],
    isVoidResponse: false,
    clientPropertyName: 'foodsV4',
    ...overrides,
  };
}

function getGeneratedFile(parsed: ParsedSpec, fileName: string): string {
  const files = generateRemoteFunctions(parsed, defaultConfig);
  const content = files.get(fileName);
  if (!content) {
    const available = Array.from(files.keys()).join(', ');
    throw new Error(`File "${fileName}" not found. Available: ${available}`);
  }
  return content;
}

describe('generateRemoteFunctions', () => {
  describe('imports', () => {
    it('imports redirect from @sveltejs/kit', () => {
      const parsed: ParsedSpec = {
        operations: [createOperation()],
        tags: ['V4 Foods'],
      };

      const content = getGeneratedFile(parsed, 'foods.generated.remote.ts');
      expect(content).toContain("import { error, redirect } from '@sveltejs/kit';");
    });

    it('leaves redirect out of a file whose only redirect would be a query 401', () => {
      const parsed: ParsedSpec = {
        operations: [createOperation({
          operationId: 'Foods_SyncAll',
          remoteType: 'command',
          isVoidResponse: true,
        })],
        tags: ['V4 Foods'],
      };

      const content = getGeneratedFile(parsed, 'foods.generated.remote.ts');
      expect(content).toContain("import { error } from '@sveltejs/kit';");
      expect(content).not.toMatch(/\bredirect\b/);
    });

    it('imports redirect wherever a configured arm calls it', () => {
      const config = resolveConfig({
        errorHandling: { on403: "throw redirect(302, '/forbidden')" },
      });
      const parsed: ParsedSpec = {
        operations: [createOperation({
          operationId: 'Foods_SyncAll',
          remoteType: 'command',
          isVoidResponse: true,
        })],
        tags: ['V4 Foods'],
      };

      const content = generateRemoteFunctions(parsed, config).get('foods.generated.remote.ts')!;
      expect(content).toContain("import { error, redirect } from '@sveltejs/kit';");
    });

    it('omits the kit import when no arm calls into it', () => {
      const config = resolveConfig({
        errorHandling: {
          on401: 'throw new Error("401")',
          on403: 'throw new Error("403")',
          on500: () => 'throw err',
        },
      });
      const parsed: ParsedSpec = {
        operations: [createOperation()],
        tags: ['V4 Foods'],
      };

      const content = generateRemoteFunctions(parsed, config).get('foods.generated.remote.ts')!;
      expect(content).not.toContain("from '@sveltejs/kit'");
    });

    it('does not mistake a method named redirect for a call to it', () => {
      const config = resolveConfig({
        errorHandling: { on401: 'throw error(401, "Unauthorized")' },
      });
      const parsed: ParsedSpec = {
        operations: [createOperation({ operationId: 'Links_Redirect', clientPropertyName: 'links' })],
        tags: ['V4 Foods'],
      };

      const content = generateRemoteFunctions(parsed, config).get('foods.generated.remote.ts')!;
      expect(content).toContain('apiClient.links.redirect()');
      expect(content).toContain("import { error } from '@sveltejs/kit';");
    });
  });

  describe('query parameters', () => {
    const statsOp = (required: boolean[]) =>
      createOperation({
        operationId: 'Statistics_GetRange',
        clientPropertyName: 'statistics',
        parameters: required.map((r, i) => ({
          name: `p${i}`,
          in: 'query' as const,
          required: r,
          type: 'string',
        })),
      });

    it('requires the params object, and reads it directly, when any param is required', () => {
      const parsed: ParsedSpec = { operations: [statsOp([true, false])], tags: ['V4 Foods'] };

      const content = getGeneratedFile(parsed, 'foods.generated.remote.ts');
      expect(content).toContain('query(z.object({ p0: z.string(), p1: z.string().optional() }), async (params)');
      expect(content).toContain('getRange(params.p0, params.p1)');
      expect(content).not.toContain('params?.');
    });

    it('keeps the params object optional when every param is', () => {
      const parsed: ParsedSpec = { operations: [statsOp([false, false])], tags: ['V4 Foods'] };

      const content = getGeneratedFile(parsed, 'foods.generated.remote.ts');
      expect(content).toContain('query(z.object({ p0: z.string().optional(), p1: z.string().optional() }).optional(), async (params)');
      expect(content).toContain('getRange(params?.p0, params?.p1)');
    });

    it('requires the params object of a batch query with a required param', () => {
      const parsed: ParsedSpec = {
        operations: [{ ...statsOp([true]), isBatch: true }],
        tags: ['V4 Foods'],
      };

      const content = getGeneratedFile(parsed, 'foods.generated.remote.ts');
      expect(content).toContain('query.batch(z.object({ p0: z.string() }), async (args)');
      expect(content).toContain('getRange(params.p0)');
    });
  });

  describe('dateTimeType', () => {
    const dateOp = createOperation({
      operationId: 'Statistics_GetRange',
      clientPropertyName: 'statistics',
      parameters: [
        { name: 'from', in: 'query', required: true, type: 'Date' },
        { name: 'days', in: 'query', required: false, type: 'array', itemType: 'Date' },
      ],
    });
    const parsed: ParsedSpec = { operations: [dateOp], tags: ['V4 Foods'] };

    it('coerces date-time params to Date by default', () => {
      const content = getGeneratedFile(parsed, 'foods.generated.remote.ts');
      expect(content).toContain('from: z.coerce.date()');
      expect(content).toContain('days: z.array(z.coerce.date()).optional()');
    });

    it('validates date-time params as ISO strings when the client takes strings', () => {
      const config = resolveConfig({ dateTimeType: 'string' });
      const content = generateRemoteFunctions(parsed, config).get('foods.generated.remote.ts')!;
      expect(content).toContain('from: z.iso.datetime({ offset: true })');
      expect(content).toContain('days: z.array(z.iso.datetime({ offset: true })).optional()');
      expect(content).not.toContain('z.coerce.date()');
    });

    it('emits a string schema that takes ISO text and refuses Date#toString()', async () => {
      const { z } = await import('zod');
      const schema = z.iso.datetime({ offset: true });
      const at = new Date('2026-09-24T01:02:03.000Z');
      expect(schema.parse(at.toISOString())).toBe('2026-09-24T01:02:03.000Z');
      expect(schema.safeParse('2026-09-24T11:02:03+10:00').success).toBe(true);
      expect(schema.safeParse(at.toString()).success).toBe(false);
      expect(schema.safeParse(at).success).toBe(false);
    });
  });

  describe('typedSchemas', () => {
    const typed = resolveConfig({ typedSchemas: true });
    const bodyOps: OperationInfo[] = [
      createOperation({
        operationId: 'Foods_Create',
        remoteType: 'command',
        requestBodySchema: 'CreateFoodRequestSchema',
        requestBodyRequired: true,
      }),
      createOperation({
        operationId: 'Foods_Update',
        remoteType: 'command',
        requestBodySchema: 'UpdateFoodRequestSchema',
        requestBodyRequired: true,
        parameters: [{ name: 'id', in: 'path', required: true, type: 'string' }],
      }),
      createOperation({
        operationId: 'Foods_BulkCreate',
        remoteType: 'command',
        requestBodySchema: 'FoodSchema',
        requestBodyRequired: true,
        isArrayBody: true,
      }),
      createOperation({
        operationId: 'Foods_Touch',
        remoteType: 'command',
        requestBodySchema: 'TouchRequestSchema',
        requestBodyRequired: false,
      }),
      createOperation({
        operationId: 'Foods_AddFavorite',
        remoteType: 'form',
        requestBodySchema: 'AddFavoriteRequestSchema',
        requestBodyRequired: true,
      }),
    ];
    const parsed: ParsedSpec = { operations: bodyOps, tags: ['V4 Foods'] };

    it('casts request bodies and form schemas by default', () => {
      const content = getGeneratedFile(parsed, 'foods.generated.remote.ts');
      expect(content).toContain('create(request as CreateFoodRequest)');
      expect(content).toContain('update(id, request as UpdateFoodRequest)');
      expect(content).toContain('bulkCreate(request as Food[])');
      expect(content).toContain('form(formCoerce(AddFavoriteRequestSchema) as any, async (request)');
    });

    it('hands a typed body to the client uncast', () => {
      const content = generateRemoteFunctions(parsed, typed).get('foods.generated.remote.ts')!;
      expect(content).toContain('apiClient.foodsV4.create(request);');
      expect(content).toContain('apiClient.foodsV4.update(id, request);');
      expect(content).toContain('apiClient.foodsV4.bulkCreate(request);');
      expect(content).not.toContain('request as ');
    });

    it('imports only the DTO types a cast still names', () => {
      const content = generateRemoteFunctions(parsed, typed).get('foods.generated.remote.ts')!;
      expect(content).toContain("import { type TouchRequest } from '$api';");
    });

    it('still casts the empty body substituted for an omitted optional one', () => {
      const content = generateRemoteFunctions(parsed, typed).get('foods.generated.remote.ts')!;
      expect(content).toContain('touch((request ?? {}) as TouchRequest)');
    });

    it('passes a typed form schema through formCoerce without as any', () => {
      const content = generateRemoteFunctions(parsed, typed).get('foods.generated.remote.ts')!;
      expect(content).toContain('form(formCoerce(AddFavoriteRequestSchema), async (request)');
      expect(content).not.toContain('as any, async');
    });

    it('drops as any from a url-encoded form schema', () => {
      const parsedUrl: ParsedSpec = {
        operations: [createOperation({
          operationId: 'OAuth_Token',
          tag: 'OAuth',
          method: 'post',
          path: '/oauth/token',
          remoteType: 'form',
          isUrlEncoded: true,
          urlEncodedProperties: [{ name: 'grant_type', type: 'string', required: true }],
        })],
        tags: ['OAuth'],
      };
      const content = generateRemoteFunctions(parsedUrl, typed).get('oauths.generated.remote.ts')!;
      expect(content).toContain('form(formCoerce(z.object({ grant_type: z.string() })), async (request)');
    });

    it('emits a formCoerce typed to the schema output and a form payload input', () => {
      const utils = generateRemoteFunctions(parsed, typed).get('form-utils.generated.ts')!;
      expect(utils).toContain("import type { RemoteFormInput } from '@sveltejs/kit';");
      expect(utils).toContain(
        'export function formCoerce<T extends z.ZodType>(schema: T): z.ZodType<z.output<T>, FormInput<T>>'
      );
    });

    it('keeps the untyped formCoerce by default', () => {
      const utils = getGeneratedFile(parsed, 'form-utils.generated.ts');
      expect(utils).not.toContain('RemoteFormInput');
      expect(utils).toContain('export function formCoerce<T extends z.ZodTypeAny>(schema: T) {');
    });
  });

  describe('auth error handling in query functions', () => {
    it('includes 401 redirect in no-arg query catch block', () => {
      const parsed: ParsedSpec = {
        operations: [createOperation()],
        tags: ['V4 Foods'],
      };

      const content = getGeneratedFile(parsed, 'foods.generated.remote.ts');
      expect(content).toContain("const status = (err as any)?.status;");
      expect(content).toContain("if (status === 401) { const { url } = getRequestEvent(); throw redirect(302, `/auth/login?returnUrl=${encodeURIComponent(url.pathname + url.search)}`); }");
      expect(content).toContain("if (status === 403) { throw error(403, remoteErrorMessage(err, 'Forbidden')); }");
    });

    it('includes 401 redirect in parameterized query catch block', () => {
      const parsed: ParsedSpec = {
        operations: [createOperation({
          operationId: 'Foods_GetById',
          parameters: [{ name: 'id', in: 'path', required: true, type: 'string' }],
        })],
        tags: ['V4 Foods'],
      };

      const content = getGeneratedFile(parsed, 'foods.generated.remote.ts');
      expect(content).toContain("const status = (err as any)?.status;");
      expect(content).toContain("if (status === 401) { const { url } = getRequestEvent(); throw redirect(302, `/auth/login?returnUrl=${encodeURIComponent(url.pathname + url.search)}`); }");
      expect(content).toContain("if (status === 403) { throw error(403, remoteErrorMessage(err, 'Forbidden')); }");
    });

    it('delegates the fallback arm to translateRemoteError in query', () => {
      const parsed: ParsedSpec = {
        operations: [createOperation()],
        tags: ['V4 Foods'],
      };

      const content = getGeneratedFile(parsed, 'foods.generated.remote.ts');
      expect(content).toContain("throw translateRemoteError(err, 'Failed to get favorites');");
    });
  });

  describe('auth error handling in command functions', () => {
    it('uses error(401) instead of redirect in no-arg command catch block', () => {
      const parsed: ParsedSpec = {
        operations: [createOperation({
          operationId: 'Foods_SyncAll',
          remoteType: 'command',
          isVoidResponse: true,
        })],
        tags: ['V4 Foods'],
      };

      const content = getGeneratedFile(parsed, 'foods.generated.remote.ts');
      expect(content).toContain("const status = (err as any)?.status;");
      expect(content).toContain("if (status === 401) { throw error(401, 'Unauthorized'); }");
      expect(content).not.toContain("redirect(302");
      expect(content).toContain("if (status === 403) { throw error(403, remoteErrorMessage(err, 'Forbidden')); }");
    });

    it('uses error(401) instead of redirect in parameterized command catch block', () => {
      const parsed: ParsedSpec = {
        operations: [createOperation({
          operationId: 'Foods_DeleteFood',
          remoteType: 'command',
          isVoidResponse: true,
          parameters: [{ name: 'id', in: 'path', required: true, type: 'string' }],
        })],
        tags: ['V4 Foods'],
      };

      const content = getGeneratedFile(parsed, 'foods.generated.remote.ts');
      expect(content).toContain("const status = (err as any)?.status;");
      expect(content).toContain("if (status === 401) { throw error(401, 'Unauthorized'); }");
      expect(content).not.toContain("redirect(302");
      expect(content).toContain("if (status === 403) { throw error(403, remoteErrorMessage(err, 'Forbidden')); }");
    });

    it('delegates the fallback arm to translateRemoteError in command', () => {
      const parsed: ParsedSpec = {
        operations: [createOperation({
          operationId: 'Foods_DeleteFood',
          remoteType: 'command',
          isVoidResponse: true,
          parameters: [{ name: 'id', in: 'path', required: true, type: 'string' }],
        })],
        tags: ['V4 Foods'],
      };

      const content = getGeneratedFile(parsed, 'foods.generated.remote.ts');
      expect(content).toContain("throw translateRemoteError(err, 'Failed to delete food');");
    });
  });

  describe('403 arm', () => {
    it('emits the arm inside a block so it can span statements', () => {
      const parsed: ParsedSpec = {
        operations: [createOperation()],
        tags: ['V4 Foods'],
      };

      // An arm that has to inspect the thrown value before deciding — parsing an
      // unparsed error body, say — needs more than one statement under the guard.
      const content = generateRemoteFunctions(parsed, resolveConfig({
        errorHandling: { on403: "const reason = 'nope';\n    throw error(403, reason)" },
      })).get('foods.generated.remote.ts')!;

      expect(content).toContain("if (status === 403) { const reason = 'nope';");
      expect(content).toContain('    throw error(403, reason); }');
    });
  });

  describe('error handling imports', () => {
    it('emits import lines the arms depend on', () => {
      const parsed: ParsedSpec = {
        operations: [createOperation()],
        tags: ['V4 Foods'],
      };

      const content = generateRemoteFunctions(parsed, resolveConfig({
        errorHandling: {
          imports: ["import { parseErrorBody } from '$lib/api/error-body';"],
          on403: 'throw error(403, parseErrorBody(err)?.detail ?? \'Forbidden\')',
        },
      })).get('foods.generated.remote.ts')!;

      expect(content).toContain("import { parseErrorBody } from '$lib/api/error-body';");
    });

    it('emits none by default', () => {
      const parsed: ParsedSpec = {
        operations: [createOperation()],
        tags: ['V4 Foods'],
      };

      const content = getGeneratedFile(parsed, 'foods.generated.remote.ts');
      expect(content).not.toContain('error-body');
    });
  });

  describe('catch block ordering', () => {
    it('places auth checks before console.error in query', () => {
      const parsed: ParsedSpec = {
        operations: [createOperation()],
        tags: ['V4 Foods'],
      };

      const content = getGeneratedFile(parsed, 'foods.generated.remote.ts');
      const statusIndex = content.indexOf("const status = (err as any)?.status;");
      const redirectIndex = content.indexOf("if (status === 401) {");
      const forbiddenIndex = content.indexOf("if (status === 403) {");
      const consoleIndex = content.indexOf("console.error('Error in foodsV4.getFavorites:', err);");
      const error500Index = content.indexOf("throw translateRemoteError(err, 'Failed to get favorites');");

      expect(statusIndex).toBeLessThan(redirectIndex);
      expect(redirectIndex).toBeLessThan(forbiddenIndex);
      expect(forbiddenIndex).toBeLessThan(consoleIndex);
      expect(consoleIndex).toBeLessThan(error500Index);
    });

    it('places auth checks before console.error in command', () => {
      const parsed: ParsedSpec = {
        operations: [createOperation({
          operationId: 'Foods_SyncAll',
          remoteType: 'command',
          isVoidResponse: true,
        })],
        tags: ['V4 Foods'],
      };

      const content = getGeneratedFile(parsed, 'foods.generated.remote.ts');
      const statusIndex = content.indexOf("const status = (err as any)?.status;");
      const redirectIndex = content.indexOf("if (status === 401) {");
      const forbiddenIndex = content.indexOf("if (status === 403) {");
      const consoleIndex = content.indexOf("console.error('Error in foodsV4.syncAll:', err);");
      const error500Index = content.indexOf("throw translateRemoteError(err, 'Failed to sync all');");

      expect(statusIndex).toBeLessThan(redirectIndex);
      expect(redirectIndex).toBeLessThan(forbiddenIndex);
      expect(forbiddenIndex).toBeLessThan(consoleIndex);
      expect(consoleIndex).toBeLessThan(error500Index);
    });
  });

  describe('form functions', () => {
    it('generates form() wrapper for form operations', () => {
      const parsed: ParsedSpec = {
        operations: [createOperation({
          operationId: 'Foods_AddFavorite',
          remoteType: 'form',
          requestBodySchema: 'AddFavoriteRequestSchema',
        })],
        tags: ['V4 Foods'],
      };

      const content = getGeneratedFile(parsed, 'foods.generated.remote.ts');
      expect(content).toContain('= form(');
      expect(content).not.toContain('= command(');
    });

    it('imports form from $app/server when forms present', () => {
      const parsed: ParsedSpec = {
        operations: [createOperation({
          operationId: 'Foods_AddFavorite',
          remoteType: 'form',
          requestBodySchema: 'AddFavoriteRequestSchema',
        })],
        tags: ['V4 Foods'],
      };

      const content = getGeneratedFile(parsed, 'foods.generated.remote.ts');
      expect(content).toContain("import { getRequestEvent, form } from '$app/server'");
    });

    it('does not import invalid from @sveltejs/kit when forms present', () => {
      const parsed: ParsedSpec = {
        operations: [createOperation({
          operationId: 'Foods_AddFavorite',
          remoteType: 'form',
          requestBodySchema: 'AddFavoriteRequestSchema',
        })],
        tags: ['V4 Foods'],
      };

      const content = getGeneratedFile(parsed, 'foods.generated.remote.ts');
      expect(content).toContain("import { error } from '@sveltejs/kit'");
      expect(content).not.toContain('invalid');
    });

    it('routes refreshes through refreshInvalidated rather than awaiting them raw', () => {
      const parsed: ParsedSpec = {
        operations: [
          createOperation({ operationId: 'Foods_GetFavorites', remoteType: 'query' }),
          createOperation({
            operationId: 'Foods_AddFavorite',
            remoteType: 'command',
            requestBodySchema: 'AddFavoriteRequestSchema',
            invalidates: ['GetFavorites'],
          }),
        ],
        tags: ['V4 Foods'],
      };

      const content = getGeneratedFile(parsed, 'foods.generated.remote.ts');

      // A refresh runs after the write has landed, so it must not be able to
      // reject the command and report the write as failed.
      expect(content).toContain("await refreshInvalidated('addFavorite', [");
      expect(content).not.toContain('await Promise.all([');
      expect(content).toContain(
        "import { refreshInvalidated } from './invalidation.generated.js';"
      );
    });

    it('emits the invalidation helper module, which cannot reject', () => {
      const parsed: ParsedSpec = {
        operations: [
          createOperation({ operationId: 'Foods_GetFavorites', remoteType: 'query' }),
          createOperation({
            operationId: 'Foods_AddFavorite',
            remoteType: 'command',
            requestBodySchema: 'AddFavoriteRequestSchema',
            invalidates: ['GetFavorites'],
          }),
        ],
        tags: ['V4 Foods'],
      };

      const content = getGeneratedFile(parsed, 'invalidation.generated.ts');
      expect(content).toContain('export async function refreshInvalidated');
      expect(content).toContain('Promise.allSettled');
    });

    it('omits the invalidation helper module when nothing invalidates', () => {
      const parsed: ParsedSpec = {
        operations: [createOperation()],
        tags: ['V4 Foods'],
      };

      const files = generateRemoteFunctions(parsed, defaultConfig);
      expect(files.has('invalidation.generated.ts')).toBe(false);
    });

    it('refreshes every cached argument key alongside the fixed key', () => {
      const parsed: ParsedSpec = {
        operations: [
          createOperation({
            operationId: 'Foods_GetFavorites',
            remoteType: 'query',
            parameters: [{ name: 'count', in: 'query', required: false, type: 'integer' }],
          }),
          createOperation({
            operationId: 'Foods_AddFavorite',
            remoteType: 'command',
            requestBodySchema: 'AddFavoriteRequestSchema',
            invalidates: ['GetFavorites'],
          }),
        ],
        tags: ['V4 Foods'],
      };

      const content = getGeneratedFile(parsed, 'foods.generated.remote.ts');

      // The fixed key only reaches a subscription passing no argument; a
      // subscription passing { count: 100 } is a different key entirely.
      expect(content).toContain('() => getFavorites(undefined).refresh()');
      expect(content).toContain('() => requested(getFavorites, Infinity).refreshAll()');
      expect(content).toContain("import { getRequestEvent, query, command, requested } from '$app/server';");
    });

    it('imports a query another tag declares instead of dropping the invalidation', () => {
      const parsed: ParsedSpec = {
        operations: [
          createOperation({
            operationId: 'MemberInvite_GetMembers',
            tag: 'V4 Member Invites',
            remoteType: 'query',
            clientPropertyName: 'memberInvites',
          }),
          createOperation({
            operationId: 'Tenant_RemoveMember',
            tag: 'V4 Tenant',
            remoteType: 'command',
            clientPropertyName: 'tenant',
            requestBodySchema: 'RemoveMemberRequestSchema',
            invalidates: ['MemberInvite_GetMembers'],
          }),
        ],
        tags: ['V4 Member Invites', 'V4 Tenant'],
      };

      const content = getGeneratedFile(parsed, 'tenants.generated.remote.ts');
      expect(content).toContain(
        "import { getMembers } from './memberInvites.generated.remote.js';"
      );
      expect(content).toContain('() => getMembers(undefined).refresh()');
    });

    it('passes a path parameter the mutation shares with the query', () => {
      const parsed: ParsedSpec = {
        operations: [
          createOperation({
            operationId: 'Foods_GetById',
            remoteType: 'query',
            parameters: [{ name: 'id', in: 'path', required: true, type: 'string' }],
          }),
          createOperation({
            operationId: 'Foods_Update',
            remoteType: 'command',
            parameters: [{ name: 'id', in: 'path', required: true, type: 'string' }],
            requestBodySchema: 'UpdateFoodRequestSchema',
            invalidates: ['GetById'],
          }),
        ],
        tags: ['V4 Foods'],
      };

      const content = getGeneratedFile(parsed, 'foods.generated.remote.ts');
      expect(content).toContain('() => getById(id).refresh()');
    });

    it('includes refresh calls in form functions', () => {
      const parsed: ParsedSpec = {
        operations: [
          createOperation({
            operationId: 'Foods_GetFavorites',
            remoteType: 'query',
          }),
          createOperation({
            operationId: 'Foods_AddFavorite',
            remoteType: 'form',
            requestBodySchema: 'AddFavoriteRequestSchema',
            invalidates: ['GetFavorites'],
          }),
        ],
        tags: ['V4 Foods'],
      };

      const content = getGeneratedFile(parsed, 'foods.generated.remote.ts');
      expect(content).toContain('refresh()');
    });

    it('does not import invalid when no forms present', () => {
      const parsed: ParsedSpec = {
        operations: [createOperation()],
        tags: ['V4 Foods'],
      };

      const content = getGeneratedFile(parsed, 'foods.generated.remote.ts');
      expect(content).not.toContain('invalid');
    });

    it('wraps a lone path param in an object schema for form operations', () => {
      // form() handlers receive an object decoded from FormData, never a bare
      // scalar, so a top-level scalar schema could never validate.
      const parsed: ParsedSpec = {
        operations: [createOperation({
          operationId: 'Foods_DeleteFavorite',
          method: 'delete',
          path: '/api/v4/foods/favorites/{id}',
          remoteType: 'form',
          parameters: [{ name: 'id', in: 'path', required: true, type: 'string' }],
        })],
        tags: ['V4 Foods'],
      };

      const content = getGeneratedFile(parsed, 'foods.generated.remote.ts');
      expect(content).toContain('formCoerce(z.object({ id: z.string() }))');
      expect(content).toContain('async ({ id })');
    });

    it('keeps the bare scalar schema for command operations with a lone path param', () => {
      const parsed: ParsedSpec = {
        operations: [createOperation({
          operationId: 'Foods_DeleteFavorite',
          method: 'delete',
          path: '/api/v4/foods/favorites/{id}',
          remoteType: 'command',
          parameters: [{ name: 'id', in: 'path', required: true, type: 'string' }],
        })],
        tags: ['V4 Foods'],
      };

      const content = getGeneratedFile(parsed, 'foods.generated.remote.ts');
      expect(content).toContain('command(z.string()');
    });
  });

  describe('batch query functions', () => {
    it('generates query.batch() for batch queries', () => {
      const parsed: ParsedSpec = {
        operations: [createOperation({
          operationId: 'Foods_GetById',
          remoteType: 'query',
          isBatch: true,
          parameters: [{ name: 'id', in: 'path', required: true, type: 'string' }],
        })],
        tags: ['V4 Foods'],
      };

      const content = getGeneratedFile(parsed, 'foods.generated.remote.ts');
      expect(content).toContain('= query.batch(');
    });

    it('falls back to regular query for no-arg batch', () => {
      const parsed: ParsedSpec = {
        operations: [createOperation({
          operationId: 'Foods_GetAll',
          remoteType: 'query',
          isBatch: true,
          parameters: [],
        })],
        tags: ['V4 Foods'],
      };

      const content = getGeneratedFile(parsed, 'foods.generated.remote.ts');
      expect(content).toContain('= query(async');
    });
  });

  describe('file upload functions', () => {
    it('generates a file upload function that accepts a File parameter', () => {
      const parsed: ParsedSpec = {
        operations: [createOperation({
          operationId: 'Avatar_Upload',
          tag: 'Avatar',
          method: 'post',
          path: '/api/v4/me/avatar',
          remoteType: 'command',
          isFileUpload: true,
          fileFieldName: 'file',
          isVoidResponse: false,
          responseSchema: 'AvatarUploadResponse',
        })],
        tags: ['Avatar'],
      };

      const content = getGeneratedFile(parsed, 'avatars.generated.remote.ts');
      expect(content).toContain("form('unchecked', async (data: { file?: File })");
      expect(content).toContain("formData.append('file', file, file.name)");
      expect(content).toContain('await response.json()');
      expect(content).toContain('return result');
    });

    it('generates a void file upload function with success return', () => {
      const parsed: ParsedSpec = {
        operations: [createOperation({
          operationId: 'Avatar_Upload',
          tag: 'Avatar',
          method: 'post',
          path: '/api/v4/me/avatar',
          remoteType: 'command',
          isFileUpload: true,
          fileFieldName: 'file',
          isVoidResponse: true,
        })],
        tags: ['Avatar'],
      };

      const content = getGeneratedFile(parsed, 'avatars.generated.remote.ts');
      expect(content).toContain("form('unchecked', async (data: { file?: File })");
      expect(content).toContain("return { success: true }");
      expect(content).not.toContain('await response.json()');
    });

    it('uses the correct endpoint path in the upload URL', () => {
      const parsed: ParsedSpec = {
        operations: [createOperation({
          operationId: 'Sounds_UploadSound',
          tag: 'Sounds',
          method: 'post',
          path: '/api/v4/alert-sounds',
          remoteType: 'command',
          isFileUpload: true,
          fileFieldName: 'file',
          isVoidResponse: false,
        })],
        tags: ['Sounds'],
      };

      const content = getGeneratedFile(parsed, 'sounds.generated.remote.ts');
      expect(content).toContain("apiClient.baseUrl + '/api/v4/alert-sounds'");
    });

    it('uses a form wrapper for a command-typed upload, because a command cannot carry a File', () => {
      const parsed: ParsedSpec = {
        operations: [createOperation({
          operationId: 'Avatar_Upload',
          tag: 'Avatar',
          method: 'post',
          path: '/api/v4/me/avatar',
          remoteType: 'form',
          isFileUpload: true,
          fileFieldName: 'file',
          isVoidResponse: false,
        })],
        tags: ['Avatar'],
      };

      const content = getGeneratedFile(parsed, 'avatars.generated.remote.ts');
      expect(content).toContain("= form('unchecked',");
    });

    it('materialises the submitted lazy file and rejects an empty submission', () => {
      const parsed: ParsedSpec = {
        operations: [createOperation({
          operationId: 'Avatar_Upload',
          tag: 'Avatar',
          method: 'post',
          path: '/api/v4/me/avatar',
          remoteType: 'command',
          isFileUpload: true,
          fileFieldName: 'file',
          isVoidResponse: true,
        })],
        tags: ['Avatar'],
      };

      const content = getGeneratedFile(parsed, 'avatars.generated.remote.ts');
      expect(content).toContain("if (!submitted) throw error(400, 'No file was submitted');");
      expect(content).toContain(
        'const file = new File([await submitted.arrayBuffer()], submitted.name, { type: submitted.type });'
      );
    });

    it('names the file field from fileFieldName', () => {
      const parsed: ParsedSpec = {
        operations: [createOperation({
          operationId: 'Sounds_UploadSound',
          tag: 'Sounds',
          method: 'post',
          path: '/api/v4/alert-sounds',
          remoteType: 'command',
          isFileUpload: true,
          fileFieldName: 'sound',
          isVoidResponse: true,
        })],
        tags: ['Sounds'],
      };

      const content = getGeneratedFile(parsed, 'sounds.generated.remote.ts');
      expect(content).toContain("form('unchecked', async (data: { sound?: File })");
      expect(content).toContain('const submitted = data.sound;');
      expect(content).toContain("formData.append('sound', file, file.name)");
    });

    it('imports form and not command for a command-typed upload', () => {
      const parsed: ParsedSpec = {
        operations: [createOperation({
          operationId: 'Avatar_Upload',
          tag: 'Avatar',
          method: 'post',
          path: '/api/v4/me/avatar',
          remoteType: 'command',
          isFileUpload: true,
          fileFieldName: 'file',
          isVoidResponse: true,
        })],
        tags: ['Avatar'],
      };

      const content = getGeneratedFile(parsed, 'avatars.generated.remote.ts');
      expect(content).toContain("import { getRequestEvent, form } from '$app/server';");
      expect(content).not.toContain('formCoerce');
    });

    it('does not emit the formCoerce utility for a spec whose only forms are uploads', () => {
      const parsed: ParsedSpec = {
        operations: [createOperation({
          operationId: 'Avatar_Upload',
          tag: 'Avatar',
          method: 'post',
          path: '/api/v4/me/avatar',
          remoteType: 'form',
          isFileUpload: true,
          fileFieldName: 'file',
          isVoidResponse: true,
        })],
        tags: ['Avatar'],
      };

      const files = generateRemoteFunctions(parsed, defaultConfig);
      expect(files.has('form-utils.generated.ts')).toBe(false);
    });
  });

  describe('raw-fetch error bodies', () => {
    it('keeps the response body on the error an upload throws', () => {
      const parsed: ParsedSpec = {
        operations: [createOperation({
          operationId: 'Avatar_Upload',
          tag: 'Avatar',
          method: 'post',
          path: '/api/v4/me/avatar',
          remoteType: 'command',
          isFileUpload: true,
          fileFieldName: 'file',
          isVoidResponse: false,
        })],
        tags: ['Avatar'],
      };

      const content = getGeneratedFile(parsed, 'avatars.generated.remote.ts');
      expect(content).toContain('err.status = response.status;');
      expect(content).toContain('err.response = await response.text();');
    });

    it('keeps the response body on the error a url-encoded post throws', () => {
      const parsed: ParsedSpec = {
        operations: [createOperation({
          operationId: 'OAuth_DeviceApprove',
          tag: 'OAuth',
          method: 'post',
          path: '/api/oauth/device-approve',
          remoteType: 'command',
          isUrlEncoded: true,
          urlEncodedProperties: [{ name: 'user_code', type: 'string', required: true }],
          isVoidResponse: true,
        })],
        tags: ['OAuth'],
      };

      const content = getGeneratedFile(parsed, 'oauths.generated.remote.ts');
      expect(content).toContain('err.response = await response.text();');
    });

    it('logs an upload against the client method, not the exported name', () => {
      const parsed: ParsedSpec = {
        operations: [createOperation({
          // The export is renamed off a reserved word; the log names the method called.
          operationId: 'Sounds_Import',
          tag: 'Sounds',
          method: 'post',
          path: '/api/v4/alert-sounds',
          remoteType: 'command',
          isFileUpload: true,
          fileFieldName: 'file',
          isVoidResponse: true,
          clientPropertyName: 'soundsV4',
        })],
        tags: ['Sounds'],
      };

      const content = getGeneratedFile(parsed, 'sounds.generated.remote.ts');
      expect(content).toContain('export const _import = form(');
      expect(content).toContain("console.error('Error in soundsV4.import:', err);");
    });

    it('logs a url-encoded post against the client method, not the exported name', () => {
      const parsed: ParsedSpec = {
        operations: [createOperation({
          operationId: 'OAuth_Delete',
          tag: 'OAuth',
          method: 'post',
          path: '/api/oauth/revoke',
          remoteType: 'command',
          isUrlEncoded: true,
          urlEncodedProperties: [{ name: 'token', type: 'string', required: true }],
          isVoidResponse: true,
          clientPropertyName: 'oauth',
        })],
        tags: ['OAuth'],
      };

      const content = getGeneratedFile(parsed, 'oauths.generated.remote.ts');
      expect(content).toContain('export const remove = command(');
      expect(content).toContain("console.error('Error in oauth.delete:', err);");
    });
  });

  describe('url-encoded functions', () => {
    it('generates URLSearchParams for url-encoded endpoints', () => {
      const parsed: ParsedSpec = {
        operations: [createOperation({
          operationId: 'OAuth_DeviceApprove',
          tag: 'OAuth',
          method: 'post',
          path: '/api/oauth/device-approve',
          remoteType: 'form',
          isUrlEncoded: true,
          urlEncodedProperties: [
            { name: 'user_code', type: 'string', required: true },
            { name: 'remember', type: 'boolean', required: false },
          ],
          isVoidResponse: true,
        })],
        tags: ['OAuth'],
      };

      const content = getGeneratedFile(parsed, 'oauths.generated.remote.ts');
      expect(content).toContain('new URLSearchParams()');
      expect(content).toContain("body.set('user_code', String(request.user_code))");
      expect(content).toContain("body.set('remember', String(request.remember))");
      expect(content).toContain("'Content-Type': 'application/x-www-form-urlencoded'");
      expect(content).toContain('body.toString()');
    });

    it('does not use FormData for url-encoded endpoints', () => {
      const parsed: ParsedSpec = {
        operations: [createOperation({
          operationId: 'OAuth_DeviceApprove',
          tag: 'OAuth',
          method: 'post',
          path: '/api/oauth/device-approve',
          remoteType: 'command',
          isUrlEncoded: true,
          urlEncodedProperties: [
            { name: 'user_code', type: 'string', required: true },
          ],
          isVoidResponse: true,
        })],
        tags: ['OAuth'],
      };

      const content = getGeneratedFile(parsed, 'oauths.generated.remote.ts');
      expect(content).not.toContain('new FormData()');
    });

    it('generates JSON response parsing for non-void url-encoded endpoints', () => {
      const parsed: ParsedSpec = {
        operations: [createOperation({
          operationId: 'OAuth_DeviceToken',
          tag: 'OAuth',
          method: 'post',
          path: '/api/oauth/device-token',
          remoteType: 'command',
          isUrlEncoded: true,
          urlEncodedProperties: [
            { name: 'device_code', type: 'string', required: true },
          ],
          isVoidResponse: false,
        })],
        tags: ['OAuth'],
      };

      const content = getGeneratedFile(parsed, 'oauths.generated.remote.ts');
      expect(content).toContain('await response.json()');
      expect(content).toContain('return result');
    });

    it('generates { success: true } for void url-encoded endpoints', () => {
      const parsed: ParsedSpec = {
        operations: [createOperation({
          operationId: 'OAuth_DeviceApprove',
          tag: 'OAuth',
          method: 'post',
          path: '/api/oauth/device-approve',
          remoteType: 'command',
          isUrlEncoded: true,
          urlEncodedProperties: [
            { name: 'user_code', type: 'string', required: true },
          ],
          isVoidResponse: true,
        })],
        tags: ['OAuth'],
      };

      const content = getGeneratedFile(parsed, 'oauths.generated.remote.ts');
      expect(content).toContain("return { success: true }");
      expect(content).not.toContain('await response.json()');
    });

    it('uses correct HTTP method from operation', () => {
      const parsed: ParsedSpec = {
        operations: [createOperation({
          operationId: 'OAuth_DeviceApprove',
          tag: 'OAuth',
          method: 'post',
          path: '/api/oauth/device-approve',
          remoteType: 'command',
          isUrlEncoded: true,
          urlEncodedProperties: [],
          isVoidResponse: true,
        })],
        tags: ['OAuth'],
      };

      const content = getGeneratedFile(parsed, 'oauths.generated.remote.ts');
      expect(content).toContain("method: 'POST'");
    });

    it('generates Zod schema for url-encoded properties', () => {
      const parsed: ParsedSpec = {
        operations: [createOperation({
          operationId: 'OAuth_DeviceApprove',
          tag: 'OAuth',
          method: 'post',
          path: '/api/oauth/device-approve',
          remoteType: 'form',
          isUrlEncoded: true,
          urlEncodedProperties: [
            { name: 'user_code', type: 'string', required: true },
            { name: 'remember', type: 'boolean', required: false },
          ],
          isVoidResponse: true,
        })],
        tags: ['OAuth'],
      };

      const content = getGeneratedFile(parsed, 'oauths.generated.remote.ts');
      expect(content).toContain('z.object({');
      expect(content).toContain('user_code: z.string()');
      expect(content).toContain('remember: z.boolean().optional()');
    });

    it('uses form wrapper when remoteType is form', () => {
      const parsed: ParsedSpec = {
        operations: [createOperation({
          operationId: 'OAuth_DeviceApprove',
          tag: 'OAuth',
          method: 'post',
          path: '/api/oauth/device-approve',
          remoteType: 'form',
          isUrlEncoded: true,
          urlEncodedProperties: [
            { name: 'user_code', type: 'string', required: true },
          ],
          isVoidResponse: true,
        })],
        tags: ['OAuth'],
      };

      const content = getGeneratedFile(parsed, 'oauths.generated.remote.ts');
      expect(content).toContain('= form(');
    });

    it('uses command wrapper when remoteType is command', () => {
      const parsed: ParsedSpec = {
        operations: [createOperation({
          operationId: 'OAuth_DeviceApprove',
          tag: 'OAuth',
          method: 'post',
          path: '/api/oauth/device-approve',
          remoteType: 'command',
          isUrlEncoded: true,
          urlEncodedProperties: [
            { name: 'user_code', type: 'string', required: true },
          ],
          isVoidResponse: true,
        })],
        tags: ['OAuth'],
      };

      const content = getGeneratedFile(parsed, 'oauths.generated.remote.ts');
      expect(content).toContain('= command(');
    });
  });

  describe('config customization', () => {
    it('uses custom import paths from config', () => {
      const config = resolveConfig({
        imports: { server: '@my/server', kit: '@my/kit', schemas: '@my/schemas', apiTypes: '@my/types', zod: 'zod4' },
      });
      const parsed: ParsedSpec = {
        operations: [createOperation()],
        tags: ['V4 Foods'],
      };
      const files = generateRemoteFunctions(parsed, config);
      const content = files.get('foods.generated.remote.ts')!;
      expect(content).toContain("from '@my/server'");
      expect(content).toContain("from '@my/kit'");
    });

    it('uses custom client access expression', () => {
      const config = resolveConfig({
        clientAccess: 'container.resolve("ApiClient")',
      });
      const parsed: ParsedSpec = {
        operations: [createOperation()],
        tags: ['V4 Foods'],
      };
      const files = generateRemoteFunctions(parsed, config);
      const content = files.get('foods.generated.remote.ts')!;
      expect(content).toContain('container.resolve("ApiClient")');
    });
  });
  describe('inline request bodies', () => {
    it('binds an array-of-primitives body and forwards it to the client', () => {
      const parsed: ParsedSpec = {
        operations: [
          createOperation({
            operationId: 'Foods_BulkRestore',
            method: 'post',
            path: '/api/v4/foods/bulk-restore',
            remoteType: 'command',
            requestBodySchema: '',
            requestBodyRequired: true,
            inlineRequestBody: {
              zodSchema: 'z.array(z.string())',
              tsType: 'string[]',
              emptyValue: '[]',
            },
            isVoidResponse: true,
          }),
        ],
        tags: ['V4 Foods'],
      };

      const content = getGeneratedFile(parsed, 'foods.generated.remote.ts');
      expect(content).toContain('command(z.array(z.string()), async (request)');
      expect(content).toContain('bulkRestore(request as string[])');
    });

    it('defaults an omitted optional array body to [] rather than {}', () => {
      const parsed: ParsedSpec = {
        operations: [
          createOperation({
            operationId: 'Foods_BulkRestore',
            method: 'post',
            path: '/api/v4/foods/bulk-restore',
            remoteType: 'command',
            requestBodySchema: '',
            requestBodyRequired: false,
            inlineRequestBody: {
              zodSchema: 'z.array(z.string())',
              tsType: 'string[]',
              emptyValue: '[]',
            },
            isVoidResponse: true,
          }),
        ],
        tags: ['V4 Foods'],
      };

      const content = getGeneratedFile(parsed, 'foods.generated.remote.ts');
      expect(content).toContain('command(z.array(z.string()).optional(), async (request)');
      expect(content).toContain('bulkRestore((request ?? []) as string[])');
      expect(content).not.toContain('(request ?? {}) as string[]');
    });

    it('still defaults an omitted optional dictionary body to {}', () => {
      const parsed: ParsedSpec = {
        operations: [
          createOperation({
            operationId: 'Foods_ReplaceSettings',
            method: 'put',
            path: '/api/v4/foods/settings',
            remoteType: 'command',
            requestBodySchema: '',
            requestBodyRequired: false,
            inlineRequestBody: {
              zodSchema: 'z.record(z.string(), z.string())',
              tsType: '{ [key: string]: string; }',
            },
            isVoidResponse: true,
          }),
        ],
        tags: ['V4 Foods'],
      };

      const content = getGeneratedFile(parsed, 'foods.generated.remote.ts');
      expect(content).toContain('replaceSettings((request ?? {}) as { [key: string]: string; })');
    });
  });
});
