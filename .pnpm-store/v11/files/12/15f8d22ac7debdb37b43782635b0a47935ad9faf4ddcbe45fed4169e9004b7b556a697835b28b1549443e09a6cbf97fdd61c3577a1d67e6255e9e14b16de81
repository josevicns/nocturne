import type { Placement } from '../components/types.js';
export type PointLabelLayoutOptions = {
    /** The point the label attaches to, in pixels (already projected/scaled). */
    x: number;
    y: number;
    /** Marker radius the label offsets from. @default 4 */
    r?: number;
    /** How to place the label relative to the point. @default 'center' */
    labelPlacement?: Placement | 'smart';
    /**
     * Explicit pixel position for the label, overriding the `labelPlacement` offset.
     * Pair with `labelPlacement="smart"` to auto-orient towards it.
     */
    labelX?: number;
    labelY?: number;
    labelXOffset?: number;
    labelYOffset?: number;
    /** Font size (pixels) — feeds the vertical cap-height bias. @default 16 */
    fontSize?: number;
    /** Spacing between a leader line and the label; only applies with `link`. @default 2 */
    labelGap?: number;
    /** Whether a leader line is drawn (nudges the text by `labelGap`). @default false */
    link?: boolean;
    /** Caller-provided vertical anchor — when set, the cap-height bias is skipped. */
    verticalAnchor?: 'start' | 'middle' | 'end' | 'inherit';
};
export type PointLabelLayout = {
    /** Snapped direction from the point towards the label (−1 | 0 | 1 per axis). */
    direction: {
        x: number;
        y: number;
    };
    /** Where a leader line targets (before the `labelGap` nudge). */
    anchor: {
        x: number;
        y: number;
    };
    /** Resolved `<Text>` placement — pass straight to `<Text>` or `getTextRect`. */
    text: {
        x: number;
        y: number;
        textAnchor: 'start' | 'middle' | 'end';
        verticalAnchor: 'start' | 'middle' | 'end';
    };
};
/**
 * Resolve where a `smart` (or discrete) placement puts a label attached to a point —
 * text position, anchors, and leader direction. Shared by `<AnnotationPoint>` and
 * `<Labels layout="voronoi" links>`, so labels can be measured/occluded with the exact
 * geometry the component renders instead of re-deriving it.
 */
export declare function getPointLabelLayout(options: PointLabelLayoutOptions): PointLabelLayout;
/**
 * Bounding box of a point label, combining {@link getPointLabelLayout} with `getTextRect` —
 * a reliable `bounds` for `occlude()` when hiding overlapping labels.
 */
export declare function getPointLabelRect(label: string, options: PointLabelLayoutOptions): {
    x: number;
    y: number;
    width: number;
    height: number;
};
