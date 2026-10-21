// deno-fmt-ignore-file
import { IsInfer } from '../types/infer.mjs';
import { IsSchema } from '../types/schema.mjs';
import { IsOptional } from '../types/_optional.mjs';
import { ExtendsLeft } from './extends-left.mjs';
import * as Result from './result.mjs';
function ParameterCompare(inferred, left, leftRest, right, rightRest) {
    // Parameter extends Right on Left, except when infer Right  
    const checkLeft = IsInfer(right) ? left : right;
    const checkRight = IsInfer(right) ? right : left;
    const isLeftOptional = IsOptional(left);
    const isRightOptional = IsOptional(right);
    const check = ExtendsLeft(inferred, checkLeft, checkRight);
    return (!isLeftOptional && isRightOptional
        ? Result.ExtendsFalse()
        : Result.IsExtendsTrueLike(check)
            ? ExtendsParameters(check.inferred, leftRest, rightRest)
            : Result.ExtendsFalse());
}
function ParameterRight(inferred, left, leftRest, rightRest) {
    const [head, ...tail] = rightRest;
    return (IsSchema(head)
        ? ParameterCompare(inferred, left, leftRest, head, tail)
        : IsOptional(left) // 'right-did-not-have-enough-elements'
            ? Result.ExtendsTrue(inferred) // 'ok: left was optional'
            : Result.ExtendsFalse() // 'fail: left was required'
    );
}
function ParametersLeft(inferred, left, rightRest) {
    const [head, ...tail] = left;
    return (IsSchema(head)
        ? ParameterRight(inferred, head, tail, rightRest)
        : Result.ExtendsTrue(inferred));
}
export function ExtendsParameters(inferred, left, right) {
    return ParametersLeft(inferred, left, right);
}
