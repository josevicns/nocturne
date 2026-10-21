// deno-fmt-ignore-file
import { IsCyclic } from '../types/cyclic.mjs';
import { ExtendsLeft } from './extends-left.mjs';
import { CyclicExtends } from '../engine/cyclic/index.mjs';
function Normal(type) {
    return (IsCyclic(type)
        ? CyclicExtends(type)
        : type);
}
/** Performs a structural extends check on left and right types and yields inferred types on right if specified. */
export function Extends(inferred, left, right) {
    const normalLeft = Normal(left);
    const normalRight = Normal(right);
    return ExtendsLeft(inferred, normalLeft, normalRight);
}
