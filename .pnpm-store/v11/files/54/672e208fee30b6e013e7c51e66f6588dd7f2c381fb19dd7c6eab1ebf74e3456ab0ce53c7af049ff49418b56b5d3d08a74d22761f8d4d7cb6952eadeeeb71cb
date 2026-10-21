// deno-fmt-ignore-file
import { Guard } from '../../guard/index.mjs';
import { Try } from './try/index.mjs';
export function FromNumber(context, type, value) {
    if (Guard.IsNumber(value))
        return value;
    const result = Try.TryNumber(value);
    return Try.IsOk(result) ? result.value : value;
}
