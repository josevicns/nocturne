import { Settings } from '../settings/index.mjs';
import { Guard } from '../../guard/index.mjs';
let supported = undefined;
// ------------------------------------------------------------------
// TryEval
// ------------------------------------------------------------------
// deno-coverage-ignore-start - catch is environment dependent
function TryEval() {
    try {
        new globalThis.Function('null')();
        return true;
    }
    catch {
        return false;
    }
}
// deno-coverage-ignore-stop
// ------------------------------------------------------------------
// CanEvaluate
// ------------------------------------------------------------------
/** Returns true if the environment supports dynamic JavaScript evaluation */
export function CanEvaluate() {
    if (Guard.IsUndefined(supported))
        supported = TryEval();
    return supported && Settings.Get().useEval;
}
