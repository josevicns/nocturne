import type { Component } from 'svelte';
import type { ArcChartProps } from './ArcChart.shared.svelte.js';
export type ArcChartBaseLayerComponents = {
    Chart: Component<any>;
    Arc: Component<any>;
    ArcLabel: Component<any>;
    Group: Component<any>;
};
export type ArcChartBaseProps<TData> = ArcChartProps<TData> & ArcChartBaseLayerComponents;
declare function $$render<TData>(): {
    props: ArcChartBaseProps<TData>;
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
declare const ArcChart: $$IsomorphicComponent;
type ArcChart<TData> = InstanceType<typeof ArcChart<TData>>;
export default ArcChart;
