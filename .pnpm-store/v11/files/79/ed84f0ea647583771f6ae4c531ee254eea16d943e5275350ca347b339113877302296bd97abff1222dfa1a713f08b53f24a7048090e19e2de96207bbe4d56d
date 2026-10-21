import type { XSchemaObject } from './schema.mjs';
export interface XRefinement {
    refine: (value: unknown) => boolean;
    message: string;
}
export interface XRefine<Refinements extends XRefinement[] = XRefinement[]> {
    '~refine': Refinements;
}
/**
 * Returns true if the schema contains an '~refine` keyword
 * @specification None
 */
export declare function IsRefine(value: XSchemaObject): value is XRefine;
