// deno-fmt-ignore-file
import { Memory } from '../../../system/memory/index.mjs';
import { IsLiteralNumber, IsLiteralString } from '../../types/literal.mjs';
import { Object } from '../../types/object.mjs';
import { IsTemplateLiteral } from '../../types/template-literal.mjs';
import { MappedDeferred } from '../../action/mapped.mjs';
import { TemplateLiteralDecode } from '../template-literal/decode.mjs';
import { InstantiateType, CanInstantiate } from '../instantiate.mjs';
import { MappedVariants } from './mapped-variants.mjs';
import { EvaluateIntersect } from '../evaluate/index.mjs';
function CanonicalAs(instantiatedAs) {
    const result = IsTemplateLiteral(instantiatedAs) ? TemplateLiteralDecode(instantiatedAs.pattern) : instantiatedAs;
    return result;
}
function MappedVariant(context, state, identifier, variant, as, property) {
    const variantContext = Memory.Assign(context, { [identifier['name']]: variant });
    const instantiatedAs = InstantiateType(variantContext, state, as);
    const canonicalAs = CanonicalAs(instantiatedAs);
    const instantiatedProperty = InstantiateType(variantContext, state, property);
    return (IsLiteralNumber(canonicalAs) || IsLiteralString(canonicalAs)
        ? { [canonicalAs.const]: instantiatedProperty }
        : {});
}
function MappedProperties(context, state, identifier, variants, as, property) {
    return variants.reduce((result, left) => {
        return [...result, MappedVariant(context, state, identifier, left, as, property)];
    }, []);
}
function MappedObjects(properties) {
    return properties.reduce((result, left) => {
        return [...result, Object(left)];
    }, []);
}
function MappedAction(context, state, identifier, type, as, property) {
    const variants = MappedVariants(type);
    const mappedProperties = MappedProperties(context, state, identifier, variants, as, property);
    const mappedObjects = MappedObjects(mappedProperties);
    const result = EvaluateIntersect(mappedObjects);
    return result;
}
function MappedImmediate(context, state, identifier, type, as, property, options) {
    const instantiatedType = InstantiateType(context, state, type);
    return Memory.Update(MappedAction(context, state, identifier, instantiatedType, as, property), {}, options);
}
export function MappedInstantiate(context, state, identifier, type, as, property, options) {
    return (CanInstantiate(context, [type])
        ? MappedImmediate(context, state, identifier, type, as, property, options)
        : MappedDeferred(identifier, type, as, property, options));
}
