import type { Snippet } from 'svelte';
export type DodgeAnchor = 'top' | 'middle' | 'bottom' | 'left' | 'right';
export type DodgeItem<T> = {
    data: T;
    /** Pixel position along the x-axis. */
    x: number;
    /** Pixel position along the y-axis. */
    y: number;
    /** Resolved circular radius (circular mode) or anchor-axis half-extent (rectangular mode). */
    r: number;
    /** Resolved x-axis half-extent. Equal to `r` in circular mode. */
    rx: number;
    /** Resolved y-axis half-extent. Equal to `r` in circular mode. */
    ry: number;
    /** Original index of the datum in the input `data` array. */
    index: number;
};
export type DodgePropsWithoutHTML<T = any> = {
    /** Data to dodge. Falls back to chart context data when omitted. */
    data?: T[];
    /**
     * Axis to dodge along (the axis whose value is computed; the other axis is the anchor).
     * @default 'y'
     */
    axis?: 'x' | 'y';
    /**
     * Anchor edge along the dodge axis.
     *   - `axis='y'`: `'top'` (stack down), `'middle'` (stack from center), `'bottom'` (stack up). Default `'bottom'`.
     *   - `axis='x'`: `'left'` (stack right), `'middle'`, `'right'`. Default `'left'`.
     */
    anchor?: DodgeAnchor;
    /**
     * Minimum padding between items in pixels.
     * @default 1
     */
    padding?: number;
    /**
     * Circular collision radius (or accessor). Used unless both `rx` and `ry`
     * are provided.
     *
     * Resolution priority:
     * 1. This prop, if set.
     * 2. The chart's `r` accessor (via `rScale`/`rRange`), if configured.
     * 3. Default of `5`.
     */
    r?: number | ((d: T) => number);
    /**
     * X-axis half-extent (or accessor). When set together with `ry`, switches
     * to axis-aligned **rectangular** packing instead of circular collision.
     *
     * For `axis='y'` (vertical dodge), `rx` controls the horizontal collision
     * extent (typically the per-item value, e.g. half the label width). For
     * `axis='x'` (horizontal dodge), `rx` becomes the dodge-axis (column)
     * half-extent and is typically a constant.
     */
    rx?: number | ((d: T) => number);
    /**
     * Y-axis half-extent (or accessor). When set together with `rx`, switches
     * to axis-aligned **rectangular** packing instead of circular collision.
     *
     * For `axis='y'` (vertical dodge), `ry` becomes the dodge-axis (row)
     * half-extent and is typically a constant. For `axis='x'`, `ry` controls
     * the vertical collision extent.
     */
    ry?: number | ((d: T) => number);
    /**
     * Override the anchor-axis pixel accessor.
     * For `axis='y'`, this is x; for `axis='x'`, this is y.
     * Defaults to the chart context's `xGet`/`yGet` (which applies the chart's
     * scale to the chart's `x`/`y` accessor).
     */
    position?: (d: T) => number;
    /**
     * Pixel coordinate (along the dodge axis) of the line items grow away from:
     * the centerline for `anchor='middle'`, the edge for the others.
     *
     * Default depends on `axis` + `anchor`:
     * - `axis='y'`: `0` (top), `ctx.height / 2` (middle), `ctx.height` (bottom)
     * - `axis='x'`: `0` (left), `ctx.width / 2` (middle), `ctx.width` (right)
     *
     * Pass a custom value to dodge within a sub-region — e.g. a band scale's
     * `bandLeft + bandwidth/2` for per-band beeswarms, or a horizontal
     * baseline pixel for split top/bottom timeline labels. Output positions
     * are in chart coordinates (no snippet translation needed).
     */
    baseline?: number;
    /** Snippet receives computed positions in original data order. */
    children?: Snippet<[{
        items: DodgeItem<T>[];
    }]>;
};
export type DodgeProps<T = any> = DodgePropsWithoutHTML<T>;
type DodgeInput<T> = {
    /** Anchor-axis pixel position (always — the algorithm packs the other axis). */
    x: number;
    /** X-axis half-extent. */
    rx: number;
    /** Y-axis half-extent. */
    ry: number;
    data: T;
    index: number;
};
type DodgeOpts = {
    axis: 'x' | 'y';
    anchor: DodgeAnchor;
    padding: number;
    /** Pixel coordinate (along the dodge axis) of the line items grow away from. */
    baseline: number;
    /**
     * When `true`, switch from circular to axis-aligned rectangular packing.
     * Inputs' `rx` / `ry` are then treated as independent half-extents per axis
     * (the dodge-axis half-extent should be uniform for sensible row alignment).
     */
    rectangular?: boolean;
};
/**
 * Pack items along one axis so they don't overlap, given their positions on
 * the other axis. Modeled after Observable Plot's `dodge` transform — uses an
 * interval tree to find candidate positions in `O(log n + k)` per item.
 *
 * `input.x` is always the anchor-axis position regardless of `axis`. The
 * algorithm packs along the dodge axis and the wrapper swaps `x`/`y` in the
 * result for `axis='x'`.
 *
 * Set `opts.rectangular` to true to switch from circular to axis-aligned
 * rectangular packing — useful for text labels where the bounding box is much
 * wider than tall (so a circular `r` would produce excessive vertical gaps).
 *
 * @see https://observablehq.com/plot/transforms/dodge
 */
export declare function dodge<T>(input: DodgeInput<T>[], opts: DodgeOpts): DodgeItem<T>[];
export {};
