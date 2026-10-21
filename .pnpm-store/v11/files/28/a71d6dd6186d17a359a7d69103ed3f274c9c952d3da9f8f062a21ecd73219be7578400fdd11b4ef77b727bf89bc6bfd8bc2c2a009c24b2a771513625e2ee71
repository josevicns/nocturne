import memoize from 'memoize';
import { cls } from '@layerstack/tailwind';
import { roundedRectPath } from './path.js';
/** @deprecated - use `isTransparentFill` instead */
export const DEFAULT_FILL = 'rgb(0, 0, 0)';
/**
 * Returns true if the fill color is effectively invisible (none, transparent, or alpha=0).
 * Used to skip canvas fill rendering for invisible fills.
 */
function isTransparentFill(fill) {
    if (!fill || fill === 'none' || fill === 'transparent')
        return true;
    // Match rgba(..., 0) - alpha channel is 0 (fully transparent)
    return /rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*0\s*\)/.test(fill);
}
/**
 * Returns true if a style value cannot be assigned directly to a canvas
 * context and must first be resolved through the hidden `<svg>` helper —
 * specifically `var(...)` references and the `currentColor` keyword.
 */
function needsCSSResolution(value) {
    if (typeof value !== 'string')
        return false;
    return value.includes('var(') || value.toLowerCase() === 'currentcolor';
}
const CANVAS_STYLES_ELEMENT_ID = '__layerchart_canvas_styles_id';
/**
 * Parse an inline CSS style string into a StyleOptions object.
 * Converts kebab-case properties to camelCase (e.g., 'stroke-dasharray' -> 'strokeDasharray')
 */
function parseStyleString(styleString) {
    if (!styleString)
        return {};
    const styles = {};
    // Split by semicolons and process each declaration
    const declarations = styleString.split(';').filter((s) => s.trim());
    for (const declaration of declarations) {
        const colonIndex = declaration.indexOf(':');
        if (colonIndex === -1)
            continue;
        const property = declaration.slice(0, colonIndex).trim();
        const value = declaration.slice(colonIndex + 1).trim();
        if (!property || !value)
            continue;
        // Convert kebab-case to camelCase (e.g., 'stroke-dasharray' -> 'strokeDasharray')
        const camelProperty = property.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        styles[camelProperty] = value;
    }
    return styles;
}
const supportedStyles = [
    'fill',
    'fillOpacity',
    'stroke',
    'strokeOpacity',
    'strokeWidth',
    'strokeDasharray',
    'opacity',
    'fontWeight',
    'fontSize',
    'fontFamily',
    'textAnchor',
    'textAlign',
    'paintOrder',
];
/**
 * Appends or reuses `<svg>` element below `<canvas>` to resolve CSS variables and classes (ex. `stroke: var(--color-primary)` => `stroke: rgb(...)` )
 */
