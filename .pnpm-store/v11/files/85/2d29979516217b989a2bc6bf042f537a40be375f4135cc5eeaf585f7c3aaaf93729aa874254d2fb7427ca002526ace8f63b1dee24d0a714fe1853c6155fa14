/** Axis-aligned bounding box in pixel space. */
export type OcclusionRect = {
    x: number;
    y: number;
    width: number;
    height: number;
};
export type OcclusionOptions<T> = {
    /**
     * Priority accessor — higher-priority items are placed first and win ties
     * against overlapping lower-priority items. Defaults to input order.
     */
    priority?: (item: T) => number;
    /** Minimum gap (in pixels) required between kept boxes. */
    padding?: number;
};
/**
 * Greedy label occlusion (à la https://observablehq.com/@d3/occlusion): sort by
 * priority, then keep each item only if its box doesn't overlap an already-kept
 * one — dropping the rest. Returns the kept items (in priority order).
 *
 * Brute-force `O(n·k)` overlap testing, where `k` is the (bounded) number kept —
 * effectively linear for realistic label counts, so no spatial index is needed.
 */
export declare function occlude<T>(items: T[], bounds: (item: T) => OcclusionRect, options?: OcclusionOptions<T>): T[];
