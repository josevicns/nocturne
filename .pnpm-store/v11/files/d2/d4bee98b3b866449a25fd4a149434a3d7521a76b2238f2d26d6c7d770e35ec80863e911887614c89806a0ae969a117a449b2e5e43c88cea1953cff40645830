// deno-fmt-ignore-file
import { Guard } from '../../guard/index.mjs';
import { Try } from './try/index.mjs';
export function FromVoid(context, type, value) {
    if (Guard.IsUndefined(value))
        return value;
    const result = Try.TryUndefined(value);
    return Try.IsOk(result) ? (void 0) : value;
}
