// deno-fmt-ignore-file
import { Guard } from '../../guard/index.mjs';
import { Try } from './try/index.mjs';
export function FromInteger(context, type, value) {
    if (Guard.IsInteger(value))
        return value;
    const result = Try.TryNumber(value);
    return Try.IsOk(result) ? Math.trunc(result.value) : value;
}
