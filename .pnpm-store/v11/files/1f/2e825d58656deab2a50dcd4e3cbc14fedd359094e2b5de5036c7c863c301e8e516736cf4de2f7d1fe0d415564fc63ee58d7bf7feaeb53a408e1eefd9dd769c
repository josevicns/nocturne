// deno-fmt-ignore-file
import { Memory } from '../../../system/memory/index.mjs';
import { InstantiateType } from '../instantiate.mjs';
import { EvaluateType } from './evaluate.mjs';
function EvaluateImmediate(context, state, type, options) {
    const instantiatedType = InstantiateType(context, state, type);
    return Memory.Update(EvaluateType(instantiatedType), {}, options);
}
export function EvaluateInstantiate(context, state, type, options) {
    return (
    // [instantiation-rule]
    //
    // Evaluate instantiation should never defer on instantiate as the caller is specifically 
    // requesting that the type be evaluated in whatever context is available. However, actions 
    // embedded in the Evaluate call may defer local to themselves.
    EvaluateImmediate(context, state, type, options));
}
