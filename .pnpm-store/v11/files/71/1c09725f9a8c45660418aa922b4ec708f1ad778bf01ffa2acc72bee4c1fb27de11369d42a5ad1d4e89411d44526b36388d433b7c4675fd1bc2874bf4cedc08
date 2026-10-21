import { describe, it, expect } from 'vitest';
import {
  planFileInvalidations,
  refreshThunks,
  resolveInvalidationTarget,
} from '../utils/invalidation.js';
import type { OperationInfo } from '../types.js';

function op(overrides: Partial<OperationInfo> = {}): OperationInfo {
  return {
    operationId: 'Foods_GetFavorites',
    tag: 'V4 Foods',
    method: 'get',
    path: '/api/v4/foods/favorites',
    remoteType: 'query',
    invalidates: [],
    parameters: [],
    isVoidResponse: false,
    ...overrides,
  };
}

describe('resolveInvalidationTarget', () => {
  it('resolves a bare name within the declaring operation\'s tag', () => {
    const target = op();
    const command = op({ operationId: 'Foods_AddFavorite', remoteType: 'command' });

    expect(resolveInvalidationTarget('GetFavorites', command, [target, command])).toBe(target);
  });

  it('does not resolve a bare name declared under another tag', () => {
    const target = op({ operationId: 'Notes_GetFavorites', tag: 'V4 Notes' });
    const command = op({ operationId: 'Foods_AddFavorite', remoteType: 'command' });

    expect(resolveInvalidationTarget('GetFavorites', command, [target, command])).toBeUndefined();
  });

  it('resolves a qualified operationId under another tag', () => {
    const target = op({ operationId: 'MemberInvite_GetMembers', tag: 'V4 Member Invites' });
    const command = op({ operationId: 'Tenant_RemoveMember', tag: 'V4 Tenant', remoteType: 'command' });

    expect(resolveInvalidationTarget('MemberInvite_GetMembers', command, [target, command])).toBe(
      target
    );
  });

  it('reads the target tag off the spec rather than the operationId prefix', () => {
    // The prefix is the controller name; the tag is what names the file.
    const target = op({ operationId: 'MemberInvite_GetMembers', tag: 'V4 Member Invites' });
    const command = op({ operationId: 'Tenant_RemoveMember', tag: 'V4 Tenant', remoteType: 'command' });

    const plan = planFileInvalidations(
      'V4 Tenant',
      [{ ...command, invalidates: ['MemberInvite_GetMembers'] }],
      [target, command]
    );

    expect(plan.importLines).toEqual([
      "import { getMembers } from './memberInvites.generated.remote.js';",
    ]);
  });

  it('ignores a name that resolves to a command rather than a query', () => {
    const other = op({ operationId: 'Foods_AddFavorite', remoteType: 'command' });
    const command = op({ operationId: 'Foods_RemoveFavorite', remoteType: 'command' });

    expect(resolveInvalidationTarget('AddFavorite', command, [other, command])).toBeUndefined();
  });

  it('ignores a name no operation declares', () => {
    const command = op({ operationId: 'Foods_AddFavorite', remoteType: 'command' });

    expect(resolveInvalidationTarget('GetNothing', command, [command])).toBeUndefined();
  });
});

