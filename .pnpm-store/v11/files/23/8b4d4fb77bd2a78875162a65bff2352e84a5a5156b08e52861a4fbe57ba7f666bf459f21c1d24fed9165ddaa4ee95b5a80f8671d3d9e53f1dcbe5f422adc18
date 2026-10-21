import type { Component } from 'svelte';
import type { Transition } from '../../utils/types.js';
import type { GridProps } from './Grid.shared.svelte.js';
/**
 * Per-layer primitive components a `<Grid.base>` consumer must inject.
 */
export type GridBaseLayerComponents = {
    Group: Component<any>;
    Line: Component<any>;
    Circle: Component<any>;
    Rule: Component<any>;
};
export type GridBaseProps<In extends Transition = Transition> = GridProps<In> & GridBaseLayerComponents;
declare function $$render<T extends Transition = Transition>(): {
    props: GridBaseProps<T>;
    exports: {};
    bindings: "ref";
    slots: {};
    events: {};
};
declare class __sveltets_Render<T extends Transition = Transition> {
    props(): ReturnType<typeof $$render<T>>['props'];
    events(): ReturnType<typeof $$render<T>>['events'];
    slots(): ReturnType<typeof $$render<T>>['slots'];
    bindings(): "ref";
    exports(): {};
}
interface $$IsomorphicComponent {
    new <T extends Transition = Transition>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<T>['props']>>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<T>['props']>, ReturnType<__sveltets_Render<T>['events']>, ReturnType<__sveltets_Render<T>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<T>['bindings']>;
    } & ReturnType<__sveltets_Render<T>['exports']>;
    <T extends Transition = Transition>(internal: unknown, props: ReturnType<__sveltets_Render<T>['props']> & {}): ReturnType<__sveltets_Render<T>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any>['bindings']>;
}
declare const Grid: $$IsomorphicComponent;
type Grid<T extends Transition = Transition> = InstanceType<typeof Grid<T>>;
export default Grid;
