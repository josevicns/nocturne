import { type TSchema, type TSchemaOptions } from '../types/schema.mjs';
import { type TDeferred } from '../types/deferred.mjs';
import { type TInstantiate } from '../engine/instantiate.mjs';
/** Creates a deferred Evaluate action. */
export type TEvaluateDeferred<Type extends TSchema> = (TDeferred<'Evaluate', [Type]>);
/** Creates a deferred Evaluate action. */
export declare function EvaluateDeferred<Type extends TSchema>(type: Type, options?: TSchemaOptions): TEvaluateDeferred<Type>;
/** Applies an Evaluate action to a type. */
export type TEvaluate<Type extends TSchema> = (TInstantiate<{}, TEvaluateDeferred<Type>>);
/** Applies an Evaluate action to a type. */
export declare function Evaluate<Type extends TSchema>(type: Type, options?: TSchemaOptions): TEvaluate<Type>;
