import type { OperationInfo } from '../types.js';
import { operationIdToFunctionName, tagToFileName } from './naming.js';

/** A query one mutation refreshes, resolved against the spec. */
export interface InvalidationTarget {
  /** The query the `Invalidates` entry named. */
  operation: OperationInfo;
  /** Identifier the emitting file uses to reach the query function. */
  localName: string;
  /**
   * Module the query is exported from, when it lives in another tag's file.
   * Undefined for a query declared in the emitting file.
   */
  importFrom?: string;
  /** The name that module exports, when {@link localName} is an alias for it. */
  exportedName?: string;
}

/** The imports and per-operation refresh statements one generated file needs. */
export interface FileInvalidationPlan {
  /** Import lines for queries this file refreshes but does not declare. */
  importLines: string[];
  /** Refresh targets per declaring operationId, empty for operations with none. */
  targetsByOperationId: Map<string, InvalidationTarget[]>;
  /** Whether any emitted refresh needs `requested` from the server module. */
  usesRequested: boolean;
}

/**
 * Resolve one `Invalidates` entry to the query it names.
 *
 * A bare name ("GetNotes") names a query in the declaring operation's own tag; a
 * qualified one ("Trackers_GetActiveInstances") is a full operationId and may name
 * a query under any tag. The target's tag comes from the operation the spec
 * declares, never from the prefix: the prefix is a controller name while the tag
 * decides the file ("V4 Member Invites" -> memberInvites), and they routinely differ.
 *
 * Only a query resolves, since only a query can be refreshed.
 */
export function resolveInvalidationTarget(
  invalidate: string,
  declaringOp: OperationInfo,
  allOperations: OperationInfo[]
): OperationInfo | undefined {
  if (invalidate.includes('_')) {
    return allOperations.find(
      (op) => op.operationId === invalidate && op.remoteType === 'query'
    );
  }

  const functionName = operationIdToFunctionName(invalidate);
  return allOperations.find(
    (op) =>
      op.tag === declaringOp.tag &&
      op.remoteType === 'query' &&
      operationIdToFunctionName(op.operationId) === functionName
  );
}

/**
 * Resolve every `Invalidates` declaration in one tag, and name the queries that
 * live elsewhere.
 *
 * An imported name is aliased only when it would collide, with a function the
 * file declares itself or with another import.
 */
export function planFileInvalidations(
  tag: string,
  operations: OperationInfo[],
  allOperations: OperationInfo[]
): FileInvalidationPlan {
  const declaredNames = new Set(
    operations.map((op) => operationIdToFunctionName(op.operationId))
  );

  /** operationId of an imported query -> the name this file calls it by. */
  const importedNames = new Map<string, string>();
  /** module specifier -> import clauses, in first-seen order. */
  const importsByModule = new Map<string, string[]>();
  const takenNames = new Set(declaredNames);

  const targetsByOperationId = new Map<string, InvalidationTarget[]>();
  let usesRequested = false;

  for (const op of operations) {
    const targets: InvalidationTarget[] = [];

    for (const invalidate of op.invalidates) {
      const target = resolveInvalidationTarget(invalidate, op, allOperations);
      if (!target) continue;

      const exportedName = operationIdToFunctionName(target.operationId);

      if (target.tag === tag) {
        targets.push({ operation: target, localName: exportedName });
        usesRequested = true;
        continue;
      }

      const module = `./${tagToFileName(target.tag)}.generated.remote.js`;
      let localName = importedNames.get(target.operationId);

      if (localName === undefined) {
        localName = exportedName;
        if (takenNames.has(localName)) {
          localName = `${tagToFileName(target.tag)}_${exportedName}`;
        }
        takenNames.add(localName);
        importedNames.set(target.operationId, localName);

        const clause =
          localName === exportedName ? exportedName : `${exportedName} as ${localName}`;
        const clauses = importsByModule.get(module) ?? [];
        clauses.push(clause);
        importsByModule.set(module, clauses);
      }

      targets.push({
        operation: target,
        localName,
        importFrom: module,
        exportedName,
      });
      usesRequested = true;
    }

    targetsByOperationId.set(op.operationId, targets);
  }

  const importLines = Array.from(importsByModule, ([module, clauses]) =>
    `import { ${clauses.join(', ')} } from '${module}';`
  );

  return { importLines, targetsByOperationId, usesRequested };
}

/**
 * The refresh expressions for one mutation, as thunks for `refreshInvalidated`.
 *
 * A query cache is keyed per argument, so each target needs two: the key the
 * generator can name unaided (see {@link fixedKeyArgument}), and every key the
 * client asked for by passing the query function to `.updates()`.
 * `getBodyWeights({ count: 100 })` is not the key `getBodyWeights(undefined)`
 * names, and only the client knows it holds the first. `refreshAll` is free when
 * the client asked for nothing.
 */
export function refreshThunks(
  declaringOp: OperationInfo,
  targets: InvalidationTarget[]
): string[] {
  const availablePathParams = new Set(
    declaringOp.parameters.filter((p) => p.in === 'path').map((p) => p.name)
  );

  const thunks: string[] = [];

  for (const target of targets) {
    const fixedKeyArg = fixedKeyArgument(target.operation, availablePathParams);
    if (fixedKeyArg !== undefined) {
      thunks.push(`() => ${target.localName}(${fixedKeyArg}).refresh()`);
    }
    thunks.push(`() => requested(${target.localName}, Infinity).refreshAll()`);
  }

  return thunks;
}

/**
 * The argument a fixed-key refresh passes the query, or undefined when the
 * mutation cannot name a key anything would be holding.
 *
 * The branches mirror the argument shapes `buildParameterMapping` gives a query,
 * since the call has to satisfy the signature it generated. Partial path
 * parameters are refused rather than guessed: a key assembled from some of them
 * belongs to no subscription. A query keyed by path *and* query parameters is
 * refused for the same reason — the mutation cannot know the query half.
 */
function fixedKeyArgument(
  target: OperationInfo,
  availablePathParams: ReadonlySet<string>
): string | undefined {
  const pathParams = target.parameters.filter((p) => p.in === 'path');
  const queryParams = target.parameters.filter((p) => p.in === 'query');

  if (pathParams.length === 0) return 'undefined';
  if (queryParams.length > 0) return undefined;
  if (!pathParams.every((p) => availablePathParams.has(p.name))) return undefined;
  if (pathParams.length === 1) return pathParams[0].name;

  return `{ ${pathParams.map((p) => p.name).join(', ')} }`;
}
