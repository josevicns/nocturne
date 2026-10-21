import { existsSync, readdirSync, unlinkSync } from 'fs';
import { resolve } from 'path';
import { SHARED_MODULE_FILES } from '../generators/remote-functions.js';

const TAG_FILE_SUFFIX = '.generated.remote.ts';

function isGenerated(fileName: string): boolean {
  return fileName.endsWith(TAG_FILE_SUFFIX) || SHARED_MODULE_FILES.includes(fileName);
}

/**
 * Delete generated files this run no longer emits, returning what was removed.
 *
 * The shared modules come and go with the spec and the config — dropping the last
 * form() removes the form utils, overriding every catch arm removes the error
 * translation — so a stale copy left behind keeps type-checking and shipping
 * against a contract nothing generates any more. They are matched by exact name:
 * an output dir also holds `.generated.ts` files written by other tools, and this
 * one only gets to delete its own.
 */
export function pruneStaleGeneratedFiles(dir: string, emitted: Iterable<string>): string[] {
  if (!existsSync(dir)) return [];

  const keep = new Set(emitted);
  const removed: string[] = [];
  for (const existing of readdirSync(dir)) {
    if (keep.has(existing) || !isGenerated(existing)) continue;
    unlinkSync(resolve(dir, existing));
    removed.push(existing);
  }
  return removed;
}
