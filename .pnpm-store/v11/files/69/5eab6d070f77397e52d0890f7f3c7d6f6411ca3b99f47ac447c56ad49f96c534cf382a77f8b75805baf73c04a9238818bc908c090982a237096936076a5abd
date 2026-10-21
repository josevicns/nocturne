import type { ClassValue } from 'svelte/elements';
import type { PatternShape } from '../components/Pattern/Pattern.svelte';
/** @deprecated - use `isTransparentFill` instead */
export declare const DEFAULT_FILL = "rgb(0, 0, 0)";
type StyleOptions = Partial<Omit<CSSStyleDeclaration, 'fillOpacity' | 'strokeOpacity' | 'strokeWidth' | 'opacity'> & {
    fillOpacity?: number | string;
    strokeOpacity?: number | string;
    strokeWidth?: number | string;
    opacity?: number | string;
}>;
export type ComputedStylesOptions = {
    styles?: StyleOptions;
    classes?: ClassValue | null;
    /** Inline style string (e.g., 'stroke-dasharray: 6 4') - will be parsed and merged with styles */
    style?: string | null;
};
/**
 * Appends or reuses `<svg>` element below `<canvas>` to resolve CSS variables and classes (ex. `stroke: var(--color-primary)` => `stroke: rgb(...)` )
 */
export declare function _getComputedStyles(canvas: HTMLCanvasElement, { styles, classes }?: ComputedStylesOptions): CSSStyleDeclaration;
export declare const getComputedStyles: typeof _getComputedStyles;
/** Render SVG path data onto canvas context.  Supports CSS variables and classes by tranferring to hidden `<svg>` element before retrieval) */
export declare function renderPathData(ctx: CanvasRenderingContext2D, pathData: string | null | undefined, styleOptions?: ComputedStylesOptions): void;
export declare function renderText(ctx: CanvasRenderingContext2D, text: string | number | null | undefined, coords: {
    x: number;
    y: number;
}, styleOptions?: ComputedStylesOptions): void;
export declare function renderRect(ctx: CanvasRenderingContext2D, coords: {
    x: number;
    y: number;
    width: number;
    height: number;
    rx?: number;
    ry?: number;
    /** Per-corner radii [tl, tr, br, bl]. Takes precedence over `rx`/`ry`. */
    corners?: [number, number, number, number];
}, styleOptions?: ComputedStylesOptions): void;
export declare function renderCircle(ctx: CanvasRenderingContext2D, coords: {
    cx: number;
    cy: number;
    r: number;
}, styleOptions?: ComputedStylesOptions): void;
export declare function renderEllipse(ctx: CanvasRenderingContext2D, coords: {
    cx: number;
    cy: number;
    rx: number;
    ry: number;
}, styleOptions?: ComputedStylesOptions): void;
/** Clear canvas accounting for Canvas `context.translate(...)` */
export declare function clearCanvasContext(ctx: CanvasRenderingContext2D, options: {
    containerWidth: number;
    containerHeight: number;
    padding: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
}): void;
/**
    Scales a canvas for high DPI / retina displays.
  @see: https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio#examples
  @see: https://web.dev/articles/canvas-hidipi
*/
export declare function scaleCanvas(ctx: CanvasRenderingContext2D, width: number, height: number): {
    width: number;
    height: number;
};
/** Get pixel color (r,g,b,a) at canvas coordinates */
export declare function getPixelColor(ctx: CanvasRenderingContext2D, x: number, y: number): {
    r: number;
    g: number;
    b: number;
    a: number;
};
export declare function _createLinearGradient(ctx: CanvasRenderingContext2D, x0: number, y0: number, x1: number, y1: number, stops: {
    offset: number;
    color: string;
}[]): CanvasGradient;
/** Create linear gradient and memoize result to fix reactivity */
export declare const createLinearGradient: typeof _createLinearGradient;
export declare function _createPattern(ctx: CanvasRenderingContext2D, width: number, height: number, shapes: PatternShape[], background?: string): CanvasPattern | null;
/** Create pattern and memoize result to fix reactivity */
export declare const createPattern: typeof _createPattern;
export {};
