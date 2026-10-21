// deno-fmt-ignore-file
import { IsConstructor } from '../types/constructor.mjs';
import * as Result from './result.mjs';
// ------------------------------------------------------------------
// Parameters | ReturnType
// ------------------------------------------------------------------ 
import { ExtendsParameters } from './parameters.mjs';
import { ExtendsReturnType } from './return-type.mjs';
export function ExtendsConstructor(inferred, parameters, returnType, right) {
    return (IsConstructor(right) ? (() => {
        const check = ExtendsParameters(inferred, parameters, right.parameters);
        return Result.IsExtendsTrueLike(check)
            ? ExtendsReturnType(check.inferred, returnType, right.instanceType)
            : Result.ExtendsFalse();
    })() : Result.ExtendsFalse());
}
