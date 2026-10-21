/**
 * Trail path utilities for variable-width lines.
 *
 * Round cap (capsule) approach adapted from Vega's trail mark.
 * Copyright (c) 2015-2023, University of Washington Interactive Data Lab.
 * BSD 3-Clause License: https://github.com/vega/vega/blob/main/LICENSE
 *
 * Butt cap (polygon offset) and curve resampling via fake context
 * adapted from SveltePlot's trail mark.
 * Copyright 2024-2026, Gregor Aisch.
 * ISC License: https://github.com/svelteplot/svelteplot/blob/main/LICENSE
 */
import type { CurveFactory, CurveFactoryLineOnly } from 'd3-shape';
export type TrailPoint = {
    x: number;
    y: number;
    r: number;
};
export type TrailCap = 'round' | 'butt';
export type TrailPathOptions = {
    /** Curve interpolation factory from d3-shape */
    curve?: CurveFactory | CurveFactoryLineOnly;
    /** Cap style for trail endpoints. @default 'round' */
    cap?: TrailCap;
    /** Tension parameter for applicable curve factories (0–1) */
    tension?: number;
    /** Samples per segment for curve interpolation. Auto-estimated when omitted. */
    resolution?: number;
};
/**
 * Computes a filled SVG path for a trail with variable width.
 *
 * Supports optional curve interpolation (via d3-shape curve factories)
 * and two cap styles: 'round' (capsule-based) and 'butt' (polygon offset).
 */
export declare function computeTrailPath(points: TrailPoint[], options?: TrailPathOptions): string;
