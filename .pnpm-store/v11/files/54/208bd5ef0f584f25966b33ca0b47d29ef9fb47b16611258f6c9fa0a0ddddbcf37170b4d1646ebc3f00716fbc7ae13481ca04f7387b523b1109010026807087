import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { writeFileSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateRemoteFunctions } from '../generators/remote-functions.js';
import { resolveConfig } from '../config.js';
import type { ParsedSpec } from '../types.js';
import { z } from 'zod';

// Executes the emitted form-utils module rather than string-matching it: the consumer
// contract is that SvelteKit's convert_formdata output (arrays for `name[]` fields,
// nested objects for `a.b` fields) survives coercion and validates. The typed variant
// differs only in its declared types, so both must behave the same.
describe.each([
  { typedSchemas: false, file: 'form-utils.emitted-under-test.generated.ts' },
  { typedSchemas: true, file: 'form-utils.typed.emitted-under-test.generated.ts' },
])('emitted formCoerce (typedSchemas: $typedSchemas)', ({ typedSchemas, file }) => {
  const emittedPath = join(dirname(fileURLToPath(import.meta.url)), file);

  let formCoerce: <T extends z.ZodTypeAny>(schema: T) => T;

  beforeAll(async () => {
    const parsed: ParsedSpec = {
      operations: [
        {
          operationId: 'Signups_Begin',
          tag: 'Signups',
          method: 'post',
          path: '/api/signups/begin',
          remoteType: 'form',
          invalidates: [],
          parameters: [],
          isVoidResponse: false,
          clientPropertyName: 'signups',
        },
      ],
      tags: ['Signups'],
    };
    const files = generateRemoteFunctions(parsed, resolveConfig({ typedSchemas }));
    const content = files.get('form-utils.generated.ts');
    if (!content) throw new Error('form-utils.generated.ts was not emitted');
    writeFileSync(emittedPath, content);
    ({ formCoerce } = await import(emittedPath));
  });

  afterAll(() => {
    rmSync(emittedPath, { force: true });
  });

  const schema = z.object({
    email: z.string(),
    healthDataConsent: z.boolean(),
    marketingTopics: z.array(z.string()).optional(),
  });

  it('keeps arrays (from repeated `name[]` fields) as arrays', () => {
    const result = formCoerce(schema).parse({
      email: 'a@b.c',
      healthDataConsent: 'true',
      marketingTopics: ['promotional', 'blog', 'waitlist'],
    });
    expect(result).toEqual({
      email: 'a@b.c',
      healthDataConsent: true,
      marketingTopics: ['promotional', 'blog', 'waitlist'],
    });
  });

  it('coerces booleans and omits empty strings', () => {
    const result = formCoerce(schema).parse({
      email: 'a@b.c',
      healthDataConsent: 'on',
      marketingTopics: '',
    });
    expect(result).toEqual({ email: 'a@b.c', healthDataConsent: true });
  });

  it('recurses into nested objects without flattening them', () => {
    const nested = z.object({
      profile: z.object({ name: z.string(), tags: z.array(z.string()) }),
    });
    const result = formCoerce(nested).parse({
      profile: { name: 'x', tags: ['one', 'two'] },
    });
    expect(result).toEqual({ profile: { name: 'x', tags: ['one', 'two'] } });
  });

  it('passes non-object input through untouched', () => {
    expect(formCoerce(z.any()).parse('raw')).toBe('raw');
  });
});
