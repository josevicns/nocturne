function createIntervalTree() {
    let root = null;
    function insertInto(node, interval) {
        if (!node) {
            return { interval, maxHi: interval[1], left: null, right: null };
        }
        if (interval[0] < node.interval[0]) {
            node.left = insertInto(node.left, interval);
        }
        else {
            node.right = insertInto(node.right, interval);
        }
        if (interval[1] > node.maxHi)
            node.maxHi = interval[1];
        return node;
    }
    function queryNode(node, lo, hi, visit) {
        if (!node || node.maxHi < lo)
            return;
        queryNode(node.left, lo, hi, visit);
        const it = node.interval;
        if (it[0] <= hi && it[1] >= lo)
            visit(it);
        // Once `it[0] > hi` the right subtree (all `lo >= it[0]`) cannot overlap.
        if (it[0] <= hi)
            queryNode(node.right, lo, hi, visit);
    }
    return {
        insert(interval) {
            root = insertInto(root, interval);
        },
        queryInterval(lo, hi, visit) {
            queryNode(root, lo, hi, visit);
        },
    };
}
/**
 * Direction multiplier for an anchor along its dodge axis.
 *
 *  - `'top'` / `'left'`:    `+1` — items grow at increasing chart coord
 *  - `'bottom'` / `'right'`: `-1` — items grow at decreasing chart coord
 *  - `'middle'`:              `0` — items spread symmetrically (algorithm
 *    treats this specially, not multiplied)
 *
 * Combined with `baseline` (the anchor's pixel coordinate), the algorithm
 * maps a packed local position `p` to chart coords via `baseline + dir * p`
 * (or `baseline ± p` for middle).
 */
function anchorDirection(axis, anchor) {
    if (anchor === 'middle')
        return 0;
    if (axis === 'y')
        return anchor === 'top' ? 1 : -1; // bottom
    return anchor === 'right' ? -1 : 1; // left
}
function compareSymmetric(a, b) {
    return Math.abs(a) - Math.abs(b);
}
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
export function dodge(input, opts) {
    if (opts.rectangular) {
        return dodgeRows(input, opts);
    }
    return dodgeCircular(input, opts);
}
/**
 * Map per-item normalized dodge-axis positions (`packed`) back to chart space
 * and package as `DodgeItem`s. Handles the axis swap for `axis='x'` (where
 * `input.x` is the chart-y anchor).
 */
