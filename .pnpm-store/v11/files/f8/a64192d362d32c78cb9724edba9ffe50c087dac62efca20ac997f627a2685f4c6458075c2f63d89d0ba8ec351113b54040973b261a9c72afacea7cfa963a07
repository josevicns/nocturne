import { describe, it, expect } from 'vitest';
import { defineConfig, resolveConfig } from '../config.js';

describe('defineConfig', () => {
  it('returns the config object as-is (identity helper for type inference)', () => {
    const config = defineConfig({ openApiPath: './spec.json' });
    expect(config.openApiPath).toBe('./spec.json');
  });
});

describe('resolveConfig', () => {
  it('fills in all defaults when given empty partial', () => {
    const config = resolveConfig({});
    expect(config.openApiPath).toBe('./openapi.json');
    expect(config.outputDir).toBe('./src/lib');
    expect(config.remoteFunctionsOutput).toBe('api/generated');
    expect(config.apiClientOutput).toBe('api/api-client.generated.ts');
    expect(config.imports.server).toBe('$app/server');
    expect(config.imports.kit).toBe('@sveltejs/kit');
    expect(config.imports.schemas).toBe('$lib/api/generated/schemas');
    expect(config.imports.apiTypes).toBe('$api');
    expect(config.imports.zod).toBe('zod');
    expect(config.clientAccess).toBe('getRequestEvent().locals.apiClient');
    expect(config.nswagClientPath).toBe('./generated/api-client');
    expect(config.dateTimeType).toBe('Date');
    expect(config.typedSchemas).toBe(false);
  });

  it('allows opting into string date-times and typed schemas', () => {
    const config = resolveConfig({ dateTimeType: 'string', typedSchemas: true });
    expect(config.dateTimeType).toBe('string');
    expect(config.typedSchemas).toBe(true);
  });

  it('merges partial imports with defaults', () => {
    const config = resolveConfig({
      imports: { schemas: '$lib/schemas' },
    });
    expect(config.imports.schemas).toBe('$lib/schemas');
    expect(config.imports.server).toBe('$app/server');
  });

  it('provides default error handling functions', () => {
    const config = resolveConfig({});
    expect(typeof config.errorHandling.on401).toBe('function');
    const on401Fn = config.errorHandling.on401 as (kind: string) => string;
    expect(on401Fn('query')).toContain('redirect');
    expect(on401Fn('command')).toContain("error(401");
    expect(on401Fn('form')).toContain("error(401");
    expect(config.errorHandling.on403).toContain('Forbidden');
    expect(typeof config.errorHandling.on500).toBe('function');
    expect(config.errorHandling.on500('doThing')).toContain('doThing');
  });

  it('allows overriding error handling', () => {
    const config = resolveConfig({
      errorHandling: {
        on401: 'throw error(401, "Unauthorized")',
        on403: 'throw error(403, "Nope")',
        on500: (fn) => `throw error(500, "${fn} failed")`,
      },
    });
    expect(config.errorHandling.on401).toBe('throw error(401, "Unauthorized")');
    expect(config.errorHandling.on500('test')).toBe('throw error(500, "test failed")');
  });

  it('allows overriding nswagClientPath', () => {
    const config = resolveConfig({ nswagClientPath: './generated/my-api' });
    expect(config.nswagClientPath).toBe('./generated/my-api');
  });
});
