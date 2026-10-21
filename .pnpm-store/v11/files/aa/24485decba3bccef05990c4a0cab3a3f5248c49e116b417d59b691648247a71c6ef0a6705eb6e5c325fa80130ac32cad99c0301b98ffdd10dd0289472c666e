export type ChartImageOptions = {
    /**
     * Background fill color for the exported image.
     * Defaults to transparent (PNG) or white (JPEG/WebP).
     */
    background?: string;
    /**
     * Output image format.
     *
     * @default 'png'
     */
    format?: 'png' | 'jpeg' | 'webp';
    /**
     * Quality for lossy formats (`'jpeg'` / `'webp'`), between 0 and 1.
     *
     * @default 0.92
     */
    quality?: number;
    /**
     * Device pixel ratio to use when rasterising the image. Defaults to `1`
     * so the output matches the chart's CSS dimensions (looks the same as
     * what's on the page when viewed 1:1). Set to `window.devicePixelRatio`
     * (or higher) to produce crisper images on retina displays at the cost
     * of larger files.
     */
    pixelRatio?: number;
};
/**
 * Composite all SVG and Canvas layers within a chart container element into
 * an offscreen canvas and return the result as a `Blob`.
 *
 * Layers are drawn in ascending z-index order (DOM order used as tiebreaker).
 * SVG layer styles (CSS variables, class-based colours, etc.) are inlined
 * before serialisation so the image renders correctly outside the DOM.
 */
export declare function getChartImageBlob(container: HTMLElement, options?: ChartImageOptions): Promise<Blob>;
export type ChartSvgOptions = {
    /**
     * File name without extension.
     *
     * @default 'chart'
     */
    filename?: string;
};
/**
 * Return a self-contained SVG string for all SVG layers within a chart container.
 *
 * - Computed styles (CSS variables, class-based colours, etc.) are inlined so
 *   the file renders correctly in editors, browsers, and other tools.
 * - When multiple `<Svg>` layers are present they are composited into a single
 *   `<svg>` in z-index order by merging their `<defs>` and content `<g>` elements.
 * - Returns `null` when the container has no SVG layers (e.g. Canvas-only charts).
 */
export declare function getChartSvgString(container: HTMLElement): string | null;
/**
 * Download the SVG layers of a chart container as a `.svg` file.
 *
 * Canvas layers are not included — use `downloadImage` when the chart uses
 * `<Canvas>` layers or contains a mix of SVG and Canvas.
 *
 * Returns `false` without throwing if the container has no SVG layers.
 *
 * @example
 * ```svelte
 * <script>
 *   import { downloadSvg } from '../index.js';
 *   let chartRef = $state<HTMLElement>();
 * </script>
 *
 * <Chart bind:ref={chartRef} ...>...</Chart>
 * <button onclick={() => downloadSvg(chartRef, { filename: 'my-chart' })}>
 *   Download SVG
 * </button>
 * ```
 */
export declare function downloadSvg(container: HTMLElement, options?: ChartSvgOptions): boolean;
/**
 * Download a chart container as an image file.
 *
 * @example
 * ```svelte
 * <script>
 *   import { downloadImage } from '../index.js';
 *   let chartRef = $state<HTMLElement>();
 * </script>
 *
 * <Chart bind:ref={chartRef} ...>...</Chart>
 * <button onclick={() => downloadImage(chartRef, { filename: 'my-chart' })}>
 *   Download PNG
 * </button>
 * ```
 */
export declare function downloadImage(container: HTMLElement, options?: ChartImageOptions & {
    /**
     * File name without extension.
     *
     * @default 'chart'
     */
    filename?: string;
}): Promise<void>;