export function _getComputedStyles(canvas, { styles, classes } = {}) {
    // Server-side: no DOM available, return styles with sensible defaults
    if (typeof document === 'undefined') {
        const merged = { ...styles };
        if (!merged.fontSize)
            merged.fontSize = '10px';
        if (!merged.fontFamily)
            merged.fontFamily = 'sans-serif';
        return merged;
    }
    // console.count(`getComputedStyles: ${getComputedStylesKey(canvas, { styles, classes })}`);
    try {
        // Get or create `<svg>` below `<canvas>`
        let svg = document.getElementById(CANVAS_STYLES_ELEMENT_ID);
        if (!svg) {
            svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('id', CANVAS_STYLES_ELEMENT_ID);
            svg.style.display = 'none';
            // Add `<svg>` next to `<canvas>` to allow same scope resolution for CSS variables
            canvas.after(svg);
        }
        svg = svg; // guarantee SVG is set
        // Remove any previously set styles or classes.  Not able to do as part of cleanup below as `window.getComputedStyles()` appearing to be lazily read and removing `style` results in incorrect values, and copying result is very slow
        svg.removeAttribute('style');
        svg.removeAttribute('class');
        // Add styles and class to svg element
        if (styles) {
            Object.assign(svg.style, styles);
        }
        // Make sure `<svg>` is not visible
        svg.style.display = 'none';
        if (classes) {
            svg.setAttribute('class', cls(classes)
                .split(' ')
                .filter((s) => !s.startsWith('transition-'))
                .join(' '));
        }
        // Capture copy to enable memoization and avoid capturing all styles (which is very slow)
        const computedStyles = supportedStyles.reduce((acc, style) => {
            acc[style] = window.getComputedStyle(svg)[style];
            return acc;
        }, {});
        return computedStyles;
    }
    catch (e) {
        console.error('Unable to get computed styles', e);
        return {};
    }
}
function getComputedStylesKey(canvas, { styles, classes } = {}) {
    return JSON.stringify({ canvasId: canvas.id, styles, classes });
}
export const getComputedStyles = memoize(_getComputedStyles, {
    cacheKey: ([canvas, styleOptions]) => {
        return getComputedStylesKey(canvas, styleOptions);
    },
});
/** Render onto canvas context.  Supports CSS variables and classes by tranferring to hidden `<svg>` element before retrieval) */
function render(ctx, render, styleOptions = {}, { applyText, } = {}) {
    // console.count('render');
    // Parse inline style string and merge with styles object
    const parsedInlineStyles = parseStyleString(styleOptions.style);
    const mergedStyles = { ...styleOptions.styles, ...parsedInlineStyles };
    // TODO: Consider memoizing?  How about reactiving to CSS variable changes (light/dark mode toggle)
    let resolvedStyles;
    if (typeof document === 'undefined' ||
        (styleOptions.classes == null && !Object.values(mergedStyles).some(needsCSSResolution))) {
        // Skip resolving styles if running on server (no DOM), or no classes are provided and no styles need CSS resolution (`var(...)` / `currentColor`)
        resolvedStyles = mergedStyles;
        // On server, provide sensible defaults for styles that would normally come from CSS
        if (typeof document === 'undefined') {
            if (!resolvedStyles.stroke && !resolvedStyles.fill) {
                resolvedStyles = { ...resolvedStyles, stroke: 'black' };
            }
        }
    }
    else {
        // Remove constant non-css variable properties (ex. `strokeWidth: 0.5`, `fill: #123456`) as not needed and improves memoization cache hit
        const { constantStyles, variableStyles } = Object.entries(mergedStyles).reduce((acc, [key, value]) => {
            if (needsCSSResolution(value)) {
                acc.variableStyles[key] = value;
            }
            else if (typeof value === 'number' || typeof value === 'string') {
                acc.constantStyles[key] = value;
            }
            return acc;
        }, { constantStyles: {}, variableStyles: {} });
        const computedStyles = getComputedStyles(ctx.canvas, {
            styles: variableStyles,
            classes: styleOptions.classes,
        });
        resolvedStyles = { ...computedStyles, ...constantStyles };
    }
    // Adhere to CSS paint order: https://developer.mozilla.org/en-US/docs/Web/CSS/paint-order
    const paintOrder = resolvedStyles?.paintOrder === 'stroke' ? ['stroke', 'fill'] : ['fill', 'stroke'];
    if (resolvedStyles?.opacity) {
        ctx.globalAlpha *= Number(resolvedStyles?.opacity);
    }
    // font/text properties can be expensive to set (not sure why), so only apply if needed (renderText())
    if (applyText) {
        // Text properties — use defaults for server-side rendering where computed styles aren't available
        const fontSize = resolvedStyles.fontSize || '10px';
        const fontFamily = resolvedStyles.fontFamily || 'sans-serif';
        const fontWeight = resolvedStyles.fontWeight || '';
        ctx.font = `${fontWeight} ${fontSize} ${fontFamily}`.trim(); // build string instead of using `computedStyles.font` to fix/workaround `tabular-nums` returning `null`
        if (resolvedStyles.textAnchor === 'middle') {
            ctx.textAlign = 'center';
        }
        else if (resolvedStyles.textAnchor === 'end') {
            ctx.textAlign = 'right';
        }
        else if (resolvedStyles.textAnchor === 'start') {
            ctx.textAlign = 'left';
        }
        else if (resolvedStyles.textAlign) {
            ctx.textAlign = resolvedStyles.textAlign;
        }
        // If textAnchor/textAlign are unset, ctx.textAlign retains its pre-set value (e.g. from Text.svelte)
        // TODO: Handle `textBaseline` / `verticalAnchor` (Text)
        // ctx.textBaseline = 'top';
        // ctx.textBaseline = 'middle';
        // ctx.textBaseline = 'bottom';
        // ctx.textBaseline = 'alphabetic';
        // ctx.textBaseline = 'hanging';
        // ctx.textBaseline = 'ideographic';
    }
    // Dashed lines (supports both comma and space separators, e.g., "2,2" or "2 2")
    if (resolvedStyles.strokeDasharray && resolvedStyles.strokeDasharray !== 'none') {
        const dashArray = resolvedStyles.strokeDasharray
            .split(/[\s,]+/)
            .filter((s) => s.length > 0)
            .map((s) => Number(s.replace('px', '')));
        if (dashArray.length > 0 && dashArray.every((n) => !isNaN(n))) {
            ctx.setLineDash(dashArray);
        }
    }
    for (const attr of paintOrder) {
        if (attr === 'fill') {
            const fill = styleOptions.styles?.fill &&
                ((typeof CanvasGradient !== 'undefined' &&
                    styleOptions.styles?.fill instanceof CanvasGradient) ||
                    (typeof CanvasPattern !== 'undefined' &&
                        styleOptions.styles?.fill instanceof CanvasPattern) ||
                    !needsCSSResolution(styleOptions.styles?.fill))
                ? styleOptions.styles.fill
                : resolvedStyles?.fill;
            if (fill && !isTransparentFill(fill)) {
                const currentGlobalAlpha = ctx.globalAlpha;
                const fillOpacity = Number(resolvedStyles?.fillOpacity);
                ctx.globalAlpha *= isNaN(fillOpacity) ? 1 : fillOpacity;
                ctx.fillStyle = fill;
                render.fill(ctx);
                // Restore in case it was modified by `fillOpacity`
                ctx.globalAlpha = currentGlobalAlpha;
            }
        }
        else if (attr === 'stroke') {
            const stroke = styleOptions.styles?.stroke &&
                ((typeof CanvasGradient !== 'undefined' &&
                    styleOptions.styles?.stroke instanceof CanvasGradient) ||
                    !needsCSSResolution(styleOptions.styles?.stroke))
                ? styleOptions.styles?.stroke
                : resolvedStyles?.stroke;
            if (stroke && !['none'].includes(stroke)) {
                const currentGlobalAlpha = ctx.globalAlpha;
                const strokeOpacity = Number(resolvedStyles?.strokeOpacity);
                const opacity = Number(resolvedStyles?.opacity);
                if (!isNaN(strokeOpacity) && strokeOpacity !== 1) {
                    ctx.globalAlpha *= strokeOpacity;
                }
                ctx.lineWidth =
                    typeof resolvedStyles?.strokeWidth === 'string'
                        ? Number(resolvedStyles?.strokeWidth?.replace('px', ''))
                        : (resolvedStyles?.strokeWidth ?? 1);
                ctx.strokeStyle = stroke;
                render.stroke(ctx);
                // Restore in case it was modified by `strokeOpacity`
                ctx.globalAlpha = currentGlobalAlpha;
            }
        }
    }
}
/** Render SVG path data onto canvas context.  Supports CSS variables and classes by tranferring to hidden `<svg>` element before retrieval) */
export function renderPathData(ctx, pathData, styleOptions = {}) {
    const path = new Path2D(pathData ?? '');
    render(ctx, {
        fill: (ctx) => ctx.fill(path),
        stroke: (ctx) => ctx.stroke(path),
    }, styleOptions);
}
export function renderText(ctx, text, coords, styleOptions = {}) {
    if (text) {
        render(ctx, {
            fill: (ctx) => ctx.fillText(text.toString(), coords.x, coords.y),
            stroke: (ctx) => ctx.strokeText(text.toString(), coords.x, coords.y),
        }, styleOptions, { applyText: true });
    }
}
export function renderRect(ctx, coords, styleOptions = {}) {
    const { x, y, width, height, corners } = coords;
    const rx = coords.rx ?? 0;
    const ry = coords.ry ?? rx; // Default ry to rx if not provided (SVG behavior)
    const perCorner = corners && !corners.every((c) => c === corners[0]);
    // No rounding - use simple rect methods
    if (!perCorner && rx === 0 && ry === 0 && !corners) {
        render(ctx, {
            fill: (ctx) => ctx.fillRect(x, y, width, height),
            stroke: (ctx) => ctx.strokeRect(x, y, width, height),
        }, styleOptions);
        return;
    }
    // Try native roundRect if available (modern browsers)
    if (typeof ctx.roundRect === 'function') {
        ctx.beginPath();
        ctx.roundRect(x, y, width, height, corners ?? [rx, ry]);
        render(ctx, {
            fill: (ctx) => ctx.fill(),
            stroke: (ctx) => ctx.stroke(),
        }, styleOptions);
        ctx.closePath();
        return;
    }
    // Fallback: use path rendering for rounded corners
    if (corners) {
        const pathData = roundedRectPath(x, y, width, height, corners);
        renderPathData(ctx, pathData, styleOptions);
        return;
    }
    // Clamp radii to half the width/height
    const clampedRx = Math.min(rx, width / 2);
    const clampedRy = Math.min(ry, height / 2);
    // Build rounded rect path: start at top-left (after corner), go clockwise
    const pathData = [
        `M${x + clampedRx},${y}`, // Move to top-left (after corner)
        `h${width - 2 * clampedRx}`, // Top edge
        `a${clampedRx},${clampedRy} 0 0 1 ${clampedRx},${clampedRy}`, // Top-right corner
        `v${height - 2 * clampedRy}`, // Right edge
        `a${clampedRx},${clampedRy} 0 0 1 ${-clampedRx},${clampedRy}`, // Bottom-right corner
        `h${2 * clampedRx - width}`, // Bottom edge
        `a${clampedRx},${clampedRy} 0 0 1 ${-clampedRx},${-clampedRy}`, // Bottom-left corner
        `v${2 * clampedRy - height}`, // Left edge
        `a${clampedRx},${clampedRy} 0 0 1 ${clampedRx},${-clampedRy}`, // Top-left corner
        'z', // Close path
    ].join(' ');
    renderPathData(ctx, pathData, styleOptions);
}
export function renderCircle(ctx, coords, styleOptions = {}) {
    ctx.beginPath();
    ctx.arc(coords.cx, coords.cy, coords.r, 0, 2 * Math.PI);
    render(ctx, {
        fill: (ctx) => {
            ctx.fill();
        },
        stroke: (ctx) => {
            ctx.stroke();
        },
    }, styleOptions);
    ctx.closePath();
}
export function renderEllipse(ctx, coords, styleOptions = {}) {
    ctx.beginPath();
    ctx.ellipse(coords.cx, coords.cy, coords.rx, coords.ry, 0, 0, 2 * Math.PI);
    render(ctx, {
        fill: (ctx) => {
            ctx.fill();
        },
        stroke: (ctx) => {
            ctx.stroke();
        },
    }, styleOptions);
    ctx.closePath();
}
/** Clear canvas accounting for Canvas `context.translate(...)` */
export function clearCanvasContext(ctx, options) {
    // Clear with negative offset due to Canvas `context.translate(...)`
    ctx.clearRect(-options.padding.left, -options.padding.top, options.containerWidth, options.containerHeight);
}
/**
    Scales a canvas for high DPI / retina displays.
  @see: https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio#examples
  @see: https://web.dev/articles/canvas-hidipi
*/
export function scaleCanvas(ctx, width, height) {
    const devicePixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    ctx.canvas.width = width * devicePixelRatio;
    ctx.canvas.height = height * devicePixelRatio;
    ctx.canvas.style.width = `${width}px`;
    ctx.canvas.style.height = `${height}px`;
    ctx.scale(devicePixelRatio, devicePixelRatio);
    return { width: ctx.canvas.width, height: ctx.canvas.height };
}
/** Get pixel color (r,g,b,a) at canvas coordinates */
export function getPixelColor(ctx, x, y) {
    const dpr = (typeof window !== 'undefined' ? window.devicePixelRatio : null) ?? 1;
    const imageData = ctx.getImageData(x * dpr, y * dpr, 1, 1);
    const [r, g, b, a] = imageData.data;
    return { r, g, b, a };
}
export function _createLinearGradient(ctx, x0, y0, x1, y1, stops) {
    const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
    for (const { offset, color } of stops) {
        gradient.addColorStop(offset, color);
    }
    return gradient;
}
/** Create linear gradient and memoize result to fix reactivity */
export const createLinearGradient = memoize(_createLinearGradient, {
    cacheKey: (args) => JSON.stringify(args.slice(1)), // Ignore `ctx` argument
});
export function _createPattern(ctx, width, height, shapes, background) {
    const patternCanvas = document.createElement('canvas');
    const patternCtx = patternCanvas.getContext('2d');
    // Add pattern canvas to DOM to allow computed styles to be read (`getComputedStyles()`)
    ctx.canvas.after(patternCanvas);
    // Render the pattern at the device pixel ratio so the bitmap tile is
    // sharp on high-DPI screens. Chrome samples patterns in the canvas's
    // user (post-transform) coordinate space, so 1 source pixel = 1 user px
    // by default — without DPR-scaling the bitmap, a 12 logical-px tile is
    // sampled from 12 source pixels, leaving each device pixel of fill to
    // be interpolated from a 1/dpr-th of a source pixel (blurry). Drawing
    // at DPR resolution and scaling the pattern back down to user space at
    // fill time keeps tiles sharp.
    const dpr = (typeof window !== 'undefined' ? window.devicePixelRatio : 1) || 1;
    patternCanvas.width = Math.max(1, Math.round(width * dpr));
    patternCanvas.height = Math.max(1, Math.round(height * dpr));
    patternCtx.scale(dpr, dpr);
    if (background) {
        patternCtx.fillStyle = background;
        patternCtx.fillRect(0, 0, width, height);
    }
    for (const shape of shapes) {
        patternCtx.save();
        if (shape.type === 'circle') {
            renderCircle(patternCtx, { cx: shape.cx, cy: shape.cy, r: shape.r }, { styles: { fill: shape.fill, opacity: shape.opacity } });
        }
        else if (shape.type === 'line') {
            renderPathData(patternCtx, shape.path, {
                styles: { stroke: shape.stroke, strokeWidth: shape.strokeWidth, opacity: shape.opacity },
            });
        }
        else if (shape.type === 'rect') {
            const rx = typeof shape.rx === 'string' ? toRectCornerPx(shape.rx, shape.width) : shape.rx;
            const ry = typeof shape.ry === 'string' ? toRectCornerPx(shape.ry, shape.height) : (shape.ry ?? rx);
            renderRect(patternCtx, { x: shape.x, y: shape.y, width: shape.width, height: shape.height, rx, ry }, { styles: { fill: shape.fill, opacity: shape.opacity } });
        }
        patternCtx.restore();
    }
    const pattern = ctx.createPattern(patternCanvas, 'repeat');
    // Scale-only matrix; no translate so the pattern anchors to the path's
    // local origin at fill time (matches SVG `patternUnits="userSpaceOnUse"`).
    // Use the *actual* bitmap pixel dimensions for the scale so rounding
    // `width * dpr` to an integer doesn't accumulate drift across tiles.
    if (pattern) {
        const sx = width / patternCanvas.width;
        const sy = height / patternCanvas.height;
        pattern.setTransform(new DOMMatrix([sx, 0, 0, sy, 0, 0]));
    }
    // Cleanup
    ctx.canvas.parentElement?.removeChild(patternCanvas);
    return pattern;
}
/** Create pattern and memoize result to fix reactivity */
export const createPattern = memoize(_createPattern, {
    cacheKey: (args) => JSON.stringify(args.slice(1)), // Ignore `ctx` argument
});
function toRectCornerPx(value, max) {
    if (value.endsWith('%')) {
        const pct = parseFloat(value);
        if (!Number.isFinite(pct))
            return 0;
        return (max / 2) * (pct / 100);
    }
    const n = parseFloat(value);
    return Number.isFinite(n) ? n : 0;
}
