export class GeoState {
    // Props getter function - set in constructor
    _propsGetter;
    _dimensionsGetter;
    // Props - accessed via getter function for fine-grained reactivity
    props = $derived(this._propsGetter());
    // Context references — used by GeoProjection.svelte (client-side only)
    chartWidth = $state(100);
    chartHeight = $state(100);
    transformState = $state(null);
    transformApply = $state({ rotation: false, scale: true, translate: true });
    // The actual projection instance — derived so it works during SSR
    projection = $derived.by(() => {
        if (!this.props.projection)
            return undefined;
        const _projection = this.props.projection();
        // Apply fitSize if fitGeojson is provided
        if (this.props.fitGeojson && 'fitSize' in _projection) {
            _projection.fitSize(this.fitSizeRange, this.props.fitGeojson);
        }
        // Apply scale
        if ('scale' in _projection) {
            if (this.props.scale) {
                _projection.scale(this.props.scale);
            }
            if (this.transformState?.mode === 'projection' && this.transformApply.scale) {
                _projection.scale(this.transformState.scale);
            }
        }
        // Apply rotate
        if ('rotate' in _projection) {
            if (this.props.rotate) {
                _projection.rotate([
                    this.props.rotate.yaw,
                    this.props.rotate.pitch,
                    this.props.rotate.roll,
                ]);
            }
            if (this.transformState?.mode === 'projection' && this.transformApply.rotation) {
                _projection.rotate([
                    this.transformState.translate.x, // yaw
                    this.transformState.translate.y, // pitch
                ]);
            }
        }
        // Apply translate
        if ('translate' in _projection) {
            if (this.props.translate) {
                _projection.translate(this.props.translate);
            }
            else if (!this.props.fitGeojson) {
                // Default translate to container center when not explicitly set
                // and not already positioned via fitSize/fitGeojson
                _projection.translate([
                    (this._dimensionsGetter?.().width ?? this.chartWidth) / 2,
                    (this._dimensionsGetter?.().height ?? this.chartHeight) / 2,
                ]);
            }
            if (this.transformState?.mode === 'projection' && this.transformApply.translate) {
                _projection.translate([this.transformState.translate.x, this.transformState.translate.y]);
            }
        }
        // Apply center
        if (this.props.center && 'center' in _projection) {
            _projection.center(this.props.center);
        }
        // Apply reflectX
        if (this.props.reflectX) {
            _projection.reflectX(this.props.reflectX);
        }
        // Apply reflectY
        if (this.props.reflectY) {
            _projection.reflectY(this.props.reflectY);
        }
        // Apply clipAngle
        if (this.props.clipAngle && 'clipAngle' in _projection) {
            _projection.clipAngle(this.props.clipAngle);
        }
        // Apply clipExtent (`true` -> clip to chart dimensions, matching `fitSize` range)
        if (this.props.clipExtent && 'clipExtent' in _projection) {
            const clipExtent = this.props.clipExtent === true
                ? [[0, 0], this.fitSizeRange]
                : this.props.clipExtent;
            _projection.clipExtent(clipExtent);
        }
        return _projection;
    });
    constructor(propsGetter, dimensionsGetter) {
        this._propsGetter = propsGetter;
        this._dimensionsGetter = dimensionsGetter;
    }
    // Derived properties — use dimensions getter (from ChartState) when available,
    // falling back to $state values (set by GeoProjection.svelte via $effect)
    fitSizeRange = $derived(this.props.fixedAspectRatio
        ? [100, 100 / this.props.fixedAspectRatio]
        : [
            this._dimensionsGetter?.().width ?? this.chartWidth,
            this._dimensionsGetter?.().height ?? this.chartHeight,
        ]);
}
