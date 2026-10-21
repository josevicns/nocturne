import { arc as d3arc } from 'd3-shape';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { createMotion } from '../../utils/motion.svelte.js';
import { degreesToRadians } from '../../utils/math.js';
import { getChartContext } from '../../contexts/chart.js';
import { createArcTextProps, } from '../../utils/arcText.svelte.js';
function getOuterRadius(outerRadius, chartRadius) {
    if (!outerRadius)
        return chartRadius;
    if (outerRadius > 1)
        return outerRadius;
    if (outerRadius > 0)
        return chartRadius * outerRadius;
    if (outerRadius < 0)
        return chartRadius + outerRadius;
    return outerRadius;
}
/**
 * Reactive state shared by every per-layer Arc variant. Derives the d3-arc
 * generators (`arc`, `trackArc`), resolved radii/angles, and the centroid
 * used for snippet props.
 */
export class ArcState {
    #getProps = () => ({});
    /**
     * Memoized props — the component's props closure allocates a fresh object
     * (it spreads `rest`), so calling it once per derived meant one allocation
     * per derived per update. Read it once here instead.
     */
    #props = $derived(this.#getProps());
    ctx = getChartContext();
    trackRef = $state();
    #motionEndAngle;
    constructor(getProps) {
        this.#getProps = getProps;
        const initial = getProps();
        this.#motionEndAngle = createMotion(initial.initialValue ?? 0, () => this.#props.value ?? 0, initial.motion);
    }
    get motionEndAngleValue() {
        return this.#motionEndAngle.current;
    }
    range = $derived(this.#props.range ?? [0, 360]);
    domain = $derived(this.#props.domain ?? [0, 100]);
    endAngle = $derived.by(() => {
        const props = this.#props;
        return (props.endAngle ??
            degreesToRadians((this.ctx.config.xRange ? max(this.ctx.config.xRange) : max(this.range))));
    });
    scale = $derived(scaleLinear().domain(this.domain).range(this.range));
    chartRadius = $derived((Math.min(this.ctx.width, this.ctx.height) ?? 0) / 2);
    outerRadius = $derived(getOuterRadius(this.#props.outerRadius, this.chartRadius));
    trackOuterRadius = $derived.by(() => {
        const trackOuterRadiusProp = this.#props.trackOuterRadius;
        return trackOuterRadiusProp
            ? getOuterRadius(trackOuterRadiusProp, this.chartRadius)
            : this.outerRadius;
    });
    #getInnerRadius(innerRadius, outerRadius) {
        if (innerRadius == null)
            return Math.min(...this.ctx.yRange);
        if (innerRadius > 1)
            return innerRadius;
        if (innerRadius > 0)
            return outerRadius * innerRadius;
        if (innerRadius < 0)
            return outerRadius + innerRadius;
        return innerRadius;
    }
    innerRadius = $derived(this.#getInnerRadius(this.#props.innerRadius, this.outerRadius));
    trackInnerRadius = $derived.by(() => {
        const trackInnerRadiusProp = this.#props.trackInnerRadius;
        return trackInnerRadiusProp
            ? this.#getInnerRadius(trackInnerRadiusProp, this.trackOuterRadius)
            : this.innerRadius;
    });
    startAngle = $derived(this.#props.startAngle ?? degreesToRadians(this.range[0]));
    trackStartAngle = $derived(this.#props.trackStartAngle ?? this.#props.startAngle ?? degreesToRadians(this.range[0]));
    trackEndAngle = $derived(this.#props.trackEndAngle ?? this.#props.endAngle ?? degreesToRadians(this.range[1]));
    trackCornerRadius = $derived(this.#props.trackCornerRadius ?? this.#props.cornerRadius ?? 0);
    trackPadAngle = $derived(this.#props.trackPadAngle ?? this.#props.padAngle ?? 0);
    arcEndAngle = $derived(this.#props.endAngle ?? degreesToRadians(this.scale(this.motionEndAngleValue)));
    arc = $derived.by(() => {
        const props = this.#props;
        return d3arc()
            .innerRadius(this.innerRadius)
            .outerRadius(this.outerRadius)
            .startAngle(this.startAngle)
            .endAngle(this.arcEndAngle)
            .cornerRadius(props.cornerRadius ?? 0)
            .padAngle(props.padAngle ?? 0);
    });
    trackArc = $derived(d3arc()
        .innerRadius(this.trackInnerRadius)
        .outerRadius(this.trackOuterRadius)
        .startAngle(this.trackStartAngle)
        .endAngle(this.trackEndAngle)
        .cornerRadius(this.trackCornerRadius)
        .padAngle(this.trackPadAngle));
    angle = $derived(((this.startAngle ?? 0) + (this.endAngle ?? 0)) / 2);
    xOffset = $derived(Math.sin(this.angle) * (this.#props.offset ?? 0));
    yOffset = $derived(-Math.cos(this.angle) * (this.#props.offset ?? 0));
    trackArcCentroid = $derived.by(() => {
        // @ts-expect-error - this is fine.
        const centroid = this.trackArc.centroid();
        return [centroid[0] + this.xOffset, centroid[1] + this.yOffset];
    });
    boundingBox = $derived(this.trackRef ? this.trackRef.getBBox() : {});
    getTrackTextProps = (position, opts = {}) => {
        return createArcTextProps({
            startAngle: () => this.trackStartAngle,
            endAngle: () => this.trackEndAngle,
            outerRadius: () => this.trackOuterRadius + (opts.outerPadding ?? 0),
            innerRadius: () => this.trackInnerRadius - (opts.innerPadding ?? 0),
            cornerRadius: () => this.trackCornerRadius,
            centroid: () => this.trackArcCentroid,
        }, opts, position).current;
    };
    getArcTextProps = (position, opts = {}) => {
        return createArcTextProps({
            startAngle: () => this.startAngle,
            endAngle: () => this.arcEndAngle,
            outerRadius: () => this.outerRadius + (opts.outerPadding ?? 0),
            innerRadius: () => this.innerRadius - (opts.innerPadding ?? 0),
            cornerRadius: () => this.#props.cornerRadius ?? 0,
            centroid: () => this.trackArcCentroid,
        }, opts, position).current;
    };
}
