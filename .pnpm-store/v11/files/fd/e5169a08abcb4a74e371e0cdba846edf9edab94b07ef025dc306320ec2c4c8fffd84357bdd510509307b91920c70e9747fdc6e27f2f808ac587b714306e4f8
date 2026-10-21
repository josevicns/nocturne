import { Delaunay } from 'd3-delaunay';
import { polygonArea, polygonCentroid } from 'd3-polygon';
import { format as formatValue } from '@layerstack/utils';
import { accessor } from '../../utils/common.js';
import { isScaleBand } from '../../utils/scales.svelte.js';
import { occlude } from '../../utils/occlusion.js';
import { getTextRect } from '../../utils/string.js';
import { getChartContext } from '../../contexts/chart.js';
import { createDimensionGetter } from '../../utils/rect.svelte.js';
import { getPixelValue } from '../Text/Text.shared.svelte.js';
import { getPointLabelLayout, getPointLabelRect } from '../../utils/labelPlacement.js';
/**
 * Reactive state shared by every per-layer Labels variant. Holds the
 * `getTextProps(point, points, i)` helper that computes per-point label
 * positioning + opacity, plus the resolved opacity.
 */
export class LabelsState {
    #getProps = () => ({});
    ctx = getChartContext();
    constructor(getProps) {
        this.#getProps = getProps;
        this.ctx.registerComponent({ name: 'Labels', kind: 'composite-mark' });
    }
    getDimensions = $derived(createDimensionGetter(this.ctx, () => ({
        x: this.#getProps().x,
        y: this.#getProps().y,
    })));
    series = $derived.by(() => {
        const seriesKey = this.#getProps().seriesKey;
        return seriesKey ? this.ctx.series.series.find((s) => s.key === seriesKey) : undefined;
    });
    derivedOpacity = $derived.by(() => {
        const opacity = this.#getProps().opacity;
        return (opacity ??
            (this.series?.key == null ||
                this.ctx.series.visibleSeries.length <= 1 ||
                this.ctx.series.isHighlighted(this.series.key, true)
                ? 1
                : 0.1));
    });
    getTextProps(point, points, i) {
        const props = this.#getProps();
        const placement = props.placement ?? 'outside';
        const offset = props.offset ?? (placement === 'center' || placement === 'middle' ? 0 : 4);
        const pointValue = isScaleBand(this.ctx.yScale) ? point.xValue : point.yValue;
        const isLowEdge = point.edgeIndex != null ? point.edgeIndex === 0 : pointValue < 0;
        const fillValue = typeof props.fill === 'function' ? accessor(props.fill)(point.data) : props.fill;
        const displayValue = props.value
            ? accessor(props.value)(point.data)
            : isScaleBand(this.ctx.yScale)
                ? point.xValue
                : point.yValue;
        const formattedValue = formatValue(displayValue, 
        // @ts-expect-error - improve types
        props.format ??
            (props.value
                ? undefined
                : isScaleBand(this.ctx.yScale)
                    ? this.ctx.xScale.tickFormat?.()
                    : this.ctx.yScale.tickFormat?.()));
        let result;
        if (isScaleBand(this.ctx.yScale)) {
            if (placement === 'center') {
                const dims = this.getDimensions(point.data) ?? {
                    x: point.x,
                    y: point.y,
                    width: 0,
                    height: 0,
                };
                result = {
                    value: formattedValue,
                    fill: fillValue,
                    x: dims.x + dims.width / 2,
                    y: dims.y + dims.height / 2,
                    textAnchor: 'middle',
                    verticalAnchor: 'middle',
                    capHeight: '.6rem',
                };
            }
            else if (isLowEdge) {
                result = {
                    value: formattedValue,
                    fill: fillValue,
                    x: point.x + (placement === 'outside' ? -offset : offset),
                    y: point.y,
                    textAnchor: placement === 'middle' ? 'middle' : placement === 'outside' ? 'end' : 'start',
                    verticalAnchor: 'middle',
                    capHeight: '.6rem',
                };
            }
            else {
                result = {
                    value: formattedValue,
                    fill: fillValue,
                    x: point.x + (placement === 'outside' ? offset : -offset),
                    y: point.y,
                    textAnchor: placement === 'middle' ? 'middle' : placement === 'outside' ? 'start' : 'end',
                    verticalAnchor: 'middle',
                    capHeight: '.6rem',
                };
            }
        }
        else {
            if (placement === 'center') {
                const dims = this.getDimensions(point.data) ?? {
                    x: point.x,
                    y: point.y,
                    width: 0,
                    height: 0,
                };
                result = {
                    value: formattedValue,
                    fill: fillValue,
                    x: dims.x + dims.width / 2,
                    y: dims.y + dims.height / 2,
                    capHeight: '.6rem',
                    textAnchor: 'middle',
                    verticalAnchor: 'middle',
                };
            }
            else if (isLowEdge) {
                result = {
                    value: formattedValue,
                    fill: fillValue,
                    x: point.x,
                    y: point.y + (placement === 'outside' ? offset : -offset),
                    capHeight: '.6rem',
                    textAnchor: 'middle',
                    verticalAnchor: placement === 'middle' ? 'middle' : placement === 'outside' ? 'start' : 'end',
                };
            }
            else {
                result = {
                    value: formattedValue,
                    fill: fillValue,
                    x: point.x,
                    y: point.y + (placement === 'outside' ? -offset : offset),
                    capHeight: '.6rem',
                    textAnchor: 'middle',
                    verticalAnchor: placement === 'middle' ? 'middle' : placement === 'outside' ? 'end' : 'start',
                };
            }
        }
        if (placement === 'smart' && points != null && i != null) {
            const getValue = (p) => (isScaleBand(this.ctx.yScale) ? p.xValue : p.yValue);
            const curr = getValue(point);
            const prev = i > 0 ? getValue(points[i - 1]) : curr;
            const next = i < points.length - 1 ? getValue(points[i + 1]) : curr;
            const xPrevTight = Math.abs(prev - curr) < offset;
            const xNextTight = Math.abs(curr - next) < offset;
            const isPeak = (prev <= curr && curr >= next) || (xPrevTight && xNextTight);
            const isTrough = (prev >= curr && curr <= next) || (xPrevTight && xNextTight);
            const isRising = !isPeak && !isTrough && prev < curr;
            const isFalling = !isPeak && !isTrough && prev >= curr;
            // Place the label edge `offset` past the point marker, so a dot of radius `r` is cleared by
            // exactly `offset` on whichever side the label sits (`textAnchor`/`verticalAnchor` positions
            // the label edge at `point ± markOffset`).
            const markOffset = (point.r ?? 0) + offset;
            return {
                ...result,
                x: point.x,
                y: point.y,
                dx: isRising
                    ? xPrevTight
                        ? markOffset
                        : -markOffset
                    : isFalling
                        ? xNextTight
                            ? -markOffset
                            : markOffset
                        : 0,
                dy: isPeak ? -markOffset : isTrough ? markOffset : 0,
                textAnchor: isRising
                    ? xPrevTight
                        ? 'start'
                        : 'end'
                    : isFalling
                        ? xNextTight
                            ? 'end'
                            : 'start'
                        : 'middle',
                verticalAnchor: isPeak ? 'end' : isTrough ? 'start' : 'middle',
            };
        }
        return result;
    }
    /**
     * `layout="voronoi"`: orient each label towards the open space of its Voronoi cell.
     * With `links`, move the label out to the cell centroid and draw a leader back to the
     * point (using AnnotationPoint's `smart` geometry). When `occlude` is set, drop labels
     * that would overlap a roomier-cell label. Returns per-point `{ textProps, link, visible }`,
     * index-aligned to `points`.
     */
    getVoronoiLabels(points) {
        const props = this.#getProps();
        const offset = props.offset ?? 4;
        const fontSize = getPixelValue(props.fontSize ?? 12);
        const links = props.links != null && props.links !== false;
        // Don't fling labels across the chart when a cell's centroid is distant (sparse regions)
        const maxMove = this.ctx.width * 0.2;
        // Four candidate orientations (towards the cell centroid / open space)
        const orient = [
            { textAnchor: 'start', dx: offset, dy: 0 },
            { textAnchor: 'middle', dx: 0, dy: offset + fontSize / 2 },
            { textAnchor: 'end', dx: -offset, dy: 0 },
            { textAnchor: 'middle', dx: 0, dy: -(offset + fontSize / 2) },
        ];
        const voronoi = Delaunay.from(points, (p) => p.x, (p) => p.y).voronoi([0, 0, this.ctx.width, this.ctx.height]);
        const candidates = points.map((point, i) => {
            const polygon = voronoi.cellPolygon(i);
            const centroid = polygon ? polygonCentroid(polygon) : [point.x, point.y];
            const area = polygon ? Math.abs(polygonArea(polygon)) : 0;
            const displayValue = props.value
                ? accessor(props.value)(point.data)
                : isScaleBand(this.ctx.yScale)
                    ? point.xValue
                    : point.yValue;
            const text = String(formatValue(displayValue, props.format));
            const fill = typeof props.fill === 'function' ? accessor(props.fill)(point.data) : props.fill;
            if (links) {
                // Move the label into the cell's open space (unless the centroid is too far)
                const dist = Math.hypot(centroid[0] - point.x, centroid[1] - point.y);
                const move = polygon != null && dist > 1e-6 && dist <= maxMove;
                const opts = {
                    x: point.x,
                    y: point.y,
                    labelPlacement: 'smart',
                    labelX: move ? centroid[0] : point.x,
                    labelY: move ? centroid[1] : point.y,
                    fontSize,
                    link: move,
                };
                const layout = getPointLabelLayout(opts);
                return {
                    point,
                    i,
                    area,
                    textProps: {
                        value: text,
                        fill,
                        x: layout.text.x,
                        y: layout.text.y,
                        textAnchor: layout.text.textAnchor,
                        verticalAnchor: layout.text.verticalAnchor,
                    },
                    box: getPointLabelRect(text, opts),
                    link: (move
                        ? { x1: point.x, y1: point.y, x2: layout.anchor.x, y2: layout.anchor.y }
                        : null),
                };
            }
            // Orient the label near the point, towards the open space (no leader)
            const angle = (Math.round((Math.atan2(centroid[1] - point.y, centroid[0] - point.x) / Math.PI) * 2) + 4) %
                4;
            const o = orient[angle];
            return {
                point,
                i,
                area,
                textProps: {
                    value: text,
                    fill,
                    x: point.x,
                    y: point.y,
                    dx: o.dx,
                    dy: o.dy,
                    textAnchor: o.textAnchor,
                    verticalAnchor: 'middle',
                },
                box: getTextRect(text, point.x, point.y, {
                    dx: o.dx,
                    dy: o.dy,
                    textAnchor: o.textAnchor,
                    fontSize,
                }),
                link: null,
            };
        });
        const occludeOn = props.occlude != null && props.occlude !== false;
        const padding = typeof props.occlude === 'object' ? (props.occlude.padding ?? 2) : 2;
        const visible = occludeOn
            ? new Set(occlude(candidates, (c) => c.box, { priority: (c) => c.area, padding }).map((c) => c.i))
            : null;
        return candidates.map((c) => ({
            textProps: c.textProps,
            link: c.link,
            visible: visible == null || visible.has(c.i),
        }));
    }
}
