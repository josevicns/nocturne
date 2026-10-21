import type { ComponentProps, Snippet } from 'svelte';
import { type FormatType, type FormatConfig } from '@layerstack/utils';
import type { Without } from '../../utils/types.js';
import { type Accessor } from '../../utils/common.js';
import type { ChartState } from '../../states/chart.svelte.js';
import { type TextProps } from '../Text/Text.shared.svelte.js';
import type { Point } from '../Points/Points.shared.svelte.js';
import type Link from '../Link/Link.svelte';
export type LabelsPropsWithoutHTML<T = any> = {
    /** Override data instead of using context */
    data?: T;
    /** Override display value accessor. By default, uses `y` unless yScale is band scale */
    value?: Accessor<T>;
    /** The fill color of the label, string or accessor */
    fill?: string | Accessor<T>;
    /** Override `x` accessor from Chart context */
    x?: Accessor<T>;
    /** Override `y` accessor from Chart context */
    y?: Accessor<T>;
    /** Series key to use for accessor. */
    seriesKey?: string;
    /** @default 'outside' */
    placement?: 'inside' | 'outside' | 'middle' | 'center' | 'smart';
    /**
     * Global positioning algorithm applied across all labels (distinct from the
     * per-point `placement`). `'voronoi'` orients each label towards the open space
     * of its cell — good for scatter plots and maps.
     */
    layout?: 'voronoi';
    /**
     * Hide labels that would overlap a higher-priority (roomier-cell) one, resolving
     * the actual boxes rather than dropping by a proxy. Requires `layout`. Pass an
     * object to tune the spacing — e.g. `{ padding: 8 }` for a sparser result.
     */
    occlude?: boolean | {
        padding?: number;
    };
    /**
     * With `layout="voronoi"`, move each label out into its cell's open space and draw
     * a leader line back to the point (d3-ring-note / smart-labels style). Pass `true`
     * for a straight line, or an object to configure the `<Link>`.
     */
    links?: boolean | Partial<ComponentProps<typeof Link>>;
    /** @default placement === 'center' || placement === 'middle' ? 0 : 4 */
    offset?: number;
    /** The format of the label */
    format?: FormatType | FormatConfig;
    /** @default (d, index) => index */
    key?: (d: T, index: number) => any;
    children?: Snippet<[
        {
            data: Point;
            textProps: TextProps;
            link?: {
                x1: number;
                y1: number;
                x2: number;
                y2: number;
            } | null;
        }
    ]>;
};
export type LabelsProps<T = any> = LabelsPropsWithoutHTML<T> & Without<TextProps, LabelsPropsWithoutHTML<T>>;
/**
 * Reactive state shared by every per-layer Labels variant. Holds the
 * `getTextProps(point, points, i)` helper that computes per-point label
 * positioning + opacity, plus the resolved opacity.
 */
export declare class LabelsState<T = any> {
    #private;
    ctx: ChartState;
    constructor(getProps: () => LabelsProps<T>);
    getDimensions: (item: any) => {
        x: any;
        y: any;
        width: number;
        height: number;
    } | undefined;
    series: import("../index.js").SeriesData<any, any> | undefined;
    derivedOpacity: number;
    getTextProps(point: Point, points?: Point[], i?: number): TextProps;
    /**
     * `layout="voronoi"`: orient each label towards the open space of its Voronoi cell.
     * With `links`, move the label out to the cell centroid and draw a leader back to the
     * point (using AnnotationPoint's `smart` geometry). When `occlude` is set, drop labels
     * that would overlap a roomier-cell label. Returns per-point `{ textProps, link, visible }`,
     * index-aligned to `points`.
     */
    getVoronoiLabels(points: Point[]): Array<{
        textProps: TextProps;
        link: {
            x1: number;
            y1: number;
            x2: number;
            y2: number;
        } | null;
        visible: boolean;
    }>;
}
