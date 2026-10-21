export type InterpolateMethod = 'none' | 'nearest' | 'barycentric';
/**
 * Interpolate scattered 2D points onto a regular grid.
 *
 * @param points - Array of [x, y, value] triples in grid coordinates
 * @param width - Grid width (columns)
 * @param height - Grid height (rows)
 * @param method - Interpolation method
 * @returns Flat Float64Array of grid values (row-major, length = width * height)
 */
export declare function interpolateGrid(points: [number, number, number][], width: number, height: number, method?: InterpolateMethod): Float64Array;
