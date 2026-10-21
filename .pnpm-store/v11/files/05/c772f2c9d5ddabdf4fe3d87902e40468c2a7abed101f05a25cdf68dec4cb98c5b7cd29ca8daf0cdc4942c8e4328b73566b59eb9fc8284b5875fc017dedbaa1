import type { Component } from 'svelte';
import type { BarProps } from './Bar.shared.svelte.js';
export type BarBaseLayerComponents = {
    Rect: Component<any>;
    /**
     * Used only when the chart is radial. Optional because the HTML layer
     * doesn't support radial charts and therefore doesn't need to bundle Arc.
     */
    Arc?: Component<any>;
};
export type BarBaseProps = BarProps & BarBaseLayerComponents;
declare const Bar: Component<BarBaseProps, {}, "">;
type Bar = ReturnType<typeof Bar>;
export default Bar;
