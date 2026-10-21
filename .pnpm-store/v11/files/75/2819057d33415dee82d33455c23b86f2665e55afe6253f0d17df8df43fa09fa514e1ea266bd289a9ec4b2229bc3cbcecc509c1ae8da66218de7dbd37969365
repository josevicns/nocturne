// deno-fmt-ignore-file
import { Guard } from '../../guard/index.mjs';
import { Try } from './try/index.mjs';
export function FromBoolean(context, type, value) {
    if (Guard.IsBoolean(value))
        return value;
    const result = Try.TryBoolean(value);
    return Try.IsOk(result) ? result.value : value;
}
