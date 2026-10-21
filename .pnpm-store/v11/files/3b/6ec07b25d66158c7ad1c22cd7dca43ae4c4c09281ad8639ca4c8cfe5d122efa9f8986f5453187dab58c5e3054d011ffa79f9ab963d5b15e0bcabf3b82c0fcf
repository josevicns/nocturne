import { Memory } from '../../../system/memory/index.mjs';
import { type TSchema, type TSchemaOptions } from '../../types/schema.mjs';
import { type TLiteral } from '../../types/literal.mjs';
import { type TObject } from '../../types/object.mjs';
import { type TProperties } from '../../types/properties.mjs';
import { type TIdentifier } from '../../types/identifier.mjs';
import { type TMappedKeys } from './mapped-keys.mjs';
import { type TTemplateLiteral } from '../../types/template-literal.mjs';
import { type TMappedDeferred } from '../../action/mapped.mjs';
import { type TTemplateLiteralDecode } from '../template-literal/decode.mjs';
import { type TState, type TInstantiateType, type TCanInstantiate } from '../instantiate.mjs';
type TInstantiateKeyAs<Context extends TProperties, State extends TState, Identifier extends TIdentifier, Key extends TSchema, As extends TSchema, ContextWithKey extends TProperties = Memory.TAssign<Context, {
    [_ in Identifier['name']]: Key;
}>, InstantiatedKeyAs extends TSchema = TInstantiateType<ContextWithKey, State, As>, Result extends TSchema = InstantiatedKeyAs extends TTemplateLiteral<infer Pattern extends string> ? TTemplateLiteralDecode<Pattern> : InstantiatedKeyAs> = Result;
type TInstantiateProperty<Context extends TProperties, State extends TState, Identifier extends TIdentifier, Key extends TSchema, Property extends TSchema, ContextWithKey extends TProperties = Memory.TAssign<Context, {
    [_ in Identifier['name']]: Key;
}>, InstantiatedProperty extends TSchema = TInstantiateType<ContextWithKey, State, Property>> = InstantiatedProperty;
type TMappedProperty<Context extends TProperties, State extends TState, Identifier extends TIdentifier, Key extends TSchema, As extends TSchema, Property extends TSchema, InstantiatedProperty extends TSchema = TInstantiateProperty<Context, State, Identifier, Key, Property>, InstantiatedKeyAs extends TSchema = TInstantiateKeyAs<Context, State, Identifier, Key, As>, Result extends TProperties = (InstantiatedKeyAs extends TLiteral<string | number> ? {
    [_ in InstantiatedKeyAs['const']]: InstantiatedProperty;
} : {})> = Result;
type TMappedProperties<Context extends TProperties, State extends TState, Identifier extends TIdentifier, Keys extends TSchema[], As extends TSchema, Type extends TSchema, Result extends TProperties = {}> = (Keys extends [infer Left extends TSchema, ...infer Right extends TSchema[]] ? TMappedProperties<Context, State, Identifier, Right, As, Type, Result & TMappedProperty<Context, State, Identifier, Left, As, Type>> : Result);
type TMappedAction<Context extends TProperties, State extends TState, Identifier extends TIdentifier, Key extends TSchema, As extends TSchema, Property extends TSchema, Keys extends TSchema[] = TMappedKeys<Key>, Mapped extends TProperties = TMappedProperties<Context, State, Identifier, Keys, As, Property>, Result extends TSchema = TObject<{
    [Key in keyof Mapped]: Mapped[Key];
}>> = Result;
type TMappedImmediate<Context extends TProperties, State extends TState, Identifier extends TIdentifier, Key extends TSchema, As extends TSchema, Property extends TSchema, InstantiatedKey extends TSchema = TInstantiateType<Context, State, Key>> = TMappedAction<Context, State, Identifier, InstantiatedKey, As, Property>;
export type TMappedInstantiate<Context extends TProperties, State extends TState, Identifier extends TIdentifier, Key extends TSchema, As extends TSchema, Property extends TSchema> = TCanInstantiate<Context, [Key]> extends true ? TMappedImmediate<Context, State, Identifier, Key, As, Property> : TMappedDeferred<Identifier, Key, As, Property>;
export declare function MappedInstantiate<Context extends TProperties, State extends TState, Identifier extends TIdentifier, Key extends TSchema, As extends TSchema, Property extends TSchema>(context: Context, state: State, identifier: Identifier, key: Key, as: As, property: Property, options: TSchemaOptions): TMappedInstantiate<Context, State, Identifier, Key, As, Property>;
export {};
