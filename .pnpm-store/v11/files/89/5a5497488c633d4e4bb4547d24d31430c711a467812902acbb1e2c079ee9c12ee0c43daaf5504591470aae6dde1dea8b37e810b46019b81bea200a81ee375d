// deno-fmt-ignore-file
import { Guard } from '../../guard/index.mjs';
import { Pointer } from '../pointer/index.mjs';
import * as Schema from '../types/index.mjs';
// ------------------------------------------------------------------
// Match: Id
// ------------------------------------------------------------------
function MatchId(schema, base, ref) {
    if (schema.$id === ref.hash)
        return schema;
    const absoluteId = new URL(schema.$id, base.href);
    const absoluteRef = new URL(ref.href, base.href);
    if (Guard.IsEqual(absoluteId.pathname, absoluteRef.pathname)) {
        return ref.hash.startsWith('#') ? MatchHash(schema, base, ref) : schema;
    }
    return undefined;
}
// ------------------------------------------------------------------
// Match: Anchor
// ------------------------------------------------------------------
function MatchAnchor(schema, base, ref) {
    const absoluteAnchor = new URL(`#${schema.$anchor}`, base.href);
    const absoluteRef = new URL(ref.href, base.href);
    if (Guard.IsEqual(absoluteAnchor.href, absoluteRef.href))
        return schema;
    return undefined;
}
// ------------------------------------------------------------------
// Match: Hash
// ------------------------------------------------------------------
function MatchHash(schema, base, ref) {
    if (ref.href.endsWith('#'))
        return schema;
    return ref.hash.startsWith('#')
        ? Pointer.Get(schema, decodeURIComponent(ref.hash.slice(1)))
        : undefined;
}
// ------------------------------------------------------------------
// Match
// ------------------------------------------------------------------
function Match(schema, base, ref) {
    if (Schema.IsId(schema)) {
        const result = MatchId(schema, base, ref);
        if (!Guard.IsUndefined(result))
            return result;
    }
    if (Schema.IsAnchor(schema)) {
        const result = MatchAnchor(schema, base, ref);
        if (!Guard.IsUndefined(result))
            return result;
    }
    return MatchHash(schema, base, ref);
}
// ------------------------------------------------------------------
// FromArray
// ------------------------------------------------------------------
function FromArray(schema, base, ref) {
    return schema.reduce((result, item) => {
        const match = FromValue(item, base, ref);
        return !Guard.IsUndefined(match) ? match : result;
    }, undefined);
}
// ------------------------------------------------------------------
// FromObject
// ------------------------------------------------------------------
function FromObject(schema, base, ref) {
    return Guard.Keys(schema).reduce((result, key) => {
        const match = FromValue(schema[key], base, ref);
        return !Guard.IsUndefined(match) ? match : result;
    }, undefined);
}
// ------------------------------------------------------------------
// FromValue
// ------------------------------------------------------------------
function FromValue(schema, base, ref) {
    base = Schema.IsSchemaObject(schema) && Schema.IsId(schema) ? new URL(schema.$id, base.href) : base;
    if (Schema.IsSchemaObject(schema)) {
        const result = Match(schema, base, ref);
        if (!Guard.IsUndefined(result))
            return result;
    }
    if (Guard.IsArray(schema))
        return FromArray(schema, base, ref);
    if (Guard.IsObject(schema))
        return FromObject(schema, base, ref);
    return undefined;
}
// ------------------------------------------------------------------
// Ref
// ------------------------------------------------------------------
export function Ref(schema, ref) {
    const defaultBase = new URL('http://unknown');
    const initialBase = Schema.IsId(schema) ? new URL(schema.$id, defaultBase.href) : defaultBase;
    const initialRef = new URL(ref, initialBase.href);
    return FromValue(schema, initialBase, initialRef);
}
