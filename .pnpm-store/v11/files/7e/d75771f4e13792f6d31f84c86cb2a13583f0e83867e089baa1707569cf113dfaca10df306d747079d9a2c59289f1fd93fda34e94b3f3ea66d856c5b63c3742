import * as Schema from '../types/index.mjs';
export declare class Stack {
    private readonly context;
    private readonly schema;
    private readonly ids;
    private readonly anchors;
    private readonly recursiveAnchors;
    private readonly dynamicAnchors;
    constructor(context: Record<PropertyKey, Schema.XSchema>, schema: Schema.XSchema);
    BaseURL(): URL;
    Base(): Schema.XSchemaObject;
    Push(schema: Schema.XSchema): void;
    Pop(schema: Schema.XSchema): void;
    private FromContext;
    private FromRef;
    Ref(ref: string): Schema.XSchema | undefined;
    RecursiveRef(recursiveRef: string): Schema.XSchema | undefined;
}
