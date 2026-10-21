import type { Component } from 'svelte';
import type { ScatterChartProps } from './ScatterChart.shared.svelte.js';
export type ScatterChartBaseLayerComponents = {
    Chart: Component<any>;
    Points: Component<any>;
};
export type ScatterChartBaseProps<TData> = ScatterChartProps<TData> & ScatterChartBaseLayerComponents;
declare function $$render<TData>(): {
    props: ScatterChartBaseProps<TData>;
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
declare const ScatterChart: $$IsomorphicComponent;
type ScatterChart<TData> = InstanceType<typeof ScatterChart<TData>>;
export default ScatterChart;
