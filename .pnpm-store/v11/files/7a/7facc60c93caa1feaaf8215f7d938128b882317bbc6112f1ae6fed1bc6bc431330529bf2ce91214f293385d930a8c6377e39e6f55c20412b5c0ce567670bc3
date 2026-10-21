import type { Snippet } from 'svelte';
import type { Placement } from './types.js';
import { type Without } from '../utils/types.js';
export type LegendItem = {
    value: any;
    color: string;
};
export type LegendPropsWithoutHTML = {
    scale?: AnyScale;
    /**
     * The title of the legend.
     *
     * @default ''
     */
    title?: string;
    /**
     * The width of the legend.
     *
     * @default 320
     */
    width?: number;
    /**
     * The height of the legend.
     *
     * @default 10
     */
    height?: number;
    /**
     * The number of ticks to show on the scale.
     * @default width / 64
     */
    ticks?: number;
    tickFormat?: FormatType | FormatConfig;
    tickValues?: any[];
    /**
     * The font size of the tick labels.
     *
     * @default 10
     */
    tickFontSize?: number;
    /**
     * The length of the tick marks.
     *
     * @default 4
     */
    tickLength?: number;
    /**
     * The placement of the legend.
     */
    placement?: Placement;
    /**
     * The orientation of the legend.
     *
     * @default 'horizontal'
     */
    orientation?: 'horizontal' | 'vertical';
    /**
     * Determine display ramp (individual color swatches or continuous ramp)
     *
     * @default 'ramp'
     */
    variant?: 'ramp' | 'swatches';
    /**
     * An array of selected items. If provided, the legend fades unselected items.
     */
    selected?: string[];
    /**
     * Value to indicate on the ramp (e.g. the currently hovered data point).
     * When set, a downward-pointing arrow is drawn above the bar at this value's
     * position. Defaults to auto-detecting from `ctx.tooltip.data` via the
     * chart's color accessor (`ctx.c`).
     */
    value?: number | string | null;
    /**
     * Classes to apply to the elements.
     *
     * @default {}
     */
    classes?: {
        root?: string;
        title?: string;
        label?: string;
        tick?: string;
        items?: string;
        swatch?: string;
        item?: string | ((item: LegendItem) => string);
    };
    onclick?: (e: MouseEvent, detail: LegendItem) => any;
    onpointerenter?: (e: MouseEvent, detail: LegendItem) => any;
    onpointerleave?: (e: MouseEvent, detail: LegendItem) => any;
    /**
     * A bindable reference to the wrapping `<div>` element.
     *
     * @bindable
     */
    ref?: HTMLElement;
    children?: Snippet<[
        {
            values: any[];
            scale: AnyScale | null;
            seriesItems: Array<{
                key: string;
                label: string;
                color: string;
            }> | null;
        }
    ]>;
};
export type LegendProps = LegendPropsWithoutHTML & Without<HTMLAttributes<HTMLElement>, LegendPropsWithoutHTML>;
import type { HTMLAttributes } from 'svelte/elements';
import { type FormatType, type FormatConfig } from '@layerstack/utils';
import type { AnyScale } from '../utils/scales.svelte.js';
declare const Legend: import("svelte").Component<LegendProps, {}, "ref">;
type Legend = ReturnType<typeof Legend>;
export default Legend;
