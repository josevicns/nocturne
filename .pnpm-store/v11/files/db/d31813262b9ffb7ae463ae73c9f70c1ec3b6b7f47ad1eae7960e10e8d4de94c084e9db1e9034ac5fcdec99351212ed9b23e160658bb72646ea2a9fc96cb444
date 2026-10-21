import { type TSchema } from '../types/schema.mjs';
import { type TProperties } from '../types/properties.mjs';
import { type TFunction } from '../types/function.mjs';
import * as Result from './result.mjs';
import { type TExtendsParameters } from './parameters.mjs';
import { type TExtendsReturnType } from './return-type.mjs';
export type TExtendsFunction<Inferred extends TProperties, Parameters extends TSchema[], ReturnType extends TSchema, Right extends TSchema> = (Right extends TFunction<infer RightParamters extends TSchema[], infer RightReturnType extends TSchema> ? TExtendsParameters<Inferred, Parameters, RightParamters> extends Result.TExtendsTrueLike<infer Inferred extends TProperties> ? TExtendsReturnType<Inferred, ReturnType, RightReturnType> : Result.TExtendsFalse : Result.TExtendsFalse);
export declare function ExtendsFunction<Inferred extends TProperties, Parameters extends TSchema[], ReturnType extends TSchema, Right extends TSchema>(inferred: Inferred, parameters: [...Parameters], returnType: ReturnType, right: Right): TExtendsFunction<Inferred, Parameters, ReturnType, Right>;
