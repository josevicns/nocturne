import type { Snippet } from 'svelte';
import type { SVGAttributes } from 'svelte/elements';
import type { CommonStyleProps, Without } from '../../utils/types.js';
import type { MarkerOptions } from '../MarkerWrapper.svelte';
import { type MotionProp } from '../../utils/motion.svelte.js';
import type { ChartState } from '../../states/chart.svelte.js';
import type { draw as _drawTransition } from 'svelte/transition';
export type PathPropsWithoutHTML = {
    /**
     * The `d` attribute of the rendered `<path>`.
     *
     * Accepts either a value (resolved at call site) or a function that
     * returns the current value. Passing a function lets the parent avoid
     * re-rendering its own template on every change to the path data —
     * useful when a parent like `Link` / `Spline` / `Area` updates the
     * path on every animation tick across hundreds of instances.
     */
    pathData?: string | undefined | null | (() => string | undefined | null);
    /**
     * Whether to animate the drawing of the path over time.
     * Pass either `true` or an object with transition options to
     * enable the transition.
     *
     * Works best with `tweened` disabled.
     */
    draw?: boolean | Parameters<typeof _drawTransition>[1];
    /** Marker to attach to both start and end points of the line */
    marker?: MarkerOptions;
    /** Marker to attach to the middle point of the line */
    markerMid?: MarkerOptions;
    /** Marker to attach to the start point of the line */
    markerStart?: MarkerOptions;
    /** Marker to attach to the end point of the line */
    markerEnd?: MarkerOptions;
    /**
     * Add additional content at the start of the line.
     * Receives `{ point: DOMPoint; value: { x: number; y: number } }` as a snippet prop.
     */
    startContent?: Snippet<[{
        point: DOMPoint;
        value: {
            x: number;
            y: number;
        };
    }]>;
    /**
     * Add additional content at the end of the line.
     * Receives `{ point: DOMPoint; value: { x: number; y: number } }` as a snippet prop.
     */
    endContent?: Snippet<[{
        point: DOMPoint;
        value: {
            x: number;
            y: number;
        };
    }]>;
    /**
     * A reference to the `<path>` element.
     *
     * @bindable
     */
    pathRef?: SVGPathElement;
    motion?: MotionProp;
} & CommonStyleProps;
export type PathProps = PathPropsWithoutHTML & Without<SVGAttributes<SVGPathElement>, PathPropsWithoutHTML>;
/**
 * Reactive state shared by every per-layer Path variant.
 */
export declare class PathState {
    #private;
    chartCtx: ChartState;
    get tweenedPathData(): any;
    drawKey: symbol;
    /**
     * @param getPathData  Hot-path getter — reads only `pathData`. Kept separate from
     *                     `getProps` so the `<path d=...>` updater (and the canvas
     *                     `tweenedPathData` consumer) does not subscribe to every
     *                     Path prop on every tick.
     * @param getProps     Full-props getter — used for one-time / cold-path config
     *                     (motion, draw).
     */
    constructor(getPathData: () => PathProps['pathData'], getProps?: () => PathProps);
}
