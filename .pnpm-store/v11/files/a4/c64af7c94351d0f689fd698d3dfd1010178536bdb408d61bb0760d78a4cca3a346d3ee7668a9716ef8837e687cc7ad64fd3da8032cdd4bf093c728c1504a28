/**
 * Convert easing into path data with number of points
 * see: https://svelte.dev/examples#easing
 */
export declare function getEasingPath(easing: (t: number) => number, count?: number): string;
/** Create circle using path data.  Useful for labels.  See also d3-shape's arc */
export declare function circlePath(dimensions: {
    cx: number;
    cy: number;
    r: number;
    sweep?: 'inside' | 'outside';
}): string;
/**
 * @deprecated Use `vectorSpikePath` or the `Vector` component with `shape="spike"` instead.
 * Create spike (triangle) using path data
 */
export declare function spikePath({ x, y, width, height, }: {
    x: number;
    y: number;
    width: number;
    height: number;
}): string;
/** Create rounded polygon path
 *
 * @param coords - Array of points (x, y)
 * @param radius - Radius of the curve
 * @returns String of path data
 */
export declare function roundedPolygonPath(coords: {
    x: number;
    y: number;
}[], radius: number): string;
/**
 * SVG path `d` attribute for a rectangle with per-corner rounding.
 * Corners are ordered `[top-left, top-right, bottom-right, bottom-left]`
 * (matching CSS `border-radius` shorthand). Path is drawn clockwise from
 * the top-left corner.
 */
export declare function roundedRectPath(x: number, y: number, width: number, height: number, [tl, tr, br, bl]: [number, number, number, number]): string;
/**
 * Normalize a dash-array value (CSS `stroke-dasharray`) to a numeric array.
 * Accepts `"4 2"`, `"4,2"`, `[4, 2]`, or a single number (e.g. `4` → `[4, 4]`).
 * Returns `null` when the input is empty or all zeros (i.e. solid stroke).
 */
export declare function parseDashArray(value: string | number | number[] | undefined): number[] | null;
/**
 * Build a CSS `repeating-linear-gradient` string approximating a `stroke-dasharray`
 * pattern along a horizontal line (use with `background` on a rotated `<div>`).
 * Alternates stops between `color` (dash) and `transparent` (gap) to match SVG.
 */
export declare function dashArrayToGradient(dashArray: number[], color: string, direction?: string): string;
/** Vector anchor position */
export type VectorAnchor = 'start' | 'middle' | 'end';
/**
 * Create arrow vector path data (pointing up by default).
 * The path is centered on the anchor point at origin — use SVG `transform` to position and rotate.
 *
 * The arrow consists of a stem line with a V-shaped arrowhead at the tip.
 */
export declare function vectorArrowPath({ length, anchor, width, }: {
    length: number;
    anchor?: VectorAnchor;
    /** Total width of the arrowhead (wing tip to wing tip). */
    width?: number;
}): string;
/**
 * Create spike (filled triangle) vector path data (pointing up by default).
 * The path is centered on the anchor point at origin — use SVG `transform` to position and rotate.
 */
export declare function vectorSpikePath({ length, anchor, width, }: {
    length: number;
    anchor?: VectorAnchor;
    width?: number;
}): string;
/**
 * Create filled arrow vector path data (pointing up by default).
 * The path is centered on the anchor point at origin — use SVG `transform` to position and rotate.
 *
 * The shape has a tapered tail that widens into a triangular arrowhead at the tip.
 */
export declare function vectorArrowFilledPath({ length, anchor, width, }: {
    length: number;
    anchor?: VectorAnchor;
    /** Total width of the arrowhead. Defaults to 30% of length. */
    width?: number;
}): string;
/**
 * Apply rotation (degrees) and translation to a path string containing only M and L commands
 * with absolute coordinates. Converts local vector path data to absolute positioned coordinates.
 */
export declare function transformVectorPath(pathData: string, cx: number, cy: number, rotateDeg: number): string;
/** Flatten all `y` coordinates to `0` */
export declare function flattenPathData(pathData: string, yOverride?: number): string;
