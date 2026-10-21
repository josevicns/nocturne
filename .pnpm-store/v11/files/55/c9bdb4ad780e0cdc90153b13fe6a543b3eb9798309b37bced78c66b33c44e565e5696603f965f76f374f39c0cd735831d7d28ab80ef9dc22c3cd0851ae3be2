import { type TSchema, type TSchemaOptions } from '../types/schema.mjs';
import { type TIdentifier } from '../types/identifier.mjs';
import { type TDeferred } from '../types/deferred.mjs';
import { type TInstantiate } from '../engine/instantiate.mjs';
/** Creates a deferred Mapped action. */
export type TMappedDeferred<Identifier extends TIdentifier, Key extends TSchema, As extends TSchema, Property extends TSchema> = (TDeferred<'Mapped', [Identifier, Key, As, Property]>);
/** Creates a deferred Mapped action. */
export declare function MappedDeferred<Identifier extends TIdentifier, Key extends TSchema, As extends TSchema, Property extends TSchema>(identifier: Identifier, key: Key, as: As, property: Property, options?: TSchemaOptions): TMappedDeferred<Identifier, Key, As, Property>;
/** Applies a Mapped action using the given types. */
export type TMapped<Identifier extends TIdentifier, Key extends TSchema, As extends TSchema, Property extends TSchema> = (TInstantiate<{}, TMappedDeferred<Identifier, Key, As, Property>>);
/** Applies a Mapped action using the given types. */
export declare function Mapped<Identifier extends TIdentifier, Key extends TSchema, As extends TSchema, Property extends TSchema>(identifier: Identifier, key: Key, as: As, property: Property, options?: TSchemaOptions): TMapped<Identifier, Key, As, Property>;
