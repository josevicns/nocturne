// deno-fmt-ignore-file
import { FromType } from './from-type.mjs';
import { Guard } from '../../guard/index.mjs';
export function FromArray(context, type, value) {
    return Guard.IsArray(value)
        ? value.map(value => FromType(context, type.items, value))
        : value;
}
