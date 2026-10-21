import { quantile, ascending, deviation } from 'd3-array';
/**
 * Compute box plot statistics (five-number summary + outliers) from raw numeric values.
 * Uses the standard Tukey method: outliers are values beyond `k * IQR` from Q1/Q3.
 *
 * @param values - Array of numeric values
 * @param k - IQR multiplier for outlier detection (default: 1.5)
 */
export function computeBoxStats(values, k = 1.5) {
    const sorted = Float64Array.from(values).sort();
    const q1 = quantile(sorted, 0.25);
    const q3 = quantile(sorted, 0.75);
    const median = quantile(sorted, 0.5);
    const iqr = q3 - q1;
    const lowerFence = q1 - k * iqr;
    const upperFence = q3 + k * iqr;
    const outliers = [];
    let min = Infinity;
    let max = -Infinity;
    for (const v of sorted) {
        if (v < lowerFence || v > upperFence) {
            outliers.push(v);
        }
        else {
            if (v < min)
                min = v;
            if (v > max)
                max = v;
        }
    }
    // If no non-outlier values, use q1/q3 as min/max
    if (min === Infinity)
        min = q1;
    if (max === -Infinity)
        max = q3;
    return { min, q1, median, q3, max, outliers };
}
/**
 * Epanechnikov kernel function.
 * Optimal kernel for minimizing mean integrated squared error.
 */
function epanechnikov(bandwidth) {
    return (x) => {
        const u = x / bandwidth;
        return Math.abs(u) <= 1 ? (0.75 * (1 - u * u)) / bandwidth : 0;
    };
}
/**
 * Compute kernel density estimation (KDE) for a set of numeric values.
 * Returns an array of [value, density] pairs suitable for rendering violin plots.
 *
 * @param values - Array of numeric values
 * @param options - KDE configuration
 */
export function kde(values, options = {}) {
    const { kernel = epanechnikov, thresholds: thresholdsProp = 50 } = options;
    const sorted = [...values].sort(ascending);
    if (sorted.length === 0)
        return [];
    const ext = options.extent ?? [sorted[0], sorted[sorted.length - 1]];
    // Silverman's rule of thumb for bandwidth
    const bw = options.bandwidth ?? 1.06 * (deviation(sorted) ?? 1) * Math.pow(sorted.length, -1 / 5);
    const kernelFn = kernel(bw);
    // Generate evaluation thresholds
    let ticks;
    if (Array.isArray(thresholdsProp)) {
        ticks = thresholdsProp;
    }
    else {
        const n = Math.max(2, thresholdsProp);
        const step = (ext[1] - ext[0]) / (n - 1);
        ticks = Array.from({ length: n }, (_, i) => ext[0] + i * step);
    }
    // Compute density at each threshold
    return ticks.map((t) => {
        const density = values.reduce((sum, v) => sum + kernelFn(t - v), 0) / values.length;
        return [t, density];
    });
}
