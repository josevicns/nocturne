import { type HierarchyCircularNode, type HierarchyNode } from 'd3-hierarchy';
import type { Snippet } from 'svelte';
export type PackProps<T> = {
    /** d3 hierarchy node */
    hierarchy: HierarchyNode<T>;
    /**
     * The size of the pack layout.
     */
    size?: [number, number];
    /**
     * The padding between nodes in the pack layout.
     *
     * @see https://github.com/d3/d3-hierarchy#pack_padding
     */
    padding?: number;
    /**
     * A bindable reference to the computed packed nodes.
     *
     * @bindable
     */
    nodes?: HierarchyCircularNode<T>[];
    children?: Snippet<[{
        nodes: HierarchyCircularNode<T>[];
    }]>;
};
declare function $$render<T>(): {
    props: PackProps<T>;
    exports: {};
    bindings: "nodes";
    slots: {};
    events: {};
};
declare class __sveltets_Render<T> {
    props(): ReturnType<typeof $$render<T>>['props'];
    events(): ReturnType<typeof $$render<T>>['events'];
    slots(): ReturnType<typeof $$render<T>>['slots'];
    bindings(): "nodes";
    exports(): {};
}
interface $$IsomorphicComponent {
    new <T>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<T>['props']>>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<T>['props']>, ReturnType<__sveltets_Render<T>['events']>, ReturnType<__sveltets_Render<T>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<T>['bindings']>;
    } & ReturnType<__sveltets_Render<T>['exports']>;
    <T>(internal: unknown, props: ReturnType<__sveltets_Render<T>['props']> & {}): ReturnType<__sveltets_Render<T>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any>['bindings']>;
}
declare const Pack: $$IsomorphicComponent;
type Pack<T> = InstanceType<typeof Pack<T>>;
export default Pack;
