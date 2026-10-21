import type { Component } from 'svelte';
import type { CellProps } from './Cell.shared.svelte.js';
export type CellBaseLayerComponents = {
    Rect: Component<any>;
    Circle: Component<any>;
    Group: Component<any>;
};
export type CellBaseProps = CellProps & CellBaseLayerComponents;
declare const Cell: Component<CellBaseProps, {}, "">;
type Cell = ReturnType<typeof Cell>;
export default Cell;
