export type TreemapProps<T> = {
    /** d3 hierarchy node */
    hierarchy: HierarchyNode<T>;
    /**
     * The tile function to use for the treemap layout.
     *
     * @default treemapSquarify
     */
    tile?: typeof treemapSquarify | 'binary' | 'squarify' | 'resquarify' | 'dice' | 'slice' | 'sliceDice';
    /**
     * The padding between nodes.
     *
     * @default 0
     */
    padding?: number | ((node: HierarchyRectangularNode<T>) => number);
    /**
     * The inner padding between nodes.
     *
     * @default 0
     */
    paddingInner?: number | ((node: HierarchyRectangularNode<T>) => number);
    /**
     * The outer padding between nodes.
     *
     * @default 0
     */
    paddingOuter?: number | ((node: HierarchyRectangularNode<T>) => number);
    /**
     * The top padding between nodes.
     *
     * @default 0
     */
    paddingTop?: number | ((node: HierarchyRectangularNode<T>) => number);
    /**
     * The bottom padding between nodes.
     *
     * @default 0
     */
    paddingBottom?: number | ((node: HierarchyRectangularNode<T>) => number);
    /**
     * The left padding between nodes.
     *
     */
    paddingLeft?: number | ((node: HierarchyRectangularNode<T>) => number);
    /**
     * The right padding between nodes.
     *
     */
    paddingRight?: number | ((node: HierarchyRectangularNode<T>) => number);
    /**
     * Modify tiling function for approapriate aspect ratio when treemap is zoomed in
     *
     * @default false
     */
    maintainAspectRatio?: boolean;
    children?: Snippet<[{
        nodes: HierarchyRectangularNode<T>[];
    }]>;
};
import { treemapSquarify, type HierarchyNode, type HierarchyRectangularNode } from 'd3-hierarchy';
import type { Snippet } from 'svelte';
declare function $$render<T>(): {
    props: TreemapProps<T>;
    exports: {};
    bindings: "";
    slots: {};
    events: {};
};
declare class __sveltets_Render<T> {
    props(): ReturnType<typeof $$render<T>>['props'];
    events(): ReturnType<typeof $$render<T>>['events'];
    slots(): ReturnType<typeof $$render<T>>['slots'];
    bindings(): "";
    exports(): {};
}
interface $$IsomorphicComponent {
    new <T>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<T>['props']>>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<T>['props']>, ReturnType<__sveltets_Render<T>['events']>, ReturnType<__sveltets_Render<T>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<T>['bindings']>;
    } & ReturnType<__sveltets_Render<T>['exports']>;
    <T>(internal: unknown, props: ReturnType<__sveltets_Render<T>['props']> & {}): ReturnType<__sveltets_Render<T>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any>['bindings']>;
}
declare const Treemap: $$IsomorphicComponent;
type Treemap<T> = InstanceType<typeof Treemap<T>>;
export default Treemap;
