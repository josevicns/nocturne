// deno-fmt-ignore-file
import { Memory } from '../../../system/memory/index.mjs';
import { Object } from '../../types/object.mjs';
import { EvaluateIntersect } from '../evaluate/evaluate.mjs';
import { InterfaceDeferred } from '../../action/index.mjs';
import { CanInstantiate } from '../instantiate.mjs';
import { InstantiateProperties } from '../instantiate.mjs';
import { InstantiateTypes } from '../instantiate.mjs';
function InterfaceImmediate(context, state, heritage, properties, options) {
    const instantiatedHeritage = InstantiateTypes(context, { callstack: [] }, heritage);
    const instantiatedProperties = InstantiateProperties(context, { callstack: [] }, properties);
    const evaluatedInterface = EvaluateIntersect([...instantiatedHeritage, Object(instantiatedProperties)]);
    return Memory.Update(evaluatedInterface, {}, options);
}
export function InterfaceInstantiate(context, state, heritage, properties, options) {
    return (CanInstantiate(context, heritage)
        ? InterfaceImmediate(context, state, heritage, properties, options)
        : InterfaceDeferred(heritage, properties, options));
}
