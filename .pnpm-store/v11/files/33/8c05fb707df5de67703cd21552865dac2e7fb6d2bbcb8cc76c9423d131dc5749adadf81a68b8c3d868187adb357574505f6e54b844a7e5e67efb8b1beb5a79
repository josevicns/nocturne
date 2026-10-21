// deno-fmt-ignore-file
import { Guard } from '../../guard/index.mjs';
import { Try } from './try/index.mjs';
export function FromNull(context, type, value) {
    if (Guard.IsNull(value))
        return value;
    const result = Try.TryNull(value);
    return Try.IsOk(result) ? result.value : value;
}
