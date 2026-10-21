import type { SVGAttributes } from 'svelte/elements';
import type { CommonStyleProps, Without } from '../../utils/types.js';
import type { Accessor } from '../../utils/common.js';
export type DensityPropsWithoutHTML = {
    data?: any[];
    x?: Accessor;
    y?: Accessor;
    weight?: Accessor;
    /** @default 20 */
    bandwidth?: number;
    /** @default 20 */
    thresholds?: number;
} & CommonStyleProps;
export type DensityProps = DensityPropsWithoutHTML & Without<SVGAttributes<SVGGElement>, DensityPropsWithoutHTML>;
