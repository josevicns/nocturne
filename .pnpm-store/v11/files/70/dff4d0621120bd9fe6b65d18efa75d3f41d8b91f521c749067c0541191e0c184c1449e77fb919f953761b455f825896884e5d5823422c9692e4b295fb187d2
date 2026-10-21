// deno-fmt-ignore-file
import * as Schema from '../types/index.mjs';
import { Guard as G } from '../../guard/index.mjs';
import { Resolve } from '../resolve/index.mjs';
export class Stack {
    constructor(context, schema) {
        this.context = context;
        this.schema = schema;
        this.ids = [];
        this.anchors = [];
        this.recursiveAnchors = [];
        this.dynamicAnchors = [];
    }
    // ----------------------------------------------------------------
    // Base
    // ----------------------------------------------------------------
    BaseURL() {
        return this.ids.reduce((result, schema) => new URL(schema.$id, result), new URL('http://unknown'));
    }
    Base() {
        return this.ids[this.ids.length - 1] ?? this.schema;
    }
    // ----------------------------------------------------------------
    // Stack
    // ----------------------------------------------------------------
    Push(schema) {
        if (!Schema.IsSchemaObject(schema))
            return;
        if (Schema.IsId(schema))
            this.ids.push(schema);
        if (Schema.IsAnchor(schema))
            this.anchors.push(schema);
        if (Schema.IsRecursiveAnchorTrue(schema))
            this.recursiveAnchors.push(schema);
        if (Schema.IsDynamicAnchor(schema))
            this.dynamicAnchors.push(schema);
    }
    Pop(schema) {
        if (!Schema.IsSchemaObject(schema))
            return;
        if (Schema.IsId(schema))
            this.ids.pop();
        if (Schema.IsAnchor(schema))
            this.anchors.pop();
        if (Schema.IsRecursiveAnchorTrue(schema))
            this.recursiveAnchors.pop();
        if (Schema.IsDynamicAnchor(schema))
            this.dynamicAnchors.pop();
    }
    // ----------------------------------------------------------------
    // Ref
    // ----------------------------------------------------------------
    FromContext(ref) {
        return G.HasPropertyKey(this.context, ref) ? this.context[ref] : undefined;
    }
    FromRef(ref) {
        return !ref.startsWith('#')
            ? Resolve.Ref(this.schema, ref)
            : Resolve.Ref(this.Base(), ref);
    }
    Ref(ref) {
        return this.FromContext(ref) ?? this.FromRef(ref);
    }
    // ----------------------------------------------------------------
    // RecursiveRef
    // ----------------------------------------------------------------
    RecursiveRef(recursiveRef) {
        if (Schema.IsRecursiveAnchorTrue(this.Base())) {
            return Resolve.Ref(this.recursiveAnchors[0], recursiveRef);
        }
        return Resolve.Ref(this.Base(), recursiveRef);
    }
}
