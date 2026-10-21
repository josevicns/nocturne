export interface BoxStats {
    min: number;
    q1: number;
    median: number;
    q3: number;
    max: number;
    outliers: number[];
}
/**
 * Compute box plot statistics (five-number summary + outliers) from raw numeric values.
 * Uses the standard Tukey method: outliers are values beyond `k * IQR` from Q1/Q3.
 *
 * @param values - Array of numeric values
 * @param k - IQR multiplier for outlier detection (default: 1.5)
 */
export declare function computeBoxStats(values: number[], k?: number): BoxStats;
/**
 * Compute kernel density estimation (KDE) for a set of numeric values.
 * Returns an array of [value, density] pairs suitable for rendering violin plots.
 *
 * @param values - Array of numeric values
 * @param options - KDE configuration
 */
export declare function kde(values: number[], options?: {
    /** KDE bandwidth. Defaults to Silverman's rule of thumb. */
    bandwidth?: number;
    /** Number of evaluation points, or explicit array of thresholds. Default: 50 */
    thresholds?: number | number[];
    /** Kernel function factory. Default: Epanechnikov */
    kernel?: (bandwidth: number) => (x: number) => number;
    /** Domain extent [min, max]. Defaults to data extent. */
    extent?: [number, number];
}): [number, number][];
