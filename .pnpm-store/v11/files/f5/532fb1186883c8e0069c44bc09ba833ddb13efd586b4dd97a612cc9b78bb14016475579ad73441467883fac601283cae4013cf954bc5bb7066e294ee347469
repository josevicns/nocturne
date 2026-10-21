// deno-fmt-ignore-file
import { Guard } from '../../../guard/index.mjs';
import { CallConstruct } from '../../types/call.mjs';
import { Ref } from '../../types/ref.mjs';
import { IsGeneric } from '../../types/generic.mjs';
import { InstantiateType } from '../instantiate.mjs';
import { InstantiateTypes } from '../instantiate.mjs';
// ----------------------------------------------------------------------------
// Call: Infrastructure
// ----------------------------------------------------------------------------
import { ResolveTarget } from './resolve-target.mjs';
import { ResolveArgumentsContext } from './resolve-arguments.mjs';
function Peek(callstack) {
    return (Guard.IsGreaterThan(callstack.length, 0) ? callstack[0] : '');
}
function DeferredCall(context, state, target, arguments_) {
    const instantiatedArguments = InstantiateTypes(context, state, arguments_);
    const deferredCall = CallConstruct(target, instantiatedArguments);
    return deferredCall;
}
function TailCall(context, state, name, arguments_) {
    const deferredCall = DeferredCall(context, state, Ref(name), arguments_);
    return deferredCall;
}
function HeadCall(context, state, name, parameters, expression, arguments_) {
    const instantiatedArguments = InstantiateTypes(context, state, arguments_);
    const argumentsContext = ResolveArgumentsContext(context, state, parameters, instantiatedArguments);
    const returnType = InstantiateType(argumentsContext, { callstack: [...state.callstack, name] }, expression);
    return InstantiateType(context, state, returnType);
}
export function CallInstantiate(context, state, target, arguments_) {
    const [name, type] = ResolveTarget(context, target, arguments_);
    return (IsGeneric(type)
        ? Guard.IsEqual(Peek(state.callstack), name)
            ? TailCall(context, state, name, arguments_)
            : HeadCall(context, state, name, type.parameters, type.expression, arguments_)
        : DeferredCall(context, state, target, arguments_));
}
