// deno-fmt-ignore-file
import { Arguments } from '../../system/arguments/index.mjs';
import { AssertError } from '../assert/index.mjs';
import { Check } from '../check/index.mjs';
import { Errors } from '../errors/index.mjs';
import { Clean } from '../clean/index.mjs';
import { Clone } from '../clone/index.mjs';
import { Convert } from '../convert/index.mjs';
import { Default } from '../default/index.mjs';
import { Pipeline } from '../pipeline/index.mjs';
// ------------------------------------------------------------------
// Assert
// ------------------------------------------------------------------
export class ParseError extends AssertError {
    constructor(value, errors) {
        super('Parse', value, errors);
    }
}
function Assert(context, type, value) {
    if (!Check(context, type, value))
        throw new ParseError(value, Errors(context, type, value));
    return value;
}
// ------------------------------------------------------------------
// Parser
// ------------------------------------------------------------------
export const Parser = Pipeline([
    (_context, _type, value) => Clone(value),
    (context, type, value) => Default(context, type, value),
    (context, type, value) => Convert(context, type, value),
    (context, type, value) => Clean(context, type, value),
    (context, type, value) => Assert(context, type, value)
]);
/**
 * Parses a value with the given type. The function will Check the value and return
 * early if it matches the provided type. If the value does not match, it is processed
 * through a sequence of Clone, Default, Convert, and Clean operations and checked again.
 * A `ParseError` is thrown if the value fails to match after the processing sequence.
 */
export function Parse(...args) {
    const [context, type, value] = Arguments.Match(args, {
        3: (context, type, value) => [context, type, value],
        2: (type, value) => [{}, type, value],
    });
    const result = Check(context, type, value) ? value : Parser(context, type, value);
    return result;
}
