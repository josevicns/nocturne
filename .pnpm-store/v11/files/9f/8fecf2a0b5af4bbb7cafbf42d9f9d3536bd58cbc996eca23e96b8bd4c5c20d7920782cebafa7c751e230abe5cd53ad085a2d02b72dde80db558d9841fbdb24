import type { Component } from 'svelte';
import type { LabelsProps } from './Labels.shared.svelte.js';
export type LabelsBaseLayerComponents = {
    Text: Component<any>;
    Group: Component<any>;
    Points: Component<any>;
    /** Leader lines for `layout="voronoi"` with `links`. Omitted on the HTML layer. */
    Link?: Component<any>;
};
export type LabelsBaseProps<T = any> = LabelsProps<T> & LabelsBaseLayerComponents;
declare function $$render<TData = any>(): {
    props: LabelsBaseProps<TData>;
    exports: {};
    bindings: "";
    slots: {};
    events: {};
};
declare class __sveltets_Render<TData = any> {
    props(): ReturnType<typeof $$render<TData>>['props'];
    events(): ReturnType<typeof $$render<TData>>['events'];
    slots(): ReturnType<typeof $$render<TData>>['slots'];
    bindings(): "";
    exports(): {};
}
interface $$IsomorphicComponent {
    new <TData = any>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<TData>['props']>>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<TData>['props']>, ReturnType<__sveltets_Render<TData>['events']>, ReturnType<__sveltets_Render<TData>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<TData>['bindings']>;
    } & ReturnType<__sveltets_Render<TData>['exports']>;
    <TData = any>(internal: unknown, props: ReturnType<__sveltets_Render<TData>['props']> & {}): ReturnType<__sveltets_Render<TData>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any>['bindings']>;
}
declare const Labels: $$IsomorphicComponent;
type Labels<TData = any> = InstanceType<typeof Labels<TData>>;
export default Labels;
