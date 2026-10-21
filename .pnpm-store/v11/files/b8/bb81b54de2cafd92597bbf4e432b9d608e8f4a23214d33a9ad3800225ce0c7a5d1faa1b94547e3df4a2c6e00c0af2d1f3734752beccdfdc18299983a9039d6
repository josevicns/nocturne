import type { Component } from 'svelte';
import type { AnyScale } from '../../utils/scales.svelte.js';
import type { ChartChildrenProps } from './ChartChildren.shared.svelte.js';
/**
 * Per-layer primitives a `<ChartChildren.base>` consumer must inject.
 *
 * `Layer` is the layer wrapper (Svg / Canvas / Html, or the agnostic
 * `Layer` dispatcher). `Axis` / `Grid` / `Rule` / `Highlight` /
 * `ChartClipPath` are the per-layer compound mark variants (or the
 * agnostic dispatchers).
 */
export type ChartChildrenBaseLayerComponents = {
    Layer: Component<any>;
    Axis: Component<any>;
    Grid: Component<any>;
    Rule: Component<any>;
    Highlight: Component<any>;
    ChartClipPath: Component<any>;
};
export type ChartChildrenBaseProps<TData, XScale extends AnyScale = AnyScale, YScale extends AnyScale = AnyScale> = ChartChildrenProps<TData, XScale, YScale> & ChartChildrenBaseLayerComponents;
declare function $$render<TData = any, XScale extends AnyScale = AnyScale, YScale extends AnyScale = AnyScale>(): {
    props: ChartChildrenBaseProps<TData, XScale, YScale>;
    exports: {};
    bindings: "";
    slots: {};
    events: {};
};
declare class __sveltets_Render<TData = any, XScale extends AnyScale = AnyScale, YScale extends AnyScale = AnyScale> {
    props(): ReturnType<typeof $$render<TData, XScale, YScale>>['props'];
    events(): ReturnType<typeof $$render<TData, XScale, YScale>>['events'];
    slots(): ReturnType<typeof $$render<TData, XScale, YScale>>['slots'];
    bindings(): "";
    exports(): {};
}
interface $$IsomorphicComponent {
    new <TData = any, XScale extends AnyScale = AnyScale, YScale extends AnyScale = AnyScale>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<TData, XScale, YScale>['props']>>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<TData, XScale, YScale>['props']>, ReturnType<__sveltets_Render<TData, XScale, YScale>['events']>, ReturnType<__sveltets_Render<TData, XScale, YScale>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<TData, XScale, YScale>['bindings']>;
    } & ReturnType<__sveltets_Render<TData, XScale, YScale>['exports']>;
    <TData = any, XScale extends AnyScale = AnyScale, YScale extends AnyScale = AnyScale>(internal: unknown, props: ReturnType<__sveltets_Render<TData, XScale, YScale>['props']> & {}): ReturnType<__sveltets_Render<TData, XScale, YScale>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any, any, any>['bindings']>;
}
declare const ChartChildren: $$IsomorphicComponent;
type ChartChildren<TData = any, XScale extends AnyScale = AnyScale, YScale extends AnyScale = AnyScale> = InstanceType<typeof ChartChildren<TData, XScale, YScale>>;
export default ChartChildren;
