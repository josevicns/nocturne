// deno-fmt-ignore-file
import { Guard } from '../../guard/index.mjs';
import { IsSchema } from '../types/schema.mjs';
import { IsArray } from '../types/array.mjs';
import { IsTuple, Tuple } from '../types/tuple.mjs';
import { ExtendsLeft } from './extends-left.mjs';
import { ExtendsRight } from './extends-right.mjs';
import * as Result from './result.mjs';
import { InstantiateElements } from '../engine/instantiate.mjs';
// ----------------------------------------------------------------------------
// Inference
// ----------------------------------------------------------------------------
import { TryRestInferable, TryInferable, IsInferable, InferTupleResult, InferUnionResult } from './inference.mjs';
function Reverse(types) {
    return [...types].reverse();
}
function ApplyReverse(types, reversed) {
    return (reversed ? Reverse(types) : types);
}
function Reversed(types) {
    const first = types.length > 0 ? types[0] : undefined;
    const inferrable = IsSchema(first) ? TryRestInferable(first) : undefined;
    return IsSchema(inferrable);
}
function ElementsCompare(inferred, reversed, left, leftRest, right, rightRest) {
    const check = ExtendsLeft(inferred, left, right);
    return (Result.IsExtendsTrueLike(check)
        ? Elements(check.inferred, reversed, leftRest, rightRest)
        : Result.ExtendsFalse() // 'left-and-right-not-compared'
    );
}
function ElementsLeft(inferred, reversed, leftRest, right, rightRest) {
    const inferable = TryRestInferable(right);
    return (IsInferable(inferable)
        ? InferTupleResult(inferred, inferable.name, ApplyReverse(leftRest, reversed), inferable.type)
        : (() => {
            const [head, ...tail] = leftRest;
            return IsSchema(head)
                ? ElementsCompare(inferred, reversed, head, tail, right, rightRest)
                : Result.ExtendsFalse();
        })());
}
function ElementsRight(inferred, reversed, leftRest, rightRest) {
    const [head, ...tail] = rightRest;
    return (IsSchema(head)
        ? ElementsLeft(inferred, reversed, leftRest, head, tail)
        : Guard.IsEqual(leftRest.length, 0)
            ? Result.ExtendsTrue(inferred) // 'Ok: right-empty-and-left-empty'
            : Result.ExtendsFalse() // 'Fail: right-empty-and-left-not-empty'
    );
}
function Elements(inferred, reversed, leftRest, rightRest) {
    return ElementsRight(inferred, reversed, leftRest, rightRest);
}
function ExtendsTupleToTuple(inferred, left, right) {
    const instantiatedRight = InstantiateElements(inferred, { callstack: [] }, right);
    const reversed = Reversed(instantiatedRight);
    return Elements(inferred, reversed, ApplyReverse(left, reversed), ApplyReverse(instantiatedRight, reversed));
}
function ExtendsTupleToArray(inferred, left, right) {
    const inferrable = TryInferable(right);
    return (IsInferable(inferrable)
        // @ts-ignore 4.9.5 fails to see `type` property on inferrable
        ? InferUnionResult(inferred, inferrable.name, left, inferrable.type)
        : (() => {
            const [head, ...tail] = left;
            return IsSchema(head)
                ? (() => {
                    const check = ExtendsLeft(inferred, head, right);
                    return Result.IsExtendsTrueLike(check)
                        ? ExtendsTupleToArray(check.inferred, tail, right)
                        : Result.ExtendsFalse();
                })()
                : Result.ExtendsTrue(inferred);
        })());
}
export function ExtendsTuple(inferred, left, right) {
    const instantiatedLeft = InstantiateElements(inferred, { callstack: [] }, left);
    return (IsTuple(right) ? ExtendsTupleToTuple(inferred, instantiatedLeft, right.items) :
        IsArray(right) ? ExtendsTupleToArray(inferred, instantiatedLeft, right.items) :
            ExtendsRight(inferred, Tuple(instantiatedLeft), right));
}
