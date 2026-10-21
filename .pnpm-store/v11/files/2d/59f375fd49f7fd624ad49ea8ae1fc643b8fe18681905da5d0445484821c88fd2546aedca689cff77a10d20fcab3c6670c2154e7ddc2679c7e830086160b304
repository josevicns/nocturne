import type { Component } from 'svelte';
import type { HighlightProps } from './Highlight.shared.svelte.js';
/**
 * Per-layer primitives a `<Highlight.base>` consumer must inject.
 * `Arc` is only used for radial `area`; per-layer wrappers can pass the
 * agnostic Arc until Arc is split.
 */
export type HighlightBaseLayerComponents = {
    Circle: Component<any>;
    Line: Component<any>;
    Rect: Component<any>;
    Arc: Component<any>;
};
export type HighlightBaseProps = HighlightProps & HighlightBaseLayerComponents;
declare const Highlight: Component<HighlightBaseProps, {}, "">;
type Highlight = ReturnType<typeof Highlight>;
export default Highlight;
