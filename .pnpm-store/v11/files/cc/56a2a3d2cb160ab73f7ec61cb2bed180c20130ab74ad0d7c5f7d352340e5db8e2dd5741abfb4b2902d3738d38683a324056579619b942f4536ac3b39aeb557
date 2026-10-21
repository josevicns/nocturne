import type { GeoProjection, GeoPermissibleObjects } from 'd3-geo';
import type { TransformState } from './transform.svelte.js';
export type GeoStateProps = {
    /**
     * A d3 projection function. Pass this in as an uncalled function, e.g.
     * `projection={geoAlbersUsa}`.
     */
    projection?: () => GeoProjection;
    fitGeojson?: GeoPermissibleObjects;
    /**
     * By default, the map fills to fit the $width and $height. If instead you want a
     * fixed-aspect ratio, like for a server-side rendered map, set that here.
     */
    fixedAspectRatio?: number;
    clipAngle?: number;
    /**
     * Clip rendered geometry to a pixel rectangle. Pass `[[x0, y0], [x1, y1]]`, or `true`
     * to clip to the chart dimensions (`[[0, 0], [width, height]]`) — e.g. to trim the
     * `Sphere` overflow under `geoMercator`.
     */
    clipExtent?: [[number, number], [number, number]] | boolean;
    rotate?: {
        /** Lambda (Center Meridian) */
        yaw: number;
        /** Phi */
        pitch: number;
        /** Gamma */
        roll: number;
    };
    scale?: number;
    translate?: [number, number];
    center?: [number, number];
    reflectX?: boolean;
    reflectY?: boolean;
};
export declare class GeoState {
    private _propsGetter;
    private _dimensionsGetter?;
    props: GeoStateProps;
    chartWidth: number;
    chartHeight: number;
    transformState: TransformState | null;
    transformApply: {
        rotation: boolean;
        scale: boolean;
        translate: boolean;
    };
    projection: GeoProjection | undefined;
    constructor(propsGetter: () => GeoStateProps, dimensionsGetter?: () => {
        width: number;
        height: number;
    });
    fitSizeRange: [number, number];
}
