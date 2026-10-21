import { type TSchema, type TSchemaOptions } from '../../types/schema.mjs';
import { type TProperties } from '../../types/properties.mjs';
import { type TObject } from '../../types/object.mjs';
import { type TEvaluateIntersect } from '../evaluate/evaluate.mjs';
import { type TInterfaceDeferred } from '../../action/index.mjs';
import { type TState, type TCanInstantiate } from '../instantiate.mjs';
import { type TInstantiateProperties } from '../instantiate.mjs';
import { type TInstantiateTypes } from '../instantiate.mjs';
type TInterfaceImmediate<Context extends TProperties, State extends TState, Heritage extends TSchema[], Properties extends TProperties, InstantiatedHeritage extends TSchema[] = TInstantiateTypes<Context, {
    callstack: [];
}, Heritage>, instantiatedProperties extends TProperties = TInstantiateProperties<Context, {
    callstack: [];
}, Properties>, EvaluatedInterface extends TSchema = TEvaluateIntersect<[...InstantiatedHeritage, TObject<instantiatedProperties>]>> = EvaluatedInterface;
export type TInterfaceInstantiate<Context extends TProperties, State extends TState, Heritage extends TSchema[], Properties extends TProperties> = TCanInstantiate<Context, Heritage> extends true ? TInterfaceImmediate<Context, State, Heritage, Properties> : TInterfaceDeferred<Heritage, Properties>;
export declare function InterfaceInstantiate<Context extends TProperties, State extends TState, Heritage extends TSchema[], Properties extends TProperties>(context: Context, state: State, heritage: [...Heritage], properties: Properties, options: TSchemaOptions): TInterfaceInstantiate<Context, State, Heritage, Properties>;
export {};
