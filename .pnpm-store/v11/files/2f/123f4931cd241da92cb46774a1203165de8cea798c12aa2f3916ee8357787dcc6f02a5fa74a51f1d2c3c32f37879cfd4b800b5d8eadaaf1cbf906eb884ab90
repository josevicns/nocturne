import type { Snippet } from 'svelte';
import type { SVGAttributes } from 'svelte/elements';
import type { Without } from '../../utils/types.js';
export type PatternLineDef = {
    /** The width of the line @default 1 */
    width?: string;
    /** The rotation of the line @default 0 */
    rotate?: number;
    /** The color of the line @default 'var(--color-surface-content)' */
    color?: string;
    /** The opacity of the line @default 1 */
    opacity?: number;
};
export type PatternCircleDef = {
    /** The radius of the circle @default 1 */
    radius?: number;
    /** Stagger the circle layout @default false */
    stagger?: boolean;
    /** The color of the circle @default 'var(--color-surface-content)' */
    color?: string;
    /** The opacity of the circle @default 1 */
    opacity?: number;
};
export type PatternRectDef = {
    /**
     * Inset from each edge of the pattern tile, in pixels. Useful for cell
     * grids — set to half the desired gap between cells.
     * @default 0
     */
    inset?: number;
    /** Horizontal corner radius, or `"100%"` for a full ellipse / circle. */
    rx?: number | string;
    /** Vertical corner radius. Defaults to `rx` if not provided. */
    ry?: number | string;
    /** Fill color @default 'var(--color-surface-content)' */
    color?: string;
    /** Opacity @default 1 */
    opacity?: number;
};
export type PatternPropsWithoutHTML = {
    /** The id of the pattern */
    id?: string;
    /** The size of the pattern (sets `width` and `height` as same value). */
    size?: number;
    /** The width of the pattern for custom patterns (set by `lines`, etc) */
    width?: number;
    /** The height of the pattern for custom patterns (set by `lines`, etc) */
    height?: number;
    /** The number of lines to render */
    lines?: boolean | PatternLineDef | PatternLineDef[];
    /** The number of circles to render */
    circles?: boolean | PatternCircleDef | PatternCircleDef[];
    /** Rect(s) to render in each pattern tile */
    rects?: boolean | PatternRectDef | PatternRectDef[];
    /** The background color of the pattern */
    background?: string;
    /** Render as a child of the pattern. Note: only supported on the `<Svg>` layer. */
    patternContent?: Snippet;
    children?: Snippet<[{
        id: string;
        pattern: string;
    }]>;
};
export type PatternProps = PatternPropsWithoutHTML & Without<SVGAttributes<SVGPatternElement>, PatternPropsWithoutHTML>;
export type CircleShape = {
    type: 'circle';
    cx: number;
    cy: number;
    r: number;
    fill: string;
    opacity: number;
};
export type LineShape = {
    type: 'line';
    path: string;
    stroke: string;
    strokeWidth: string | number;
    opacity: number;
};
export type RectShape = {
    type: 'rect';
    x: number;
    y: number;
    width: number;
    height: number;
    rx?: number | string;
    ry?: number | string;
    fill: string;
    opacity: number;
};
export type PatternShape = CircleShape | LineShape | RectShape;
/**
 * Build the SVG/canvas shape descriptors for a pattern's lines/circles.
 * Pure function — no reactivity.
 */
export declare function buildPatternShapes(linesProp: PatternPropsWithoutHTML['lines'], circlesProp: PatternPropsWithoutHTML['circles'], size: number, width: number, height: number, rectsProp?: PatternPropsWithoutHTML['rects']): PatternShape[];
