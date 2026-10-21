import { interpolatePath } from 'd3-interpolate-path';
import { flattenPathData } from '../../utils/path.js';
import { createMotion, extractTweenConfig, } from '../../utils/motion.svelte.js';
import { getChartContext } from '../../contexts/chart.js';
/** Resolve `pathData` whether it was passed as a value or a getter function. */
function resolvePathData(v) {
    return typeof v === 'function' ? v() : v;
}
/**
 * Reactive state shared by every per-layer Path variant.
 */
export class PathState {
    // Hot-path getter: reads only `pathData` (or invokes the function-getter form).
    // Kept separate from the full-props getter so that the `<path d=...>` template
    // updater does not subscribe to every Path prop on every read — critical for
    // mark-heavy scenes (force-simulation graphs with hundreds of links updating
    // per tick) where pre-fix each tween read re-evaluated all 15+ props.
    #getPathData;
    // Contexts
    chartCtx = getChartContext();
    // Path data tween source — the actual `d` attribute / canvas render input
    #tweenedState;
    get tweenedPathData() {
        return this.#tweenedState.current;
    }
    // Re-key trigger for draw transitions
    drawKey = $state(Symbol());
    /**
     * @param getPathData  Hot-path getter — reads only `pathData`. Kept separate from
     *                     `getProps` so the `<path d=...>` updater (and the canvas
     *                     `tweenedPathData` consumer) does not subscribe to every
     *                     Path prop on every tick.
     * @param getProps     Full-props getter — used for one-time / cold-path config
     *                     (motion, draw).
     */
    constructor(getPathData, getProps = () => ({})) {
        this.#getPathData = () => resolvePathData(getPathData());
        const initial = getProps();
        const extractedTween = extractTweenConfig(initial.motion);
        const tweenedOptions = extractedTween
            ? {
                type: extractedTween.type,
                options: { interpolate: interpolatePath, ...extractedTween.options },
            }
            : undefined;
        // Provide initial `0` baseline; only set on initial mount
        const defaultPathData = (() => {
            if (!tweenedOptions) {
                // Fast initial render when not tweened
                return '';
            }
            const resolved = resolvePathData(getPathData());
            if (resolved) {
                return flattenPathData(resolved, Math.min(this.chartCtx.yScale(0) ?? this.chartCtx.yRange[0], this.chartCtx.yRange[0]));
            }
            return '';
        })();
        this.#tweenedState = createMotion(defaultPathData, this.#getPathData, tweenedOptions);
        // Re-trigger draw transition when path data changes
        $effect(() => {
            if (!getProps().draw)
                return;
            // Touch dependency (resolves getter form too)
            void this.#getPathData();
            this.drawKey = Symbol();
        });
    }
}
