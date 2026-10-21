import type { Placement } from './types.js';
import { type Without } from '../utils/types.js';
export type CircleLegendPropsWithoutHTML = {
    /**
     * The scale to use for the legend. Defaults to the chart's `rScale`.
     */
    scale?: AnyScale;
    /**
     * The title of the legend.
     *
     * @default ''
     */
    title?: string;
    /**
     * The number of ticks to show.
     *
     * @default 4
     */
    ticks?: number;
    /**
     * Explicit tick values to show. Overrides `ticks`.
     */
    tickValues?: number[];
    /**
     * Format for the tick labels.
     */
    tickFormat?: FormatType | FormatConfig;
    /**
     * The font size of the tick labels.
     *
     * @default 10
     */
    tickFontSize?: number;
    /**
     * The font size of the title.
     *
     * @default 10
     */
    titleFontSize?: number;
    /**
     * Width reserved for the tick labels next to the circles.
     *
     * @default 40
     */
    labelWidth?: number;
    /**
     * Gap between the top of each circle and the leader line/label.
     *
     * @default 4
     */
    labelGap?: number;
    /**
     * Where to render the tick labels.
     * - `'right'` / `'left'`: outside the circles with a leader line
     * - `'inline'`: centered inside each circle, near the top
     *
     * @default 'right'
     */
    labelPlacement?: 'left' | 'right' | 'inline';
    /**
     * The placement of the legend.
     */
    placement?: Placement;
    /**
     * The fill color of the circles.
     *
     * @default 'none'
     */
    fill?: string;
    /**
     * The stroke color of the circles and leader lines.
     *
     * @default 'currentColor'
     */
    stroke?: string;
    /**
     * The stroke width of the circles.
     *
     * @default 1
     */
    strokeWidth?: number;
    /**
     * Value to indicate on the legend (e.g. the currently hovered data point).
     * When set, a 50%-opacity filled circle is drawn at this value's radius.
     * Defaults to auto-detecting from `ctx.tooltip.data` via the chart's
     * radius accessor (`ctx.r`).
     */
    value?: number | null;
    /**
     * Classes to apply to the elements.
     *
     * @default {}
     */
    classes?: {
        root?: string;
        title?: string;
        circle?: string;
        tick?: string;
        label?: string;
    };
    /**
     * A bindable reference to the wrapping `<div>` element.
     *
     * @bindable
     */
    ref?: HTMLElement;
};
export type CircleLegendProps = CircleLegendPropsWithoutHTML & Without<HTMLAttributes<HTMLElement>, CircleLegendPropsWithoutHTML>;
import type { HTMLAttributes } from 'svelte/elements';
import { type FormatType, type FormatConfig } from '@layerstack/utils';
import type { AnyScale } from '../utils/scales.svelte.js';
declare const CircleLegend: import("svelte").Component<CircleLegendProps, {}, "ref">;
type CircleLegend = ReturnType<typeof CircleLegend>;
export default CircleLegend;
