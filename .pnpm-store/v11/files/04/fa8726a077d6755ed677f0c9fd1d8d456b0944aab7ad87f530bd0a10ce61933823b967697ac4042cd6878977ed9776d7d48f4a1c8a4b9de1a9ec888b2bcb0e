import type { CurveFactory, CurveFactoryLineOnly, Line } from 'd3-shape';
import type { Accessor } from '../../utils/common.js';
import type { MotionProp } from '../../utils/motion.svelte.js';
import type { DataProp } from '../../utils/dataProp.js';
import type { TrailCap } from '../../utils/trail.js';
import type { PathProps } from '../Path/Path.shared.svelte.js';
export type TrailPropsWithoutHTML = {
    data?: any;
    x?: Accessor;
    y?: Accessor;
    seriesKey?: string;
    defined?: Parameters<Line<any>['defined']>[0];
    /** Width at each point. @default 4 */
    r?: DataProp;
    curve?: CurveFactory | CurveFactoryLineOnly;
    /** @default 'round' */
    cap?: TrailCap;
    tension?: number;
    resolution?: number;
    fill?: string;
    fillOpacity?: number;
    opacity?: number;
    class?: string;
    motion?: MotionProp;
};
export type TrailProps = TrailPropsWithoutHTML & Omit<PathProps, keyof TrailPropsWithoutHTML | 'r'>;
