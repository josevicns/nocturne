// deno-fmt-ignore-file
import { IsSchema } from '../types/schema.mjs';
import { IsUnion } from '../types/union.mjs';
import { ExtendsLeft } from './extends-left.mjs';
import * as Result from './result.mjs';
// ----------------------------------------------------------------------------
// Inference
// ----------------------------------------------------------------------------
import { IsInferable, TryInferable, InferUnionResult } from './inference.mjs';
function ExtendsUnionSome(inferred, type, unionTypes) {
    const [head, ...tail] = unionTypes;
    return (IsSchema(head) ? (() => {
        const check = ExtendsLeft(inferred, type, head);
        return Result.IsExtendsTrueLike(check)
            ? Result.ExtendsTrue(check.inferred)
            : ExtendsUnionSome(inferred, type, tail);
    })() : Result.ExtendsFalse());
}
function ExtendsUnionLeft(inferred, left, right) {
    const [head, ...tail] = left;
    return (IsSchema(head) ? (() => {
        const check = ExtendsUnionSome(inferred, head, right);
        return Result.IsExtendsTrueLike(check)
            ? ExtendsUnionLeft(check.inferred, tail, right)
            : Result.ExtendsFalse();
    })() : Result.ExtendsTrue(inferred));
}
export function ExtendsUnion(inferred, left, right) {
    const inferrable = TryInferable(right);
    return (IsInferable(inferrable)
        // @ts-ignore 4.9.5 fails to see `type` property on inferrable
        ? InferUnionResult(inferred, inferrable.name, left, inferrable.type)
        : IsUnion(right)
            ? ExtendsUnionLeft(inferred, left, right.anyOf)
            : ExtendsUnionLeft(inferred, left, [right]));
}
