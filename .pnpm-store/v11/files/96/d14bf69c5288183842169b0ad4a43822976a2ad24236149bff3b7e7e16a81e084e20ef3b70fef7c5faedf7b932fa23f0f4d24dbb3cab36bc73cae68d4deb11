// deno-fmt-ignore-file
import * as Schema from '../types/index.mjs';
import { Guard as G, EmitGuard as E } from '../../guard/index.mjs';
// ------------------------------------------------------------------
// HasUnevaluated
// ------------------------------------------------------------------
function HasUnevaluatedFromObject(value) {
    return (Schema.IsUnevaluatedItems(value)
        || Schema.IsUnevaluatedProperties(value)
        || G.Keys(value).some(key => HasUnevaluatedFromUnknown(value[key])));
}
function HasUnevaluatedFromArray(value) {
    return value.some(value => HasUnevaluatedFromUnknown(value));
}
function HasUnevaluatedFromUnknown(value) {
    return (G.IsArray(value) ? HasUnevaluatedFromArray(value) :
        G.IsObject(value) ? HasUnevaluatedFromObject(value) :
            false);
}
export function HasUnevaluated(context, schema) {
    return HasUnevaluatedFromUnknown(schema) || G.Keys(context).some(key => HasUnevaluatedFromUnknown(context[key]));
}
// ------------------------------------------------------------------
// BuildContext
// ------------------------------------------------------------------
export class BuildContext {
    constructor(hasUnevaluated) {
        this.hasUnevaluated = hasUnevaluated;
    }
    UseUnevaluated() {
        return this.hasUnevaluated;
    }
    AddIndex(index) {
        return E.Call(E.Member('context', 'AddIndex'), [index]);
    }
    AddKey(key) {
        return E.Call(E.Member('context', 'AddKey'), [key]);
    }
    Merge(results) {
        return E.Call(E.Member('context', 'Merge'), [results]);
    }
}
// ------------------------------------------------------------------
// CheckContext
// ------------------------------------------------------------------
export class CheckContext {
    constructor() {
        this.indices = new Set();
        this.keys = new Set();
    }
    AddIndex(index) {
        this.indices.add(index);
        return true;
    }
    AddKey(key) {
        this.keys.add(key);
        return true;
    }
    GetIndices() {
        return this.indices;
    }
    GetKeys() {
        return this.keys;
    }
    Merge(results) {
        for (const context of results) {
            context.indices.forEach(value => this.indices.add(value));
            context.keys.forEach(value => this.keys.add(value));
        }
        return true;
    }
}
export class ErrorContext extends CheckContext {
    constructor(callback) {
        super();
        this.callback = callback;
    }
    AddError(error) {
        this.callback(error);
        return false;
    }
}
// ------------------------------------------------------------------
// AccumulatedErrorContext
// ------------------------------------------------------------------
export class AccumulatedErrorContext extends ErrorContext {
    constructor() {
        super(error => this.errors.push(error));
        this.errors = [];
    }
    AddError(error) {
        this.errors.push(error);
        return false;
    }
    GetErrors() {
        return this.errors;
    }
}
