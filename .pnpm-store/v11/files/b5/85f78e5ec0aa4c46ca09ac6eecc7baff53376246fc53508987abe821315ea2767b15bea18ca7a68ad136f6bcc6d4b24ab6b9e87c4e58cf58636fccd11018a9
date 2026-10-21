// deno-fmt-ignore-file
import { Guard } from '../../guard/index.mjs';
import { Try } from './try/index.mjs';
export function FromString(context, type, value) {
    if (Guard.IsString(value))
        return value;
    const result = Try.TryString(value);
    return Try.IsOk(result) ? result.value : value;
}
