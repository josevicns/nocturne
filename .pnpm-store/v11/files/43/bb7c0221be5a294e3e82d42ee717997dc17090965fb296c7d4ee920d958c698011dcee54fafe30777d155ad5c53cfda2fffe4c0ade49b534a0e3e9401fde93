import type { Component } from 'svelte';
import type { RuleProps } from './Rule.shared.svelte.js';
/**
 * Per-layer primitive components a `<Rule.base>` consumer must inject.
 */
export type RuleBaseLayerComponents = {
    Group: Component<any>;
    Line: Component<any>;
    Circle: Component<any>;
};
export type RuleBaseProps = RuleProps & RuleBaseLayerComponents;
declare const Rule: Component<RuleBaseProps, {}, "">;
type Rule = ReturnType<typeof Rule>;
export default Rule;
