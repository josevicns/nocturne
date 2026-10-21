// deno-fmt-ignore-file
import { Memory } from '../../../system/memory/index.mjs';
import { IsLiteralNumber, IsLiteralString } from '../../types/literal.mjs';
import { Object } from '../../types/object.mjs';
import { MappedKeys } from './mapped-keys.mjs';
import { IsTemplateLiteral } from '../../types/template-literal.mjs';
import { MappedDeferred } from '../../action/mapped.mjs';
import { TemplateLiteralDecode } from '../template-literal/decode.mjs';
import { InstantiateType, CanInstantiate } from '../instantiate.mjs';
function InstantiateKeyAs(context, state, identifier, key, as) {
    const contextWithKey = Memory.Assign(context, { [identifier['name']]: key });
    const instantiatedKeyAs = InstantiateType(contextWithKey, state, as);
    const result = IsTemplateLiteral(instantiatedKeyAs) ? TemplateLiteralDecode(instantiatedKeyAs.pattern) : instantiatedKeyAs;
    return result;
}
function InstantiateProperty(context, state, identifier, key, property) {
    const contextWithKey = Memory.Assign(context, { [identifier['name']]: key });
    const instantiatedProperty = InstantiateType(contextWithKey, state, property);
    return instantiatedProperty;
}
function MappedProperty(context, state, identifier, key, as, property) {
    const instantiatedProperty = InstantiateProperty(context, state, identifier, key, property);
    const instantiatedKeyAs = InstantiateKeyAs(context, state, identifier, key, as);
    return (IsLiteralString(instantiatedKeyAs) || IsLiteralNumber(instantiatedKeyAs)
        ? { [instantiatedKeyAs.const]: instantiatedProperty }
        : {});
}
function MappedProperties(context, state, identifier, keys, as, type) {
    return keys.reduce((result, left) => {
        return { ...result, ...MappedProperty(context, state, identifier, left, as, type) };
    }, {});
}
function MappedAction(context, state, identifier, key, as, type) {
    const keys = MappedKeys(key);
    const mapped = MappedProperties(context, state, identifier, keys, as, type);
    const result = Object(mapped);
    return result;
}
function MappedImmediate(context, state, identifier, key, as, property, options) {
    const instantiatedKey = InstantiateType(context, state, key);
    return Memory.Update(MappedAction(context, state, identifier, instantiatedKey, as, property), {}, options);
}
export function MappedInstantiate(context, state, identifier, key, as, property, options) {
    return (CanInstantiate(context, [key])
        ? MappedImmediate(context, state, identifier, key, as, property, options)
        : MappedDeferred(identifier, key, as, property, options));
}
