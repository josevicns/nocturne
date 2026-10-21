// deno-fmt-ignore-file
import { Unreachable } from '../../../system/unreachable/index.mjs';
import { Guard } from '../../../guard/index.mjs';
import { IsSchema } from '../../types/schema.mjs';
import { Union, IsUnion } from '../../types/union.mjs';
import { String } from '../../types/string.mjs';
import { Literal, IsLiteral } from '../../types/literal.mjs';
import { ParsePatternIntoTypes } from '../patterns/pattern.mjs';
import { TemplateLiteralFinite } from './finite.mjs';
function FromLiteralPush(variants, value, result = []) {
    const [left, ...right] = variants;
    return (Guard.IsString(left) ? FromLiteralPush(right, value, [...result, `${left}${value}`]) : result);
}
function FromLiteral(variants, value) {
    return (Guard.IsEqual(variants.length, 0) ? [`${value}`] : FromLiteralPush(variants, value));
}
function FromUnion(variants, types, result = []) {
    const [left, ...right] = types;
    return (IsSchema(left)
        ? FromUnion(variants, right, [...result, ...FromType(variants, left)])
        : result);
}
// ------------------------------------------------------------------
// deno-coverage-ignore-start - symmetric unreachable | internal
// 
// Parsed TemplateLiteral patterns only yield Literal or Union but
// we keep the fall-through to assert that no other types can reach 
// here without error.
//
// ------------------------------------------------------------------
function FromType(variants, type) {
    const result = (IsUnion(type) ? FromUnion(variants, type.anyOf) :
        IsLiteral(type) ? FromLiteral(variants, type.const) :
            Unreachable() // []
    );
    return result;
}
function DecodeFromSpan(variants, types) {
    const [left, ...right] = types;
    return (IsSchema(left) ? DecodeFromSpan(FromType(variants, left), right) : variants);
}
function VariantsToLiterals(variants) {
    return variants.map(variant => Literal(variant));
}
function DecodeTypesAsUnion(types) {
    const variants = DecodeFromSpan([], types);
    const literals = VariantsToLiterals(variants);
    const result = Union(literals);
    return result;
}
// ------------------------------------------------------------------
// deno-coverage-ignore-start - internal
// 
// Cannot invoke the 0-length condition as the TemplateLiteral 
// parsers always return at least 1 TLiteral or TUnion. We would 
// return a empty string TLiteral for this case, but will use 
// Unreachable to catch parse inputs that trigger 0-length.
//
// ------------------------------------------------------------------
function DecodeTypes(types) {
    return (Guard.IsEqual(types.length, 0) ? Unreachable() : // Literal('') :
        Guard.IsEqual(types.length, 1) && IsLiteral(types[0]) ? types[0] :
            DecodeTypesAsUnion(types));
}
/** Decodes a TemplateLiteral into a Type. If the TemplateLiteral yields a non-finite set, the return value is TString */
export function TemplateLiteralDecode(pattern) {
    const types = ParsePatternIntoTypes(pattern);
    const finite = TemplateLiteralFinite(types);
    const result = finite
        ? DecodeTypes(types)
        : String();
    return result;
}
