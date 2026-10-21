// deno-fmt-ignore-file
// deno-lint-ignore-file
import { Evaluate } from '../../type/index.mjs';
import { FromType } from './from-type.mjs';
export function FromIntersect(context, type, value) {
    const evaluted = Evaluate(type);
    return FromType(context, evaluted, value);
}
