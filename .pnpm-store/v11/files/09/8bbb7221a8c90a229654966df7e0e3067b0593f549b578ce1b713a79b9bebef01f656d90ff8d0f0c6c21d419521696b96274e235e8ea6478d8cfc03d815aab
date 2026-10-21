// deno-fmt-ignore-file
import { Memory } from '../../../system/memory/index.mjs';
import { IsSchema } from '../../types/schema.mjs';
import { InstantiateType } from '../instantiate.mjs';
import { Extends, ExtendsResult } from '../../extends/index.mjs';
import { IsInfer } from '../../types/infer.mjs';
import { IsCall } from '../../types/call.mjs';
// ------------------------------------------------------------------
// AssertArgument
// ------------------------------------------------------------------
function AssertArgumentExtends(name, type, extends_) {
    if (IsInfer(type) || IsCall(type) || ExtendsResult.IsExtendsTrueLike(Extends({}, type, extends_)))
        return;
    const cause = { parameter: name, extends: extends_, received: type };
    // @ts-ignore - no definition for { cause } options 
    throw new Error('Generic argument does not satify constraint', { cause });
}
function BindArgument(context, state, name, extends_, type) {
    const instantiatedArgument = InstantiateType(context, state, type);
    AssertArgumentExtends(name, instantiatedArgument, extends_);
    return Memory.Assign(context, { [name]: instantiatedArgument });
}
function BindArguments(context, state, parameterLeft, parameterRight, arguments_) {
    const instantiatedExtends = InstantiateType(context, state, parameterLeft.extends);
    const instantiatedEquals = InstantiateType(context, state, parameterLeft.equals);
    const [left, ...right] = arguments_;
    return (IsSchema(left)
        ? BindParameters(BindArgument(context, state, parameterLeft['name'], instantiatedExtends, left), state, parameterRight, right)
        : BindParameters(BindArgument(context, state, parameterLeft['name'], instantiatedExtends, instantiatedEquals), state, parameterRight, []));
}
function BindParameters(context, state, parameters, arguments_) {
    const [left, ...right] = parameters;
    return (IsSchema(left)
        ? BindArguments(context, state, left, right, arguments_)
        : context);
}
export function ResolveArgumentsContext(context, state, parameters, arguments_) {
    return BindParameters(context, state, parameters, arguments_);
}
