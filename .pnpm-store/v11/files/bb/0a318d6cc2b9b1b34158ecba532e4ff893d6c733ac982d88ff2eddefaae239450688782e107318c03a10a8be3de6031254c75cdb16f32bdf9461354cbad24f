import { type TSchema, type TSchemaOptions } from '../types/schema.mjs';
import { type TDeferred } from '../types/deferred.mjs';
import { type TInstantiate } from '../engine/instantiate.mjs';
/** Creates a deferred ReadonlyType action. */
export type TReadonlyTypeDeferred<Type extends TSchema> = (TDeferred<'ReadonlyType', [Type]>);
/** Creates a deferred ReadonlyType action. */
export declare function ReadonlyTypeDeferred<Type extends TSchema>(type: Type, options?: TSchemaOptions): TDeferred<"ReadonlyType", [Type]>;
/** This type is an alias for the TypeScript `Readonly<T>` utility type. */
export type TReadonlyType<Type extends TSchema> = (TInstantiate<{}, TReadonlyTypeDeferred<Type>>);
/** This type is an alias for the TypeScript `Readonly<T>` utility type. */
export declare function ReadonlyType<Type extends TSchema>(type: Type, options?: TSchemaOptions): TReadonlyType<Type>;
