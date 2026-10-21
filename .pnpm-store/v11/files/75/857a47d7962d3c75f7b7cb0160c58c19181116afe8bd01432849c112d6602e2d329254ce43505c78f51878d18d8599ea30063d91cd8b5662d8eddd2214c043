import type { Component } from 'svelte';
import type { BarChartProps } from './BarChart.shared.svelte.js';
export type BarChartBaseLayerComponents = {
    Chart: Component<any>;
    Bars: Component<any>;
};
export type BarChartBaseProps<TData> = BarChartProps<TData> & BarChartBaseLayerComponents;
declare function $$render<TData>(): {
    props: BarChartBaseProps<TData>;
    exports: {};
    bindings: "context";
    slots: {};
    events: {};
};
declare class __sveltets_Render<TData> {
    props(): ReturnType<typeof $$render<TData>>['props'];
    events(): ReturnType<typeof $$render<TData>>['events'];
    slots(): ReturnType<typeof $$render<TData>>['slots'];
    bindings(): "context";
    exports(): {};
}
interface $$IsomorphicComponent {
    new <TData>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<TData>['props']>>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<TData>['props']>, ReturnType<__sveltets_Render<TData>['events']>, ReturnType<__sveltets_Render<TData>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<TData>['bindings']>;
    } & ReturnType<__sveltets_Render<TData>['exports']>;
    <TData>(internal: unknown, props: ReturnType<__sveltets_Render<TData>['props']> & {}): ReturnType<__sveltets_Render<TData>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any>['bindings']>;
}
declare const BarChart: $$IsomorphicComponent;
type BarChart<TData> = InstanceType<typeof BarChart<TData>>;
export default BarChart;
