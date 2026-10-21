import { radiansToDegrees } from '../../utils/math.js';
/**
 * Reactive state shared by every per-layer ArcLabel variant. Holds derived
 * geometry (callout path, offset centroid, rotation) and resolved text props.
 */
export class ArcLabelState {
    #getProps = () => ({});
    /**
     * Memoized props — the component's props closure allocates a fresh object
     * (it spreads `rest`), so calling it once per derived meant one allocation
     * per derived per update. Read it once here instead.
     */
    #props = $derived(this.#getProps());
    constructor(getProps) {
        this.#getProps = getProps;
    }
    midAngle = $derived.by(() => {
        const { startAngle, endAngle } = this.#props;
        return startAngle != null && endAngle != null ? (startAngle + endAngle) / 2 : 0;
    });
    offsetCentroid = $derived.by(() => {
        const { centroid, offset = 0, startAngle, endAngle } = this.#props;
        if (!centroid)
            return centroid;
        if (!offset || startAngle == null || endAngle == null)
            return centroid;
        const angle = this.midAngle - Math.PI / 2;
        return [centroid[0] + Math.cos(angle) * offset, centroid[1] + Math.sin(angle) * offset];
    });
    effectiveOuterPadding = $derived.by(() => {
        const props = this.#props;
        const base = props.outerPadding ?? 0;
        if (props.placement === 'outer' || props.placement === 'middle') {
            return base + (props.offset ?? 0);
        }
        return base;
    });
    effectiveInnerPadding = $derived.by(() => {
        const props = this.#props;
        if (props.placement === 'inner' || props.placement === 'middle')
            return props.offset ?? 0;
        return 0;
    });
    effectiveCalloutLineLength = $derived((this.#props.calloutLineLength ?? 16) + (this.#props.offset ?? 0));
    centroidRotation = $derived.by(() => {
        const { startAngle, endAngle, placement } = this.#props;
        if (startAngle == null || endAngle == null)
            return 0;
        let deg = radiansToDegrees(this.midAngle);
        if (placement === 'centroid-radial') {
            deg = deg - 90;
        }
        else if (placement !== 'centroid-rotated') {
            return 0;
        }
        deg = ((deg + 180) % 360) - 180;
        if (deg > 90)
            deg -= 180;
        else if (deg < -90)
            deg += 180;
        return deg;
    });
    calloutGeometry = $derived.by(() => {
        const { placement, startAngle, endAngle, outerRadius, calloutLabelOffset = 12, calloutPadding = 4, } = this.#props;
        if (placement !== 'callout' || startAngle == null || endAngle == null || outerRadius == null) {
            return null;
        }
        const angle = this.midAngle - Math.PI / 2;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const x0 = cos * outerRadius;
        const y0 = sin * outerRadius;
        const bendRadius = outerRadius + this.effectiveCalloutLineLength;
        const x1 = cos * bendRadius;
        const y1 = sin * bendRadius;
        const onRightSide = cos >= 0;
        const x2 = x1 + (onRightSide ? calloutLabelOffset : -calloutLabelOffset);
        const y2 = y1;
        return {
            pathData: `M${x0},${y0}L${x1},${y1}L${x2},${y2}`,
            labelX: x2 + (onRightSide ? calloutPadding : -calloutPadding),
            labelY: y2,
            textAnchor: onRightSide ? 'start' : 'end',
        };
    });
    arcTextProps = $derived.by(() => {
        const props = this.#props;
        const { placement = 'centroid', startOffset, outerPadding, getArcTextProps } = props;
        if (placement === 'centroid') {
            if (this.offsetCentroid) {
                return {
                    x: this.offsetCentroid[0],
                    y: this.offsetCentroid[1],
                    textAnchor: 'middle',
                    verticalAnchor: 'middle',
                };
            }
            return getArcTextProps?.('centroid', { startOffset, outerPadding }) ?? {};
        }
        if (placement === 'centroid-rotated' || placement === 'centroid-radial') {
            if (this.offsetCentroid) {
                return {
                    x: this.offsetCentroid[0],
                    y: this.offsetCentroid[1],
                    textAnchor: 'middle',
                    verticalAnchor: 'middle',
                    rotate: this.centroidRotation,
                };
            }
            return getArcTextProps?.('centroid', { startOffset, outerPadding }) ?? {};
        }
        if (placement === 'callout') {
            const g = this.calloutGeometry;
            if (g) {
                return {
                    x: g.labelX,
                    y: g.labelY,
                    textAnchor: g.textAnchor,
                    verticalAnchor: 'middle',
                };
            }
            return {};
        }
        return (getArcTextProps?.(placement, {
            startOffset,
            outerPadding: this.effectiveOuterPadding,
            innerPadding: this.effectiveInnerPadding,
        }) ?? {});
    });
}
