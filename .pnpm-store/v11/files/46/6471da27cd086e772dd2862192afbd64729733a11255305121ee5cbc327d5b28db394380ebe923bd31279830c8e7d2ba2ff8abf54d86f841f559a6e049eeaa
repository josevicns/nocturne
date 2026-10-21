/**
 * Build the SVG/canvas shape descriptors for a pattern's lines/circles.
 * Pure function — no reactivity.
 */
export function buildPatternShapes(linesProp, circlesProp, size, width, height, rectsProp) {
    const shapes = [];
    if (linesProp) {
        const lineDefs = Array.isArray(linesProp) ? linesProp : linesProp === true ? [{}] : [linesProp];
        for (const line of lineDefs) {
            const stroke = line.color ?? 'var(--color-surface-content, currentColor)';
            const strokeWidth = line.width ?? 1;
            const opacity = line.opacity ?? 1;
            let rotate = Math.round(line.rotate ?? 0) % 360;
            if (rotate > 180)
                rotate = rotate - 360;
            else if (rotate > 90)
                rotate = rotate - 180;
            else if (rotate < -180)
                rotate = rotate + 360;
            else if (rotate < -90)
                rotate = rotate + 180;
            let path = '';
            if (rotate === 0) {
                path = `
        M 0 0 L ${width} 0
        M 0 ${height} L ${width} ${height}
    `;
            }
            else if (rotate === 90) {
                path = `
        M 0 0 L 0 ${height}
        M ${width} 0 L ${width} ${height}
    `;
            }
            else if (rotate > 0) {
                path = `
          M 0 ${-height} L ${width * 2} ${height}
          M ${-width} ${-height} L ${width} ${height}
          M ${-width} 0 L ${width} ${height * 2}
      `;
            }
            else {
                path = `
          M ${-width} ${height} L ${width} ${-height}
          M ${-width} ${height * 2} L ${width * 2} ${-height}
          M 0 ${height * 2} L ${width * 2} 0
      `;
            }
            shapes.push({ type: 'line', path, stroke, strokeWidth, opacity });
        }
    }
    if (circlesProp) {
        const circleDefs = Array.isArray(circlesProp)
            ? circlesProp
            : circlesProp === true
                ? [{}]
                : [circlesProp];
        for (const circle of circleDefs) {
            const fill = circle.color ?? 'var(--color-surface-content, currentColor)';
            const opacity = circle.opacity ?? 1;
            const r = circle.radius ?? 1;
            if (circle.stagger) {
                shapes.push({ type: 'circle', cx: size / 4, cy: size / 4, r, fill, opacity }, { type: 'circle', cx: (size * 3) / 4, cy: (size * 3) / 4, r, fill, opacity });
            }
            else {
                shapes.push({ type: 'circle', cx: size / 2, cy: size / 2, r, fill, opacity });
            }
        }
    }
    if (rectsProp) {
        const rectDefs = Array.isArray(rectsProp) ? rectsProp : rectsProp === true ? [{}] : [rectsProp];
        for (const rect of rectDefs) {
            const inset = rect.inset ?? 0;
            const fill = rect.color ?? 'var(--color-surface-content, currentColor)';
            const opacity = rect.opacity ?? 1;
            shapes.push({
                type: 'rect',
                x: inset,
                y: inset,
                width: Math.max(0, width - 2 * inset),
                height: Math.max(0, height - 2 * inset),
                rx: rect.rx,
                ry: rect.ry,
                fill,
                opacity,
            });
        }
    }
    return shapes;
}
