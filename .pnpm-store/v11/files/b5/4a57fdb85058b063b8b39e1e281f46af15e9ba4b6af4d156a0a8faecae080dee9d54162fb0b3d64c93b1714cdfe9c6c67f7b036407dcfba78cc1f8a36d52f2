import { type TSchema } from '../types/schema.mjs';
import { type TProperties } from '../types/properties.mjs';
import { type TConstructor } from '../types/constructor.mjs';
import * as Result from './result.mjs';
import { type TExtendsParameters } from './parameters.mjs';
import { type TExtendsReturnType } from './return-type.mjs';
export type TExtendsConstructor<Inferred extends TProperties, Parameters extends TSchema[], InstanceType extends TSchema, Right extends TSchema> = (Right extends TConstructor<infer RightParamters extends TSchema[], infer RightInstanceType extends TSchema> ? TExtendsParameters<Inferred, Parameters, RightParamters> extends Result.TExtendsTrueLike<infer Inferred extends TProperties> ? TExtendsReturnType<Inferred, InstanceType, RightInstanceType> : Result.TExtendsFalse : Result.TExtendsFalse);
export declare function ExtendsConstructor<Inferred extends TProperties, Parameters extends TSchema[], InstanceType extends TSchema, Right extends TSchema>(inferred: Inferred, parameters: [...Parameters], returnType: InstanceType, right: Right): TExtendsConstructor<Inferred, Parameters, InstanceType, Right>;
