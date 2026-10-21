// deno-fmt-ignore-file
// deno-lint-ignore-file
import { Guard } from '../../guard/index.mjs';
import { IsKind } from './schema.mjs';
import { Deferred } from './deferred.mjs';
import { ParseTemplateIntoTypes } from '../engine/patterns/template.mjs';
import { Instantiate } from '../engine/instantiate.mjs';
import { Memory } from '../../system/system.mjs';
/** Creates a deferred TemplateLiteral action. */
export function TemplateLiteralDeferred(types, options = {}) {
    return Deferred('TemplateLiteral', [types], options);
}
export function TemplateLiteralFromTypes(types) {
    return Instantiate({}, TemplateLiteralDeferred(types, {}));
}
export function TemplateLiteralFromString(template) {
    const types = ParseTemplateIntoTypes(template);
    return TemplateLiteralFromTypes(types);
}
/** Creates a TemplateLiteral type. */
export function TemplateLiteral(input, options = {}) {
    const type = Guard.IsString(input) ? TemplateLiteralFromString(input) : TemplateLiteralFromTypes(input);
    return Memory.Update(type, {}, options);
}
// ------------------------------------------------------------------
// Guard
// ------------------------------------------------------------------
/** Returns true if the given value is TTemplateLiteral. */
export function IsTemplateLiteral(value) {
    return IsKind(value, 'TemplateLiteral');
}