describe('planFileInvalidations', () => {
  it('emits no import for a query the file declares itself', () => {
    const target = op();
    const command = op({
      operationId: 'Foods_AddFavorite',
      remoteType: 'command',
      invalidates: ['GetFavorites'],
    });

    const plan = planFileInvalidations('V4 Foods', [target, command], [target, command]);

    expect(plan.importLines).toEqual([]);
    expect(plan.usesRequested).toBe(true);
  });

  it('reports no use of requested when nothing resolves', () => {
    const command = op({
      operationId: 'Foods_AddFavorite',
      remoteType: 'command',
      invalidates: ['GetNothing'],
    });

    const plan = planFileInvalidations('V4 Foods', [command], [command]);

    expect(plan.usesRequested).toBe(false);
    expect(plan.importLines).toEqual([]);
  });

  it('aliases an imported name that collides with one the file declares', () => {
    const local = op({ operationId: 'Foods_GetMembers' });
    const remote = op({ operationId: 'MemberInvite_GetMembers', tag: 'V4 Member Invites' });
    const command = op({
      operationId: 'Foods_AddFavorite',
      remoteType: 'command',
      invalidates: ['MemberInvite_GetMembers'],
    });

    const plan = planFileInvalidations('V4 Foods', [local, command], [local, remote, command]);

    expect(plan.importLines).toEqual([
      "import { getMembers as memberInvites_getMembers } from './memberInvites.generated.remote.js';",
    ]);
    expect(plan.targetsByOperationId.get('Foods_AddFavorite')?.[0].localName).toBe(
      'memberInvites_getMembers'
    );
  });

  it('imports a query named by two mutations once', () => {
    const remote = op({ operationId: 'MemberInvite_GetMembers', tag: 'V4 Member Invites' });
    const first = op({
      operationId: 'Foods_AddFavorite',
      remoteType: 'command',
      invalidates: ['MemberInvite_GetMembers'],
    });
    const second = op({
      operationId: 'Foods_RemoveFavorite',
      remoteType: 'command',
      invalidates: ['MemberInvite_GetMembers'],
    });

    const plan = planFileInvalidations('V4 Foods', [first, second], [remote, first, second]);

    expect(plan.importLines).toHaveLength(1);
  });
});

describe('refreshThunks', () => {
  const command = op({
    operationId: 'BodyWeight_Update',
    remoteType: 'command',
    parameters: [{ name: 'id', in: 'path', required: true, type: 'string' }],
  });

  function thunksFor(target: OperationInfo): string[] {
    return refreshThunks(command, [{ operation: target, localName: 'target' }]);
  }

  it('pairs a fixed-key refresh with a refreshAll for the argument keys', () => {
    expect(thunksFor(op({ operationId: 'X_GetAll' }))).toEqual([
      '() => target(undefined).refresh()',
      '() => requested(target, Infinity).refreshAll()',
    ]);
  });

  it('passes a lone path parameter bare', () => {
    const target = op({
      operationId: 'X_GetById',
      parameters: [{ name: 'id', in: 'path', required: true, type: 'string' }],
    });

    expect(thunksFor(target)[0]).toBe('() => target(id).refresh()');
  });

  it('passes several path parameters as the object the query takes', () => {
    const target = op({
      operationId: 'X_GetOne',
      parameters: [
        { name: 'id', in: 'path', required: true, type: 'string' },
        { name: 'kind', in: 'path', required: true, type: 'string' },
      ],
    });
    const multi = op({
      operationId: 'X_Update',
      remoteType: 'command',
      parameters: [
        { name: 'id', in: 'path', required: true, type: 'string' },
        { name: 'kind', in: 'path', required: true, type: 'string' },
      ],
    });

    expect(refreshThunks(multi, [{ operation: target, localName: 'target' }])[0]).toBe(
      '() => target({ id, kind }).refresh()'
    );
  });

  it('skips the fixed key when the mutation cannot supply every path parameter', () => {
    const target = op({
      operationId: 'X_GetOne',
      parameters: [
        { name: 'id', in: 'path', required: true, type: 'string' },
        { name: 'kind', in: 'path', required: true, type: 'string' },
      ],
    });

    expect(thunksFor(target)).toEqual(['() => requested(target, Infinity).refreshAll()']);
  });

  it('skips the fixed key when the query is keyed by path and query parameters together', () => {
    const target = op({
      operationId: 'X_GetById',
      parameters: [
        { name: 'id', in: 'path', required: true, type: 'string' },
        { name: 'count', in: 'query', required: false, type: 'integer' },
      ],
    });

    expect(thunksFor(target)).toEqual(['() => requested(target, Infinity).refreshAll()']);
  });

  it('still names the no-argument key for a query taking only query parameters', () => {
    const target = op({
      operationId: 'X_GetAll',
      parameters: [{ name: 'count', in: 'query', required: false, type: 'integer' }],
    });

    expect(thunksFor(target)).toEqual([
      '() => target(undefined).refresh()',
      '() => requested(target, Infinity).refreshAll()',
    ]);
  });
});
