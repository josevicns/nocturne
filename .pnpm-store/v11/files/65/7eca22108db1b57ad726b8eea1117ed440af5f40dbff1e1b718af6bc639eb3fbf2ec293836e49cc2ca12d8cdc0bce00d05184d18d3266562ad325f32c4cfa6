import type { Component } from 'svelte';
import type { PieChartProps } from './PieChart.shared.svelte.js';
export type PieChartBaseLayerComponents = {
    Chart: Component<any>;
    Arc: Component<any>;
    ArcLabel: Component<any>;
    Group: Component<any>;
    Pie: Component<any>;
};
export type PieChartBaseProps<TData> = PieChartProps<TData> & PieChartBaseLayerComponents;
declare function $$render<TData>(): {
    props: PieChartBaseProps<TData>;
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
declare const PieChart: $$IsomorphicComponent;
type PieChart<TData> = InstanceType<typeof PieChart<TData>>;
export default PieChart;
