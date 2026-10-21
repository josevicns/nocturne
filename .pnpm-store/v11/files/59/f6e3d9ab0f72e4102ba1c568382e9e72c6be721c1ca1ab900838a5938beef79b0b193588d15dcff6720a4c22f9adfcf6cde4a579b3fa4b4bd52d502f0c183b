// deno-fmt-ignore-file
import { Ref } from '../../types/ref.mjs';
import { InstantiateType } from '../instantiate.mjs';
import { CyclicCheck } from '../cyclic/check.mjs';
export function RefInstantiate(context, state, ref) {
    return (ref in context
        ? CyclicCheck([ref], context, context[ref])
            ? Ref(ref)
            : InstantiateType(context, state, context[ref])
        : Ref(ref));
}
