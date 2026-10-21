import { type TSchema, type TSchemaOptions } from '../../types/schema.mjs';
import { type TProperties } from '../../types/properties.mjs';
import { type TMappingType } from './mapping.mjs';
import { type TFromType } from './from-type.mjs';
import { type TState, type TInstantiateType, type TCanInstantiate } from '../instantiate.mjs';
import { type TCapitalizeDeferred } from '../../action/capitalize.mjs';
import { type TLowercaseDeferred } from '../../action/lowercase.mjs';
import { type TUncapitalizeDeferred } from '../../action/uncapitalize.mjs';
import { type TUppercaseDeferred } from '../../action/uppercase.mjs';
interface TCapitalizeMapping extends TMappingType {
    output: Capitalize<this['input']>;
}
interface TLowercaseMapping extends TMappingType {
    output: Lowercase<this['input']>;
}
interface TUncapitalizeMapping extends TMappingType {
    output: Uncapitalize<this['input']>;
}
interface TUppercaseMapping extends TMappingType {
    output: Uppercase<this['input']>;
}
type TCapitalizeImmediate<Context extends TProperties, State extends TState, Type extends TSchema, InstantiatedType extends TSchema = TInstantiateType<Context, State, Type>> = TFromType<TCapitalizeMapping, InstantiatedType>;
export type TCapitalizeInstantiate<Context extends TProperties, State extends TState, Type extends TSchema> = TCanInstantiate<Context, [Type]> extends true ? TCapitalizeImmediate<Context, State, Type> : TCapitalizeDeferred<Type>;
export declare function CapitalizeInstantiate<Context extends TProperties, State extends TState, Type extends TSchema>(context: Context, state: State, type: Type, options: TSchemaOptions): TCapitalizeInstantiate<Context, State, Type>;
type TLowercaseImmediate<Context extends TProperties, State extends TState, Type extends TSchema, InstantiatedType extends TSchema = TInstantiateType<Context, State, Type>> = TFromType<TLowercaseMapping, InstantiatedType>;
export type TLowercaseInstantiate<Context extends TProperties, State extends TState, Type extends TSchema> = TCanInstantiate<Context, [Type]> extends true ? TLowercaseImmediate<Context, State, Type> : TLowercaseDeferred<Type>;
export declare function LowercaseInstantiate<Context extends TProperties, State extends TState, Type extends TSchema>(context: Context, state: State, type: Type, options: TSchemaOptions): TLowercaseInstantiate<Context, State, Type>;
type TUncapitalizeImmediate<Context extends TProperties, State extends TState, Type extends TSchema, InstantiatedType extends TSchema = TInstantiateType<Context, State, Type>> = TFromType<TUncapitalizeMapping, InstantiatedType>;
export type TUncapitalizeInstantiate<Context extends TProperties, State extends TState, Type extends TSchema> = TCanInstantiate<Context, [Type]> extends true ? TUncapitalizeImmediate<Context, State, Type> : TUncapitalizeDeferred<Type>;
export declare function UncapitalizeInstantiate<Context extends TProperties, State extends TState, Type extends TSchema>(context: Context, state: State, type: Type, options: TSchemaOptions): TUncapitalizeInstantiate<Context, State, Type>;
type TUppercaseImmediate<Context extends TProperties, State extends TState, Type extends TSchema, InstantiatedType extends TSchema = TInstantiateType<Context, State, Type>> = TFromType<TUppercaseMapping, InstantiatedType>;
export type TUppercaseInstantiate<Context extends TProperties, State extends TState, Type extends TSchema> = TCanInstantiate<Context, [Type]> extends true ? TUppercaseImmediate<Context, State, Type> : TUppercaseDeferred<Type>;
export declare function UppercaseInstantiate<Context extends TProperties, State extends TState, Type extends TSchema>(context: Context, state: State, type: Type, options: TSchemaOptions): TUppercaseInstantiate<Context, State, Type>;
export {};
