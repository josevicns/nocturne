import { describe, it, expect } from 'vitest';
import { mkdtempSync, readdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { generateRemoteFunctions } from '../generators/remote-functions.js';
import { pruneStaleGeneratedFiles } from '../utils/output.js';
import { resolveConfig } from '../config.js';
import type { ParsedSpec } from '../types.js';

const parsed: ParsedSpec = {
  operations: [
    {
      operationId: 'Foods_GetFavorites',
      tag: 'V4 Foods',
      method: 'get',
      path: '/api/v4/foods/favorites',
      remoteType: 'query',
      invalidates: [],
      parameters: [],
      isVoidResponse: false,
      clientPropertyName: 'foodsV4',
    },
  ],
  tags: ['V4 Foods'],
};

const noHelperArms = resolveConfig({
  errorHandling: {
    on401: "throw error(401, 'Unauthorized')",
    on403: "throw error(403, 'Forbidden')",
    on500: (fn) => `throw error(500, 'Failed to ${fn}')`,
  },
});

function writeRun(dir: string, files: Map<string, string>): void {
  for (const [name, content] of files) writeFileSync(resolve(dir, name), content, 'utf-8');
}

describe('pruneStaleGeneratedFiles', () => {
  it('removes a shared module the next run no longer emits', () => {
    const dir = mkdtempSync(resolve(tmpdir(), 'remote-codegen-'));
    writeRun(dir, generateRemoteFunctions(parsed, resolveConfig({})));
    expect(readdirSync(dir)).toContain('remote-error.generated.ts');

    const next = generateRemoteFunctions(parsed, noHelperArms);
    const removed = pruneStaleGeneratedFiles(dir, next.keys());

    expect(removed).toEqual(['remote-error.generated.ts']);
    expect(readdirSync(dir)).not.toContain('remote-error.generated.ts');
    expect(readdirSync(dir)).toContain('foods.generated.remote.ts');
  });

  it('removes a stale tag file', () => {
    const dir = mkdtempSync(resolve(tmpdir(), 'remote-codegen-'));
    writeRun(dir, generateRemoteFunctions(parsed, resolveConfig({})));
    writeFileSync(resolve(dir, 'drinks.generated.remote.ts'), '// gone in the next run', 'utf-8');

    const removed = pruneStaleGeneratedFiles(dir, generateRemoteFunctions(parsed, resolveConfig({})).keys());

    expect(removed).toEqual(['drinks.generated.remote.ts']);
  });

  it('leaves generated files written by other tools', () => {
    const dir = mkdtempSync(resolve(tmpdir(), 'remote-codegen-'));
    writeRun(dir, generateRemoteFunctions(parsed, resolveConfig({})));
    // An output dir is shared: Zod schemas and the NSwag client are generated too,
    // by generators that also spell their output `.generated.ts`.
    writeFileSync(resolve(dir, 'schemas.generated.ts'), '// another generator', 'utf-8');
    writeFileSync(resolve(dir, 'nocturne-api-client.generated.ts'), '// NSwag output', 'utf-8');
    writeFileSync(resolve(dir, 'schemas.ts'), '// hand-written', 'utf-8');

    const removed = pruneStaleGeneratedFiles(dir, generateRemoteFunctions(parsed, resolveConfig({})).keys());

    expect(removed).toEqual([]);
    const remaining = readdirSync(dir);
    expect(remaining).toContain('schemas.generated.ts');
    expect(remaining).toContain('nocturne-api-client.generated.ts');
    expect(remaining).toContain('schemas.ts');
  });

  it('returns nothing for a directory that does not exist yet', () => {
    expect(pruneStaleGeneratedFiles(resolve(tmpdir(), 'remote-codegen-absent'), [])).toEqual([]);
  });
});
