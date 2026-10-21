// deno-fmt-ignore-file
import { Unreachable } from '../../../system/unreachable/index.mjs';
import { Guard } from '../../../guard/index.mjs';
import { Pattern } from '../../script/parser.mjs';
/** Parses a Pattern into a sequence of TemplateLiteral types */
export function ParsePatternIntoTypes(pattern) {
    const parsed = Pattern(pattern);
    const result = Guard.IsEqual(parsed.length, 2)
        ? parsed[0]
        : Unreachable(); // []
    return result;
}
// deno-coverage-ignore-stop
