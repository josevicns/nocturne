import type { TooltipMode } from '../components/tooltip/TooltipContext.svelte';
import type { SeriesData } from '../components/charts/types.js';
export type TooltipSeries = {
    key: string;
    label: string;
    value: any;
    color?: string;
    visible: boolean;
    config: SeriesData<any, any>;
};
export declare class TooltipState<T = any> {
    x: number;
    y: number;
    data: T | null;
    series: TooltipSeries[];
    isHoveringTooltipArea: boolean;
    isHoveringTooltipContent: boolean;
    mode: TooltipMode;
    show: (e: PointerEvent | MouseEvent | TouchEvent, tooltipData?: any) => void;
    hide: (e?: PointerEvent) => void;
    constructor(mode: TooltipMode, show: (e: PointerEvent | MouseEvent | TouchEvent, tooltipData?: any) => void, hide: (e?: PointerEvent) => void);
}
