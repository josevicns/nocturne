import { getTextRect } from './string.js';
/**
 * Resolve where a `smart` (or discrete) placement puts a label attached to a point —
 * text position, anchors, and leader direction. Shared by `<AnnotationPoint>` and
 * `<Labels layout="voronoi" links>`, so labels can be measured/occluded with the exact
 * geometry the component renders instead of re-deriving it.
 */
export function getPointLabelLayout(options) {
    const { x: px, y: py, r = 4, labelPlacement = 'center', labelX, labelY, labelXOffset = 0, labelYOffset = 0, fontSize = 16, labelGap = 2, link = false, verticalAnchor, } = options;
    const explicit = labelX != null || labelY != null;
    const capHeight = fontSize * 0.71;
    // Direction from the point towards the label. `smart` derives it from the
    // geometry (snapped to the 8 cardinal/diagonal directions); otherwise it
    // comes from the discrete placement.
    let dirX = 0;
    let dirY = 0;
    if (labelPlacement === 'smart') {
        const ddx = (labelX ?? px) - px;
        const ddy = (labelY ?? py) - py;
        const ax = Math.abs(ddx);
        const ay = Math.abs(ddy);
        if (ax > 1e-6 || ay > 1e-6) {
            dirX = ax >= ay * 0.4 ? Math.sign(ddx) : 0;
            dirY = ay >= ax * 0.4 ? Math.sign(ddy) : 0;
        }
    }
    else if (labelPlacement !== 'center') {
        dirX = labelPlacement.includes('left') ? -1 : labelPlacement.includes('right') ? 1 : 0;
        dirY = labelPlacement.includes('top') ? -1 : labelPlacement.includes('bottom') ? 1 : 0;
    }
    const mag = Math.hypot(dirX, dirY) || 1;
    const signX = dirX < 0 ? -1 : 1;
    const signY = dirY < 0 ? -1 : 1;
    // The leader connects the ring to this anchor — either an explicit
    // `labelX`/`labelY`, or offset from the point in the direction.
    const anchorX = explicit ? (labelX ?? px) : px + (r * dirX) / mag + labelXOffset * signX;
    const anchorY = explicit ? (labelY ?? py) : py + (r * dirY) / mag + labelYOffset * signY;
    // When there's a leader line, nudge the text away from the point (along the
    // line) by `labelGap` to leave spacing — the line itself is unchanged.
    const gap = link ? labelGap : 0;
    const adx = anchorX - px;
    const ady = anchorY - py;
    const adist = Math.hypot(adx, ady) || 1;
    const gapX = (gap * adx) / adist;
    const gapY = (gap * ady) / adist;
    // Bias by half the cap height so the near edge (not the center) sits at the
    // (gap-adjusted) anchor — keeps top/bottom symmetric for any fontSize. Skip it
    // when the caller sets an explicit `verticalAnchor` (they control it).
    const capBias = verticalAnchor != null ? 0 : dirY > 0 ? capHeight / 2 : dirY < 0 ? -capHeight / 2 : 0;
    return {
        direction: { x: dirX, y: dirY },
        anchor: { x: anchorX, y: anchorY },
        text: {
            x: anchorX + gapX,
            y: anchorY + gapY + capBias,
            textAnchor: dirX > 0 ? 'start' : dirX < 0 ? 'end' : 'middle',
            verticalAnchor: 'middle',
        },
    };
}
/**
 * Bounding box of a point label, combining {@link getPointLabelLayout} with `getTextRect` —
 * a reliable `bounds` for `occlude()` when hiding overlapping labels.
 */
export function getPointLabelRect(label, options) {
    const { text } = getPointLabelLayout(options);
    return getTextRect(label, text.x, text.y, {
        textAnchor: text.textAnchor,
        verticalAnchor: text.verticalAnchor,
        fontSize: options.fontSize ?? 16,
    });
}
