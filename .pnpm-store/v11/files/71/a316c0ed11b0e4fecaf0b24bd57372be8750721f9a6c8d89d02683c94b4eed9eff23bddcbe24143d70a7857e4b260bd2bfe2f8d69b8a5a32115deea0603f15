import type { Component } from 'svelte';
import type { HullProps } from './Hull.shared.svelte.js';
export type HullBaseLayerComponents = {
    Group: Component<any>;
    Spline: Component<any>;
};
export type HullBaseProps = HullProps & HullBaseLayerComponents;
declare const Hull: Component<HullBaseProps, {}, "ref">;
type Hull = ReturnType<typeof Hull>;
export default Hull;
