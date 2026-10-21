import { type TSchema } from '../types/schema.mjs';
import { type TDeferred } from '../types/deferred.mjs';
import { type TInstantiate } from '../engine/instantiate.mjs';
/** Creates a deferred Options action. */
export type TOptionsDeferred<Type extends TSchema, Options extends TSchema> = (TDeferred<'Options', [Type, Options]>);
/** Creates a deferred Options action. */
export declare function OptionsDeferred<Type extends TSchema, Options extends TSchema>(type: Type, options: Options): TOptionsDeferred<Type, Options>;
export type TOptionsConstruct<Type extends TSchema, Options extends TSchema> = (TInstantiate<{}, TOptionsDeferred<Type, Options>>);
/** Applies an Options action to the given type. */
export type TOptions<Type extends TSchema, Options extends TSchema> = (Type & Options);
/** Applies an Options action to the given type. */
export declare function Options<Type extends TSchema, Options extends TSchema>(type: Type, options: Options): TOptionsConstruct<Type, Options>;
