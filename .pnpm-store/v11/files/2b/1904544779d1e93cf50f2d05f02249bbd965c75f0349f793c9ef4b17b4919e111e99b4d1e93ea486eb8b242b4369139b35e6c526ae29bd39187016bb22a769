// deno-fmt-ignore-file
import { Guard } from '../../guard/index.mjs';
import { FromType } from './from-type.mjs';
import { Callback } from './callback.mjs';
export function FromRef(direction, context, type, value) {
    value = Guard.HasPropertyKey(context, type.$ref)
        ? FromType(direction, context, context[type.$ref], value)
        : value;
    return Callback(direction, context, type, value);
}
