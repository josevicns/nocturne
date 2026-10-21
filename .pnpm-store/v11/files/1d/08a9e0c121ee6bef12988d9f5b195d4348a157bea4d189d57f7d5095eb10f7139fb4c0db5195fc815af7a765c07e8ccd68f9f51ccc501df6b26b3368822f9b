import type { Placement } from '../../types.js';
import { type Without } from '../../../utils/types.js';
export type GeoLegendUnits = 'km' | 'mi';
export type GeoLegendVariant = 'bracket' | 'alternating';
export type GeoLegendPropsWithoutHTML = {
    /**
     * Units to display.
     *
     * @default 'mi'
     */
    units?: GeoLegendUnits;
    /**
     * Visual style of the bar.
     * - `'bracket'`: top rule with downward brackets at each tick (default)
     * - `'alternating'`: alternating filled/unfilled segments between ticks
     *
     * @default 'bracket'
     */
    variant?: GeoLegendVariant;
    /**
     * Explicit distance to represent (in `units`). When omitted, a "nice" round
     * value is chosen so the bar covers roughly 25% of the chart width.
     */
    distance?: number;
    /**
     * Number of tick subdivisions of the bar.
     *
     * @default 4
     */
    ticks?: number;
    /**
     * Where to place the tick labels relative to the bar. Useful for stacking
     * two legends (e.g. kilometers + miles) tightly.
     *
     * @default 'bottom'
     */
    labelPlacement?: 'top' | 'bottom';
    /**
     * Format for the tick labels. Receives the distance in `units`.
     */
    tickFormat?: FormatType | FormatConfig | ((value: number) => string);
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
     * The thickness of the bar.
     *
     * @default 4
     */
    height?: number;
    /**
     * The title of the legend.
     *
     * @default ''
     */
    title?: string;
    /**
     * Reference point in chart pixel coordinates used to compute the
     * pixels-per-distance ratio. Defaults to the center of the chart's plot
     * area, which is generally a reasonable approximation away from the poles.
     */
    referencePoint?: [number, number];
    /**
     * Scale of the projection originally used to pre-project the data, for
     * charts that render pre-projected topologies via `geoIdentity`. For
     * example, the `us-atlas` `counties-albers-10m` / `states-albers-10m`
     * topologies are pre-projected with `geoAlbersUsa().scale(1300)`, so pass
     * `referenceScale={1300}`. When provided, pixels-per-distance is derived
     * directly from the chart's `geoIdentity` fit scale and this reference
     * scale, bypassing the `projection.invert` + `geoDistance` path which
     * does not work for pre-projected data.
     */
    referenceScale?: number;
    /**
     * The placement of the legend.
     */
    placement?: Placement;
    /**
     * The fill/stroke color of the bar.
     *
     * @default 'currentColor'
     */
    color?: string;
    /**
     * Classes to apply to the elements.
     *
     * @default {}
     */
    classes?: {
        root?: string;
        title?: string;
        bar?: string;
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
export type GeoLegendProps = GeoLegendPropsWithoutHTML & Without<HTMLAttributes<HTMLElement>, GeoLegendPropsWithoutHTML>;
import type { HTMLAttributes } from 'svelte/elements';
import { type FormatType, type FormatConfig } from '@layerstack/utils';
declare const GeoLegend: import("svelte").Component<GeoLegendProps, {}, "ref">;
type GeoLegend = ReturnType<typeof GeoLegend>;
export default GeoLegend;
