import type { InterpolateMethod } from './rasterInterpolate.js';
export type RasterBounds = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};
export declare function resolveRasterBounds(width: number, height: number, x1?: number, y1?: number, x2?: number, y2?: number): RasterBounds;
export declare function gridPointToBounds(x: number, y: number, width: number, height: number, bounds: RasterBounds): {
    x: number;
    y: number;
};
export declare function gridCellCenterToBounds(column: number, row: number, width: number, height: number, bounds: RasterBounds): {
    x: number;
    y: number;
};
export declare function sampleGridAtBounds(values: ArrayLike<number>, width: number, height: number, bounds: RasterBounds, x: number, y: number, method?: InterpolateMethod): number;
export declare function blurGridIgnoringNaN(values: ArrayLike<number>, width: number, height: number, radius: number): Float64Array<ArrayBufferLike>;
