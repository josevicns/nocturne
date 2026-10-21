// deno-fmt-ignore-file
import { Memory } from '../../../system/memory/index.mjs';
import { FromType } from './from-type.mjs';
import { InstantiateType, CanInstantiate } from '../instantiate.mjs';
import { CapitalizeDeferred } from '../../action/capitalize.mjs';
import { LowercaseDeferred } from '../../action/lowercase.mjs';
import { UncapitalizeDeferred } from '../../action/uncapitalize.mjs';
import { UppercaseDeferred } from '../../action/uppercase.mjs';
const CapitalizeMapping = (input) => input[0].toUpperCase() + input.slice(1);
const LowercaseMapping = (input) => input.toLowerCase();
const UncapitalizeMapping = (input) => input[0].toLowerCase() + input.slice(1);
const UppercaseMapping = (input) => input.toUpperCase();
function CapitalizeImmediate(context, state, type, options) {
    const instantiatedType = InstantiateType(context, state, type);
    return Memory.Update(FromType(CapitalizeMapping, instantiatedType), {}, options);
}
export function CapitalizeInstantiate(context, state, type, options) {
    return (CanInstantiate(context, [type])
        ? CapitalizeImmediate(context, state, type, options)
        : CapitalizeDeferred(type, options));
}
function LowercaseImmediate(context, state, type, options) {
    const instantiatedType = InstantiateType(context, state, type);
    return Memory.Update(FromType(LowercaseMapping, instantiatedType), {}, options);
}
export function LowercaseInstantiate(context, state, type, options) {
    return (CanInstantiate(context, [type])
        ? LowercaseImmediate(context, state, type, options)
        : LowercaseDeferred(type, options));
}
function UncapitalizeImmediate(context, state, type, options) {
    const instantiatedType = InstantiateType(context, state, type);
    return Memory.Update(FromType(UncapitalizeMapping, instantiatedType), {}, options);
}
export function UncapitalizeInstantiate(context, state, type, options) {
    return (CanInstantiate(context, [type])
        ? UncapitalizeImmediate(context, state, type, options)
        : UncapitalizeDeferred(type, options));
}
function UppercaseImmediate(context, state, type, options) {
    const instantiatedType = InstantiateType(context, state, type);
    return Memory.Update(FromType(UppercaseMapping, instantiatedType), {}, options);
}
export function UppercaseInstantiate(context, state, type, options) {
    return (CanInstantiate(context, [type])
        ? UppercaseImmediate(context, state, type, options)
        : UppercaseDeferred(type, options));
}
