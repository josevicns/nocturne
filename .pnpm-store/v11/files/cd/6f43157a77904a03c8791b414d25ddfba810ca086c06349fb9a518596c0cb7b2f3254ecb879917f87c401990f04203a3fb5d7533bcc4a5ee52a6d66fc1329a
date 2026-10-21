// deno-fmt-ignore-file
import { Evaluate } from '../../type/index.mjs';
import { FromType } from './from-type.mjs';
export function FromIntersect(context, type, value) {
    const evaluated = Evaluate(type);
    return FromType(context, evaluated, value);
}
