import { type TSchema } from './schema.mjs';
import { type Static } from './static.mjs';
/** Applies a Refine check to the given type. */
export type TRefineAdd<Type extends TSchema = TSchema> = ('~refine' extends keyof Type ? Type : TRefine<Type>);
/** Applies a Refine check to the given type. */
export declare function RefineAdd<Type extends TSchema>(type: Type, refinement: TRefinement<Type>): TRefineAdd<Type>;
/** Represents a type with embedded Refine check. */
export type TRefine<Type extends TSchema = TSchema> = (Type & {
    '~refine': TRefinement<Type>[];
});
export type TRefineCallback<Type extends TSchema> = (value: Static<Type>) => boolean;
export interface TRefinement<Type extends TSchema = TSchema> {
    refine: TRefineCallback<Type>;
    message: string;
}
/** Applies a Refine check to the given type. */
export declare function Refine<Type extends TSchema>(type: Type, refine: TRefineCallback<Type>, message?: string): TRefineAdd<Type>;
/** Returns true if the given value is a TRefine. */
export declare function IsRefine(value: unknown): value is TRefine<TSchema>;
