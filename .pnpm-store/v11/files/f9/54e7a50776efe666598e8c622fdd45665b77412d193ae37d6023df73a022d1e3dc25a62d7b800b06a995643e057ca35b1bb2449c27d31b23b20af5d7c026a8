import type { Component } from 'svelte';
import type { AnyScale } from '../../utils/scales.svelte.js';
import type { ChartProps } from './Chart.shared.svelte.js';
export type ChartBaseProps<T, XScale extends AnyScale = AnyScale, YScale extends AnyScale = AnyScale> = ChartProps<T, XScale, YScale> & {
    /**
     * The `ChartChildren` component to render inside the chart. Per-layer
     * variants (`Chart.svg.svelte` etc.) inject the matching per-layer
     * `ChartChildren` so the underlying primitive imports are layer-specific.
     *
     * When undefined (used by `ChartCore`), the `children` snippet is rendered
     * directly without `ChartChildren` — skipping the `Axis` / `Grid` / `Rule` /
     * `Highlight` / `ChartClipPath` / `Layer` import chain.
     */
    ChartChildren?: Component<any>;
};
declare function $$render<TData = any, XScale extends AnyScale = AnyScale, YScale extends AnyScale = AnyScale>(): {
    props: ChartBaseProps<TData, XScale, YScale>;
    exports: {};
    bindings: "ref" | "context";
    slots: {};
    events: {};
};
declare class __sveltets_Render<TData = any, XScale extends AnyScale = AnyScale, YScale extends AnyScale = AnyScale> {
    props(): ReturnType<typeof $$render<TData, XScale, YScale>>['props'];
    events(): ReturnType<typeof $$render<TData, XScale, YScale>>['events'];
    slots(): ReturnType<typeof $$render<TData, XScale, YScale>>['slots'];
    bindings(): "ref" | "context";
    exports(): {};
}
interface $$IsomorphicComponent {
    new <TData = any, XScale extends AnyScale = AnyScale, YScale extends AnyScale = AnyScale>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<TData, XScale, YScale>['props']>>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<TData, XScale, YScale>['props']>, ReturnType<__sveltets_Render<TData, XScale, YScale>['events']>, ReturnType<__sveltets_Render<TData, XScale, YScale>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<TData, XScale, YScale>['bindings']>;
    } & ReturnType<__sveltets_Render<TData, XScale, YScale>['exports']>;
    <TData = any, XScale extends AnyScale = AnyScale, YScale extends AnyScale = AnyScale>(internal: unknown, props: ReturnType<__sveltets_Render<TData, XScale, YScale>['props']> & {}): ReturnType<__sveltets_Render<TData, XScale, YScale>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any, any, any>['bindings']>;
}
declare const Chart: $$IsomorphicComponent;
type Chart<TData = any, XScale extends AnyScale = AnyScale, YScale extends AnyScale = AnyScale> = InstanceType<typeof Chart<TData, XScale, YScale>>;
export default Chart;
