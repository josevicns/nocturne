import type { ComponentNode } from '../states/chart.svelte.js';
/**
 * Recursively render the component tree onto a canvas context.
 * Group nodes: save → render → recurse children → restore
 * Leaf nodes: save → render → restore
 * Non-rendering nodes: just recurse children
 */
export declare function renderTree(ctx: CanvasRenderingContext2D, node: ComponentNode): void;
