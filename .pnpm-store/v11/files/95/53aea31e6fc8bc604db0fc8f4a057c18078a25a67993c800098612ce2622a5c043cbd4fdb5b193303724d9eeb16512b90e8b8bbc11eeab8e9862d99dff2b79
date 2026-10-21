// deno-fmt-ignore-file
import { IsFunction } from '../types/function.mjs';
import * as Result from './result.mjs';
// ------------------------------------------------------------------
// Parameters | ReturnType
// ------------------------------------------------------------------ 
import { ExtendsParameters } from './parameters.mjs';
import { ExtendsReturnType } from './return-type.mjs';
export function ExtendsFunction(inferred, parameters, returnType, right) {
    return (IsFunction(right) ? (() => {
        const check = ExtendsParameters(inferred, parameters, right.parameters);
        return Result.IsExtendsTrueLike(check)
            ? ExtendsReturnType(check.inferred, returnType, right.returnType)
            : Result.ExtendsFalse();
    })() : Result.ExtendsFalse());
}
