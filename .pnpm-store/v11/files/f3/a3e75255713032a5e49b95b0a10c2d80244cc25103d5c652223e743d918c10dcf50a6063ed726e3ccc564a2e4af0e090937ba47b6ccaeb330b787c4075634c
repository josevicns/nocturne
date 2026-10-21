import { fade } from 'svelte/transition';
import type { SVGAttributes } from 'svelte/elements';
import type { Transition, TransitionParams, Without } from '../../utils/types.js';
import { type MotionProp } from '../../utils/motion.svelte.js';
import { type TicksConfig } from '../../utils/ticks.js';
import type { ChartState } from '../../states/chart.svelte.js';
import type { GroupProps } from '../Group/Group.shared.svelte.js';
/** Props forwarded onto the underlying grid line (`<Line>`, `<Circle>`, or `<Spline>`). */
export type GridLineProps = Pick<SVGAttributes<SVGElement>, 'class' | 'style'> & {
    stroke?: string;
    strokeWidth?: number;
    opacity?: number;
    /** Dashed-line pattern. See `Line.dashArray`. */
    dashArray?: number | number[] | string;
};
export type GridPropsWithoutHTML<In extends Transition = Transition> = {
    /**
     * Draw a x-axis lines. Pass props (class, style, stroke, strokeWidth,
     * opacity, dashArray) to forward onto the underlying line.
     *
     * @default false
     */
    x?: boolean | GridLineProps;
    /**
     * Draw a y-axis lines. Pass props (class, style, stroke, strokeWidth,
     * opacity, dashArray) to forward onto the underlying line.
     *
     * @default false
     */
    y?: boolean | GridLineProps;
    /**
     * Control the number of x-axis ticks
     */
    xTicks?: TicksConfig;
    /**
     * Control the number of y-axis ticks
     *
     * @default !isScaleBand(ctx.yScale) ? 4 : undefined
     */
    yTicks?: TicksConfig;
    /**
     * Line alignment when band scale is used (x or y axis)
     *
     * @default 'center'
     */
    bandAlign?: 'center' | 'between';
    /**
     * Render `y` lines with circles or linear splines
     *
     * @default 'circle'
     */
    radialY?: 'circle' | 'linear';
    /**
     * Stroke color for grid lines.
     * Useful for server-side rendering where CSS variables are not available.
     */
    stroke?: string;
    /**
     * Classes to apply to the rendered elements.
     *
     * @default {}
     */
    classes?: {
        root?: string;
        line?: string;
    };
    /**
     * Transition function for entering elements
     * @default  defaults to fade if motion is tweened
     */
    transitionIn?: In;
    /**
     * Parameters for the transitionIn function
     * @default { easing: cubicIn }
     */
    transitionInParams?: TransitionParams<In>;
    /**
     * A reference to the underlying outermost `<g>` element.
     *
     * @bindable
     */
    ref?: SVGGElement;
    motion?: MotionProp;
};
export type GridProps<In extends Transition = Transition> = Omit<GridPropsWithoutHTML<In> & Without<GroupProps, GridPropsWithoutHTML<In>>, 'children'>;
/**
 * Reactive state shared by every per-layer Grid variant.
 */
export declare class GridState {
    #private;
    ctx: ChartState;
    constructor(getProps: () => GridProps);
    yTicks: number | any[] | ((scale: import("../../utils/scales.svelte.js").AnyScale) => any[] | undefined) | {
        interval: import("d3-time").TimeInterval | null;
    } | undefined;
    tweenConfig: import("../../utils/motion.svelte.js").ResolvedTween | undefined;
    defaultTransitionIn: typeof fade | (() => {});
    defaultTransitionInParams: TransitionParams<Transition>;
    xTickVals: any[];
    yTickVals: any[];
    xBandOffset: number;
    yBandOffset: number;
}
