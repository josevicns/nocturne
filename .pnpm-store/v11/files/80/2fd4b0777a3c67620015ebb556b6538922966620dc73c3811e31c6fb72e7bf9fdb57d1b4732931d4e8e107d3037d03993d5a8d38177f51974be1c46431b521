import { sortFunc } from '@layerstack/utils';
/**
 * Greedy label occlusion (à la https://observablehq.com/@d3/occlusion): sort by
 * priority, then keep each item only if its box doesn't overlap an already-kept
 * one — dropping the rest. Returns the kept items (in priority order).
 *
 * Brute-force `O(n·k)` overlap testing, where `k` is the (bounded) number kept —
 * effectively linear for realistic label counts, so no spatial index is needed.
 */
export function occlude(items, bounds, options = {}) {
    const { priority, padding = 0 } = options;
    // Highest priority first; equal priorities keep input order (stable sort).
    const ordered = priority ? [...items].sort(sortFunc(priority, 'desc')) : items;
    const kept = [];
    const keptRects = [];
    for (const item of ordered) {
        const r = bounds(item);
        let occluded = false;
        for (const k of keptRects) {
            if (r.x - padding < k.x + k.width &&
                r.x + r.width + padding > k.x &&
                r.y - padding < k.y + k.height &&
                r.y + r.height + padding > k.y) {
                occluded = true;
                break;
            }
        }
        if (!occluded) {
            kept.push(item);
            keptRects.push(r);
        }
    }
    return kept;
}
