import type { PathProps } from '../Path/Path.shared.svelte.js';
import type { TextProps } from '../Text/Text.shared.svelte.js';
import type { GetArcTextProps, ArcTextOptions } from '../../utils/arcText.svelte.js';
/**
 * Placement options for `ArcLabel`.
 * - `centroid`: at the arc centroid (horizontal text)
 * - `centroid-rotated`: at the arc centroid, rotated to follow the arc tangent
 * - `centroid-radial`: at the arc centroid, rotated to read radially (center → outside)
 * - `inner` / `middle` / `outer`: along the inner / middle / outer arc path
 * - `callout`: outside the arc connected by a polyline with a bend
 */
export type ArcLabelPlacement = 'centroid' | 'centroid-rotated' | 'centroid-radial' | 'inner' | 'middle' | 'outer' | 'callout';
export type ArcLabelConfig = {
    /** @default 'centroid' */
    placement?: ArcLabelPlacement;
    /** @default 16 */
    calloutLineLength?: number;
    /** @default 12 */
    calloutLabelOffset?: number;
    /** @default 4 */
    calloutPadding?: number;
    /** Props applied to the leader line `<Path>` when using `callout` placement. */
    line?: Omit<PathProps, 'pathData'>;
    /** Radial offset for the label, interpreted per-placement. @default 0 */
    offset?: number;
} & ArcTextOptions & Omit<TextProps, 'path'>;
export type ArcLabelProps = {
    /** Function from `Arc` children snippet for `inner`/`middle`/`outer` placements. */
    getArcTextProps?: GetArcTextProps;
    /** Centroid `[x, y]` of the arc (from `Arc` children snippet) */
    centroid?: [number, number];
    /** Arc start angle in radians (from `Arc` children snippet) */
    startAngle?: number;
    /** Arc end angle in radians (from `Arc` children snippet) */
    endAngle?: number;
    /** Arc inner radius (from `Arc` children snippet) */
    innerRadius?: number;
    /** Arc outer radius (from `Arc` children snippet) */
    outerRadius?: number;
} & ArcLabelConfig;
export type ArcLabelCalloutGeometry = {
    pathData: string;
    labelX: number;
    labelY: number;
    textAnchor: 'start' | 'end';
};
/**
 * Reactive state shared by every per-layer ArcLabel variant. Holds derived
 * geometry (callout path, offset centroid, rotation) and resolved text props.
 */
export declare class ArcLabelState {
    #private;
    constructor(getProps: () => ArcLabelProps);
    midAngle: number;
    offsetCentroid: [number, number] | undefined;
    effectiveOuterPadding: number;
    effectiveInnerPadding: number;
    effectiveCalloutLineLength: number;
    centroidRotation: number;
    calloutGeometry: ArcLabelCalloutGeometry | null;
    arcTextProps: {
        value?: string | number | ((d: any) => string | number);
        segments?: import("../Text/Text.shared.svelte.js").TextSegment[];
        width?: number;
        x?: string | number | ((d: any) => any);
        initialX?: string | number;
        y?: string | number | ((d: any) => any);
        initialY?: string | number;
        dx?: string | number;
        dy?: string | number;
        lineHeight?: string;
        fontSize?: number | string;
        capHeight?: string;
        scaleToFit?: boolean;
        textAnchor?: "start" | "middle" | "end" | "inherit";
        verticalAnchor?: "start" | "middle" | "end" | "inherit";
        dominantBaseline?: "auto" | "text-before-edge" | "text-after-edge" | "middle" | "hanging" | "ideographic" | "mathematical";
        rotate?: number;
        svgRef?: SVGElement;
        svgProps?: Omit<import("svelte/elements").SVGAttributes<SVGElement>, "children">;
        ref?: SVGTextElement;
        format?: import("@layerstack/utils").FormatType | import("@layerstack/utils").FormatConfig;
        motion?: import("../../utils/motion.svelte.js").MotionProp;
        truncate?: boolean | import("../Text/Text.shared.svelte.js").TruncateTextOptions;
        pathId?: string;
        path?: string | null;
        startOffset?: string | number;
        data?: any[];
        key?: (d: any, index: number) => any;
    } & import("../../index.js").DataDrivenStyleProps & import("../../index.js").Without<import("svelte/elements").SVGAttributes<SVGTextElement>, import("../Text/Text.shared.svelte.js").TextPropsWithoutHTML>;
}
