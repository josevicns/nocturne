import { Context } from 'runed';
import {} from '../components/TransformContext.svelte';
import { createDefaultTransformState, } from '../states/transform.svelte.js';
const _TransformContext = new Context('TransformContext');
export function getTransformContext() {
    return _TransformContext.getOr(createDefaultTransformState());
}
export function setTransformContext(transform) {
    return _TransformContext.set(transform);
}
