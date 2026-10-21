import type { Component } from 'svelte';
import type { Transition } from '../../utils/types.js';
import type { AxisProps } from './Axis.shared.svelte.js';
/**
 * Per-layer primitive components a `<Axis.base>` consumer must inject.
 * Each per-layer variant (`Axis.svg.svelte`, etc.) imports the matching
 * primitive variants and forwards them here so the template stays in
 * one place.
 */
export type AxisBaseLayerComponents = {
    Group: Component<any>;
    Line: Component<any>;
    Text: Component<any>;
    Rule: Component<any>;
};
export type AxisBaseProps<In extends Transition = Transition> = AxisProps<In> & AxisBaseLayerComponents;
declare function $$render<T extends Transition = Transition>(): {
    props: AxisBaseProps<T>;
    exports: {};
    bindings: "";
    slots: {};
    events: {};
};
declare class __sveltets_Render<T extends Transition = Transition> {
    props(): ReturnType<typeof $$render<T>>['props'];
    events(): ReturnType<typeof $$render<T>>['events'];
    slots(): ReturnType<typeof $$render<T>>['slots'];
    bindings(): "";
    exports(): {};
}
interface $$IsomorphicComponent {
    new <T extends Transition = Transition>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<T>['props']>>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<T>['props']>, ReturnType<__sveltets_Render<T>['events']>, ReturnType<__sveltets_Render<T>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<T>['bindings']>;
    } & ReturnType<__sveltets_Render<T>['exports']>;
    <T extends Transition = Transition>(internal: unknown, props: ReturnType<__sveltets_Render<T>['props']> & {}): ReturnType<__sveltets_Render<T>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any>['bindings']>;
}
declare const Axis: $$IsomorphicComponent;
type Axis<T extends Transition = Transition> = InstanceType<typeof Axis<T>>;
export default Axis;
