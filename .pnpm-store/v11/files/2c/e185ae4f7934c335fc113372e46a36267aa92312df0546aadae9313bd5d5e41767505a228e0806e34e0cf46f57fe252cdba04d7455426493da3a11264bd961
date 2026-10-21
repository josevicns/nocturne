import { type TimeInterval } from 'd3-time';
import { Duration, type FormatType, type FormatConfig } from '@layerstack/utils';
import { type AnyScale } from './scales.svelte.js';
import type { AxisProps } from '../components/Axis/Axis.svelte';
export declare function getDurationFormat(duration: Duration, options?: {
    multiline?: boolean;
    placement?: AxisProps['placement'];
}): (date: Date, i: number) => string;
export type TicksConfig = number | any[] | ((scale: AnyScale) => any[] | undefined) | {
    interval: TimeInterval | null;
} | null;
export declare function autoTickVals(scale: AnyScale, ticks?: TicksConfig, count?: number): any[];
/**
 * Keep only ticks that sit exactly on the boundary implied by the format type, so a day-formatted
 * axis doesn't repeat the same label on sub-day ticks.
 *
 * `utc` must match the scale: a `scaleUtc()` produces UTC-midnight ticks, which *local* intervals
 * never floor to (outside UTC itself) — filtering those with local intervals drops every tick.
 */
export declare function filterTicksByFormat<T>(tickVals: T[], formatType: FormatType | FormatConfig | undefined, options?: {
    utc?: boolean;
}): T[];
export declare function autoTickFormat(options: {
    scale: AnyScale;
    ticks?: TicksConfig;
    count?: number;
    formatType?: FormatType | FormatConfig;
    multiline?: boolean;
    placement?: AxisProps['placement'];
}): (date: Date, i: number) => string;
