import { fade } from 'svelte/transition';
import { cubicIn } from 'svelte/easing';
import { extractTweenConfig } from '../../utils/motion.svelte.js';
import { isScaleBand } from '../../utils/scales.svelte.js';
import { autoTickVals } from '../../utils/ticks.js';
import { getChartContext } from '../../contexts/chart.js';
/**
 * Reactive state shared by every per-layer Grid variant.
 */
export class GridState {
    #getProps = () => ({});
    /**
     * Memoized props — the component's props closure allocates a fresh object
     * (it spreads `rest`), so calling it once per derived meant one allocation
     * per derived per update. Read it once here instead.
     */
    #props = $derived(this.#getProps());
    ctx = getChartContext();
    constructor(getProps) {
        this.#getProps = getProps;
        // Mark as composite so child Splines (radial grid) don't register
        this.ctx.registerComponent({ name: 'Grid', kind: 'composite-mark' });
    }
    yTicks = $derived(this.#props.yTicks ?? (!isScaleBand(this.ctx.yScale) ? 4 : undefined));
    tweenConfig = $derived(extractTweenConfig(this.#props.motion));
    defaultTransitionIn = $derived((this.#props.transitionIn ?? this.tweenConfig?.options) ? fade : () => ({}));
    defaultTransitionInParams = { easing: cubicIn };
    xTickVals = $derived(autoTickVals(this.ctx.xScale, this.#props.xTicks));
    yTickVals = $derived(autoTickVals(this.ctx.yScale, this.yTicks));
    xBandOffset = $derived.by(() => {
        const bandAlign = this.#props.bandAlign ?? 'center';
        if (!isScaleBand(this.ctx.xScale))
            return 0;
        return bandAlign === 'between'
            ? -(this.ctx.xScale.padding() * this.ctx.xScale.step()) / 2
            : this.ctx.xScale.step() / 2 - (this.ctx.xScale.padding() * this.ctx.xScale.step()) / 2;
    });
    yBandOffset = $derived.by(() => {
        const bandAlign = this.#props.bandAlign ?? 'center';
        if (!isScaleBand(this.ctx.yScale))
            return 0;
        return bandAlign === 'between'
            ? -(this.ctx.yScale.padding() * this.ctx.yScale.step()) / 2
            : this.ctx.yScale.step() / 2 - (this.ctx.yScale.padding() * this.ctx.yScale.step()) / 2;
    });
}
