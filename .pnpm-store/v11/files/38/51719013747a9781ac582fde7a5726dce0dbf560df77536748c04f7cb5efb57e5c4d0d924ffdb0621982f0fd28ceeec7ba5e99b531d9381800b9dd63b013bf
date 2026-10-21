import type { GeoProjection } from 'd3-geo';
export type GeoRasterPropsWithoutHTML = {
    /**
     * The image to reproject. Either:
     *
     * - a URL string (loaded via `Image` with `crossOrigin="anonymous"`),
     * - a preloaded `HTMLImageElement`,
     * - an `HTMLCanvasElement` (e.g. a stitched tile mosaic),
     * - or an `ImageBitmap`.
     *
     * The image pixel data must be readable (not tainted by CORS). When passing a
     * URL, the component sets `crossOrigin` on the underlying `Image` — the host
     * must respond with the appropriate `Access-Control-Allow-Origin` header.
     */
    image: string | HTMLImageElement | HTMLCanvasElement | ImageBitmap;
    /**
     * Projection used by the source image. Pass as an uncalled function, e.g.
     * `sourceProjection={geoEquirectangular}`.
     *
     * When omitted, the source is assumed to be an equirectangular (plate carrée)
     * image covering the full globe — i.e. `x = ((lon + 180) / 360) * width`,
     * `y = ((90 - lat) / 180) * height`. This is the common layout for imagery
     * such as NASA Blue Marble / Black Marble.
     */
    sourceProjection?: () => GeoProjection;
    /**
     * Pixel sampling strategy.
     *
     * - `nearest` (default): fastest, slightly blocky at low source resolution.
     * - `bilinear`: smoother, ~4x slower per pixel.
     *
     * @default 'nearest'
     */
    interpolate?: 'nearest' | 'bilinear';
    /**
     * `crossOrigin` attribute applied to the underlying `Image` element when
     * loading from a URL. Set to `null` to disable.
     *
     * @default 'anonymous'
     */
    crossOrigin?: string | null;
    /**
     * Resolution multiplier for the reprojected output, relative to chart CSS
     * pixels. A value greater than 1 produces a sharper image on HiDPI
     * displays at the cost of more work per frame.
     *
     * @default 1
     */
    resolution?: number;
    /**
     * Disable image smoothing when compositing the reprojected buffer onto the
     * destination canvas. Useful for a pixel-art look.
     *
     * @default false
     */
    pixelated?: boolean;
};
export type GeoRasterProps = GeoRasterPropsWithoutHTML;
declare const GeoRaster: import("svelte").Component<GeoRasterPropsWithoutHTML, {}, "">;
type GeoRaster = ReturnType<typeof GeoRaster>;
export default GeoRaster;