function buildResult(input, packed, axis, dir, baseline) {
    const factor = dir === 0 ? 1 : dir;
    const result = new Array(input.length);
    for (let i = 0; i < input.length; i++) {
        const item = input[i];
        const dodgePos = packed[i] * factor + baseline;
        // `r` carries the anchor-axis half-extent for back-compat with circular
        // callers (`<Circle r={r}>`). In rectangular mode that's `rx` for axis='y'
        // and `ry` for axis='x' — i.e. whichever axis the layout collides on.
        const rAnchor = axis === 'y' ? item.rx : item.ry;
        result[i] =
            axis === 'y'
                ? {
                    data: item.data,
                    x: item.x,
                    y: dodgePos,
                    r: rAnchor,
                    rx: item.rx,
                    ry: item.ry,
                    index: item.index,
                }
                : {
                    data: item.data,
                    x: dodgePos,
                    y: item.x,
                    r: rAnchor,
                    rx: item.rx,
                    ry: item.ry,
                    index: item.index,
                };
    }
    return result;
}
function dodgeCircular(input, opts) {
    const { axis, anchor, padding, baseline } = opts;
    const dir = anchorDirection(axis, anchor);
    const isMiddle = dir === 0;
    // `intervals[0..k]` is a flat array of [lo0, hi0, lo1, hi1, ...] forbidden
    // zones along the dodge axis for the current item. Slot 0/1 is reserved
    // for the natural anchor zone ([0, 0], a no-op zone keeping y=0 in the
    // candidate set). Tangent positions from each colliding placed item add
    // two more candidate y values each. `candidates` is a parallel buffer for
    // the sortable copy — pre-allocated once to avoid per-iteration allocation.
    const cap = 2 * input.length + 2;
    const intervals = new Float64Array(cap);
    const candidates = new Float64Array(cap);
    const packed = new Float64Array(input.length);
    const tree = createIntervalTree();
    for (let i = 0; i < input.length; i++) {
        const item = input[i];
        // Circular mode: `rx === ry` (Dodge.svelte ensures this), so either one
        // is the circular radius. Using `rx` keeps the field reference uniform.
        const ri = item.rx;
        // y0 shifts the natural anchor by ri+padding so the item sits flush
        // against the baseline. middle anchor (dir=0) needs no shift.
        const y0 = isMiddle ? 0 : ri + padding;
        const l = item.x - ri;
        const h = item.x + ri;
        let k = 2;
        tree.queryInterval(l - padding, h + padding, (interval) => {
            const j = interval[2];
            const yj = packed[j] - y0;
            const dx = item.x - input[j].x;
            const dr = ri + input[j].rx + padding;
            const sq = dr * dr - dx * dx;
            if (sq >= 0) {
                const dy = Math.sqrt(sq);
                intervals[k++] = yj - dy;
                intervals[k++] = yj + dy;
            }
        });
        // Sort the candidate y-values in-place into our reusable buffer. Native
        // typed-array sort is materially faster than Array.sort with a JS
        // comparator. For non-middle anchors we want ascending order (default);
        // for middle we want symmetric (closest to 0 first), which still goes
        // through the typed-array sort and avoids the prior allocation.
        const view = candidates.subarray(0, k);
        view.set(intervals.subarray(0, k));
        if (isMiddle) {
            view.sort(compareSymmetric);
        }
        else {
            view.sort();
        }
        let chosen = y0; // fallback: natural anchor when nothing fits
        outer: for (let c = 0; c < k; c++) {
            const y = view[c];
            // For non-middle anchors, items grow only in the +y direction relative
            // to y0 — negative candidates are below the baseline and inadmissible.
            if (!isMiddle && y < 0)
                continue;
            for (let j = 0; j < k; j += 2) {
                if (intervals[j] + 1e-6 < y && y < intervals[j + 1] - 1e-6) {
                    continue outer;
                }
            }
            chosen = y + y0;
            break;
        }
        packed[i] = chosen;
        tree.insert([l, h, i]);
    }
    return buildResult(input, packed, axis, dir, baseline);
}
/**
 * Axis-aligned rectangular packing — same interval-tree query as circular
 * dodge, but we only care which rows/columns are already occupied in the
 * overlap range. Items snap to the lowest free row at fixed increments along
 * the dodge axis.
 *
 * Half-extent semantics:
 *  - For `axis='y'`: `rx` is the anchor-axis (horizontal) collision extent;
 *    `ry` is the dodge-axis (row) half-extent. Row spacing = `2 * ry`.
 *  - For `axis='x'`: `ry` is the anchor-axis (vertical) collision extent;
 *    `rx` is the dodge-axis (column) half-extent. Column spacing = `2 * rx`.
 *
 * The anchor-axis half-extent typically varies per item (e.g. half a label's
 * width); the dodge-axis half-extent should be uniform for sensible
 * row alignment.
 */
function dodgeRows(input, opts) {
    const { axis, anchor, padding, baseline } = opts;
    const dir = anchorDirection(axis, anchor);
    const isVertical = axis === 'y';
    const rows = new Int32Array(input.length);
    const packed = new Float64Array(input.length);
    const tree = createIntervalTree();
    for (let i = 0; i < input.length; i++) {
        const item = input[i];
        const rAnchor = isVertical ? item.rx : item.ry;
        const rDodge = isVertical ? item.ry : item.rx;
        const l = item.x - rAnchor;
        const h = item.x + rAnchor;
        const used = new Set();
        tree.queryInterval(l - padding, h + padding, (interval) => {
            used.add(rows[interval[2]]);
        });
        let row = 0;
        while (used.has(row))
            row++;
        rows[i] = row;
        // Row spacing is `2 * rDodge`; centers fall at half-row offsets.
        if (dir === 0) {
            // middle: alternate above/below (even rows above, odd rows below)
            const sign = row % 2 === 0 ? -1 : 1;
            const step = Math.floor(row / 2) + (row === 0 ? 0 : 1);
            packed[i] = sign * step * 2 * rDodge;
        }
        else {
            // start/end: stack outward from the anchor edge
            packed[i] = row * 2 * rDodge + rDodge;
        }
        tree.insert([l, h, i]);
    }
    return buildResult(input, packed, axis, dir, baseline);
}
