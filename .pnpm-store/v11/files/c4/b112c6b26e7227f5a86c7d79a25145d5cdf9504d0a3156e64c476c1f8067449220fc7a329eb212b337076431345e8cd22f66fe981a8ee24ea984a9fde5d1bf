// deno-coverage-ignore-start - parsebox tested
// deno-fmt-ignore-file
import { IsEqual, IsString } from './guard.mjs';
function TakeVariant(variant, input) {
    return (IsEqual(input.indexOf(variant), 0)
        ? [variant, input.slice(variant.length)]
        : []);
}
/** Takes one of the given variants or fail */
export function Take(variants, input) {
    const [left, ...right] = variants;
    return (IsString(left)
        ? (() => {
            const result = TakeVariant(left, input);
            return IsEqual(result.length, 2) ? result : Take(right, input);
        })()
        : []);
}
// deno-coverage-ignore-stop
