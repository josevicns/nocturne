import { type TSchema, type TSchemaOptions } from '../../types/schema.mjs';
import { type TProperties } from '../../types/properties.mjs';
import { type TTemplateLiteralDeferred } from '../../types/template-literal.mjs';
import { type TTemplateLiteralEncode } from './encode.mjs';
import { type TState, type TInstantiateTypes, type TCanInstantiate } from '../instantiate.mjs';
type TTemplateLiteralImmediate<Context extends TProperties, State extends TState, Types extends TSchema[], InstantiatedTypes extends TSchema[] = TInstantiateTypes<Context, State, Types>, Result extends TSchema = TTemplateLiteralEncode<InstantiatedTypes>> = Result;
export type TTemplateLiteralInstantiate<Context extends TProperties, State extends TState, Types extends TSchema[]> = TCanInstantiate<Context, Types> extends true ? TTemplateLiteralImmediate<Context, State, Types> : TTemplateLiteralDeferred<Types>;
export declare function TemplateLiteralInstantiate<Context extends TProperties, State extends TState, Types extends TSchema[]>(context: Context, state: State, types: [...Types], options: TSchemaOptions): TTemplateLiteralInstantiate<Context, State, Types>;
export {};
