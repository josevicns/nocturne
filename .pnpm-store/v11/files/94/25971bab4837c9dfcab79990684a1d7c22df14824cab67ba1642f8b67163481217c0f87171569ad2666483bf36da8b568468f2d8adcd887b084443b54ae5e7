// deno-fmt-ignore-file
import { Guard } from '../../guard/index.mjs';
import { Try } from './try/index.mjs';
export function FromUndefined(context, type, value) {
    if (Guard.IsUndefined(value))
        return value;
    const result = Try.TryUndefined(value);
    return Try.IsOk(result) ? result.value : value;
}
