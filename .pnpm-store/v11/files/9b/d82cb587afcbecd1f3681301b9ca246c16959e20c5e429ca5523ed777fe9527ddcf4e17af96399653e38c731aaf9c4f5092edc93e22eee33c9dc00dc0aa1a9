/**
 * Data generation utilities for benchmarks.
 */
import type { GeoPermissibleObjects } from 'd3-geo';
export type TimeSeriesPoint = {
    date: Date;
    value: number;
};
export type MultiSeriesPoint = Record<string, Date | number>;
/**
 * Generate time series data with the given number of points.
 */
export declare function generateTimeSeriesData(count: number): TimeSeriesPoint[];
/**
 * Generate wide-format multi-series data (one row per date, multiple value columns).
 */
export declare function generateMultiSeriesData(count: number, seriesKeys: string[]): MultiSeriesPoint[];
/**
 * Generate separate data arrays for each series (long format).
 */
export declare function generateSeparateSeriesData(count: number, seriesKeys: string[]): Record<string, TimeSeriesPoint[]>;
/**
 * Generate a GeoJSON FeatureCollection with `count` polygon features.
 * `verticesPerFeature` controls polygon boundary complexity.
 */
export declare function generateGeoFeatures(count: number, verticesPerFeature?: number): {
    features: GeoPermissibleObjects[];
    collection: GeoPermissibleObjects;
};
