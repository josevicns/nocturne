import type { ComponentProps, Snippet } from 'svelte';
import type { SVGAttributes } from 'svelte/elements';
import type Path from '../Path/Path.svelte';
import type { PathPropsWithoutHTML } from '../Path/Path.shared.svelte.js';
import { type MotionProp } from '../../utils/motion.svelte.js';
import type { CommonStyleProps, Without } from '../../utils/types.js';
import type { ChartState } from '../../states/chart.svelte.js';
import { type ArcTextOptions, type ArcTextPosition, type GetArcTextProps } from '../../utils/arcText.svelte.js';
export type ArcPropsWithoutHTML = {
    value?: number;
    initialValue?: number;
    /** Domain [min,max] in degrees @default [0, 100] */
    domain?: [number, number];
    /** Range [min,max] in degrees. See also startAngle/endAngle @default [0, 360] */
    range?: [number, number];
    /** Start angle in radians */
    startAngle?: number;
    /** End angle in radians */
    endAngle?: number;
    /**
     * Define innerRadius. Defaults to yRange min
     *   • value >= 1: discrete value
     *   • value < 1: percent of `outerRadius`
     *   • value < 0: offset of `outerRadius`
     */
    innerRadius?: number;
    /**
     * Define outerRadius. Defaults to smallest width (xRange) or height (yRange) dimension (/2)
     */
    outerRadius?: number;
    /** @default 0 */
    cornerRadius?: number;
    /** @default 0 */
    padAngle?: number;
    trackStartAngle?: number;
    trackEndAngle?: number;
    trackInnerRadius?: number;
    trackOuterRadius?: number;
    /** @default 0 */
    trackCornerRadius?: number;
    /** @default 0 */
    trackPadAngle?: number;
    /** @default 0 */
    offset?: number;
    /** Setup pointer events to show tooltip for related data. **Must set `data` prop as well** */
    tooltip?: boolean;
    /** Data to set when showing tooltip */
    data?: any;
    /**
     * Pass true to enable the track with default props, or pass an object
     * of props to enable the track.
     */
    track?: boolean | Partial<ComponentProps<typeof Path>>;
    /** A reference to the track element @bindable */
    trackRef?: SVGPathElement;
    /** A reference to the arc element @bindable */
    ref?: SVGPathElement;
    children?: Snippet<[
        {
            centroid: [number, number];
            boundingBox: DOMRect;
            value: number;
            startAngle: number;
            endAngle: number;
            innerRadius: number;
            outerRadius: number;
            getTrackTextProps: GetArcTextProps;
            getArcTextProps: GetArcTextProps;
        }
    ]>;
    motion?: MotionProp;
} & CommonStyleProps;
export type ArcProps = ArcPropsWithoutHTML & Without<SVGAttributes<SVGPathElement>, ArcPropsWithoutHTML & PathPropsWithoutHTML>;
/**
 * Reactive state shared by every per-layer Arc variant. Derives the d3-arc
 * generators (`arc`, `trackArc`), resolved radii/angles, and the centroid
 * used for snippet props.
 */
export declare class ArcState {
    #private;
    ctx: ChartState;
    trackRef: SVGPathElement | undefined;
    constructor(getProps: () => ArcProps);
    get motionEndAngleValue(): any;
    range: [number, number];
    domain: [number, number];
    endAngle: number;
    scale: import("d3-scale").ScaleLinear<number, number, never>;
    chartRadius: number;
    outerRadius: number;
    trackOuterRadius: number;
    innerRadius: number;
    trackInnerRadius: number;
    startAngle: number;
    trackStartAngle: number;
    trackEndAngle: number;
    trackCornerRadius: number;
    trackPadAngle: number;
    arcEndAngle: number;
    arc: import("d3-shape").Arc<any, import("d3-shape").DefaultArcObject>;
    trackArc: import("d3-shape").Arc<any, import("d3-shape").DefaultArcObject>;
    angle: number;
    xOffset: number;
    yOffset: number;
    trackArcCentroid: [number, number];
    boundingBox: DOMRect;
    getTrackTextProps: (position: ArcTextPosition, opts?: ArcTextOptions) => {
        value?: string | number | ((d: any) => string | number);
        segments?: import("../index.js").TextSegment[];
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
        svgProps?: Omit<SVGAttributes<SVGElement>, "children">;
        ref?: SVGTextElement;
        format?: import("@layerstack/utils").FormatType | import("@layerstack/utils").FormatConfig;
        motion?: MotionProp;
        truncate?: boolean | import("../Text/Text.shared.svelte.js").TruncateTextOptions;
        pathId?: string;
        path?: string | null;
        startOffset?: string | number;
        data?: any[];
        key?: (d: any, index: number) => any;
    } & import("../../index.js").DataDrivenStyleProps & Without<SVGAttributes<SVGTextElement>, import("../index.js").TextPropsWithoutHTML>;
    getArcTextProps: (position: ArcTextPosition, opts?: ArcTextOptions) => {
        value?: string | number | ((d: any) => string | number);
        segments?: import("../index.js").TextSegment[];
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
        svgProps?: Omit<SVGAttributes<SVGElement>, "children">;
        ref?: SVGTextElement;
        format?: import("@layerstack/utils").FormatType | import("@layerstack/utils").FormatConfig;
        motion?: MotionProp;
        truncate?: boolean | import("../Text/Text.shared.svelte.js").TruncateTextOptions;
        pathId?: string;
        path?: string | null;
        startOffset?: string | number;
        data?: any[];
        key?: (d: any, index: number) => any;
    } & import("../../index.js").DataDrivenStyleProps & Without<SVGAttributes<SVGTextElement>, import("../index.js").TextPropsWithoutHTML>;
}
