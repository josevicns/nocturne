import { getChartContext } from '../../contexts/chart.js';
/**
 * Reactive state shared by every per-layer ClipPath variant.
 */
export class ClipPathState {
    #getProps = () => ({});
    chartCtx = getChartContext();
    // Outer rect covering the chart bounds — combined with the clip shape under
    // even-odd fill rule to invert the clip.
    outerRect = $derived(`M0,0 H${this.chartCtx.width} V${this.chartCtx.height} H0 Z`);
    /** Effective path used for canvas + html layers when inverting. */
    effectivePath = $derived.by(() => {
        const props = this.#getProps();
        return props.invert && props.path ? `${this.outerRect} ${props.path}` : props.path;
    });
    constructor(getProps) {
        this.#getProps = getProps;
    }
}
