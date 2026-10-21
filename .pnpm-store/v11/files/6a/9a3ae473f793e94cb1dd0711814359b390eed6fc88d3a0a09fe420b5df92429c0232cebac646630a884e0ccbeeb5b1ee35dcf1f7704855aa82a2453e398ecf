// deno-fmt-ignore-file
// deno-lint-ignore-file
import { Guard } from '../../guard/index.mjs';
import { FromType } from './from-type.mjs';
import { IsAdditionalProperties } from '../../schema/types/index.mjs';
export function FromObject(context, type, value) {
    if (!Guard.IsObject(value))
        return value;
    const knownPropertyKeys = Guard.Keys(type.properties);
    // Properties
    for (const key of knownPropertyKeys) {
        // note: we need to traverse into the object and test if the return value
        // yielded a non undefined result. Here we interpret an undefined result as
        // a non assignable property and continue.
        const propertyValue = FromType(context, type.properties[key], value[key]);
        if (Guard.IsUndefined(propertyValue))
            continue;
        value[key] = FromType(context, type.properties[key], value[key]);
    }
    // return if not additional properties
    if (!IsAdditionalProperties(type))
        return value;
    // AdditionalProperties
    for (const key of Guard.Keys(value)) {
        if (knownPropertyKeys.includes(key))
            continue;
        value[key] = FromType(context, type.additionalProperties, value[key]);
    }
    return value;
}
