import type { MouseEventHandler, PointerEventHandler, TouchEventHandler } from 'svelte/elements';
import type { ComputedStylesOptions } from '../utils/canvas.js';
import type { ComponentNode } from '../states/chart.svelte.js';
export type ComponentRender<T extends Element = Element> = {
    render: (ctx: CanvasRenderingContext2D, styleOverrides?: ComputedStylesOptions) => any;
    events?: {
        click?: MouseEventHandler<T> | null;
        dblclick?: MouseEventHandler<T> | null;
        pointerenter?: PointerEventHandler<T> | null;
        pointerover?: PointerEventHandler<T> | null;
        pointermove?: PointerEventHandler<T> | null;
        pointerleave?: PointerEventHandler<T> | null;
        pointerout?: PointerEventHandler<T> | null;
        pointerdown?: PointerEventHandler<T> | null;
        touchmove?: TouchEventHandler<T> | null;
    };
    /**
     * Optional dependencies to track and invalidate the canvas context when they change.
     */
    deps?: () => any[];
};
export type CanvasContextValue = {
    /**
     * Register component to render.
     *
     * Returns method to unregister on component destroy
     */
    register<T extends Element>(component: ComponentRender<T>): () => void;
    invalidate(): void;
    /** Get the root ComponentNode of the canvas render tree. Used for server-side rendering. */
    getRootNode?: () => ComponentNode;
};
export declare function getCanvasContext(): CanvasContextValue;
export declare function setCanvasContext(context: CanvasContextValue): CanvasContextValue;
