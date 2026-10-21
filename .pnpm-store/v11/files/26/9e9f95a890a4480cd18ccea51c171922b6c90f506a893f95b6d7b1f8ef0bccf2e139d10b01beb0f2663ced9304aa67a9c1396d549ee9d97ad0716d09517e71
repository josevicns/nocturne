import type { Without } from '../utils/types.js';
import type { SVGAttributes } from 'svelte/elements';
export type MonthPathPropsWithoutHTML = {
    /**
     * The date to use for the month path.
     */
    date: Date;
    /**
     * Size of cell.
     * - `number` - sets width/height as same.
     * - array - sets [width, height].
     */
    cellSize: number | [number, number];
    /**
     * The start date of the calendar (used to calculate week offsets).
     */
    startOfRange: Date;
    /**
     * A bindable reference to the underlying `<path>` element.
     *
     * @bindable
     */
    pathRef?: SVGPathElement;
};
export type MonthPathProps = MonthPathPropsWithoutHTML & Without<SVGAttributes<SVGPathElement>, MonthPathPropsWithoutHTML & PathPropsWithoutHTML>;
import { type PathPropsWithoutHTML } from './Path/Path.svelte';
declare const MonthPath: import("svelte").Component<MonthPathProps, {}, "pathRef">;
type MonthPath = ReturnType<typeof MonthPath>;
export default MonthPath;
