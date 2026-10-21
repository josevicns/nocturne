/**
 * SVG-only variants of layer-agnostic components.
 *
 * Each export here is a SVG-specific implementation that skips the runtime
 * layer-detection branches in the agnostic version (e.g. `Circle.svelte`).
 * Use these when you know your chart only renders to SVG and want a smaller
 * bundle.
 *
 * The agnostic versions (e.g. `import { Circle } from './index.js'`) still
 * work and dispatch to these per-layer variants under the hood.
 */
// `Layer` is an alias for the layer wrapper of this sub-path. Importing
// `Layer` from `layerchart/svg` is equivalent to importing `Svg`.
export { default as Svg, default as Layer } from './components/layers/Svg.svelte';
export { default as Chart } from './components/Chart/Chart.svg.svelte';
export { default as ChartCore } from './components/Chart/ChartCore.svelte';
export { default as ChartChildren } from './components/ChartChildren/ChartChildren.svg.svelte';
export { default as Circle } from './components/Circle/Circle.svg.svelte';
export { default as Text } from './components/Text/Text.svg.svelte';
export { default as Rect } from './components/Rect/Rect.svg.svelte';
export { default as Line } from './components/Line/Line.svg.svelte';
export { default as Path } from './components/Path/Path.svg.svelte';
export { default as ClipPath } from './components/ClipPath/ClipPath.svg.svelte';
export { default as RadialGradient } from './components/RadialGradient/RadialGradient.svg.svelte';
export { default as LinearGradient } from './components/LinearGradient/LinearGradient.svg.svelte';
export { default as Group } from './components/Group/Group.svg.svelte';
export { default as Pattern } from './components/Pattern/Pattern.svg.svelte';
export { default as Ellipse } from './components/Ellipse/Ellipse.svg.svelte';
export { default as Polygon } from './components/Polygon/Polygon.svg.svelte';
export { default as Image } from './components/Image/Image.svg.svelte';
export { default as Axis } from './components/Axis/Axis.svg.svelte';
export { default as Rule } from './components/Rule/Rule.svg.svelte';
export { default as Grid } from './components/Grid/Grid.svg.svelte';
export { default as Highlight } from './components/Highlight/Highlight.svg.svelte';
export { default as Arc } from './components/Arc/Arc.svg.svelte';
export { default as Spline } from './components/Spline/Spline.svg.svelte';
export { default as Area } from './components/Area/Area.svg.svelte';
export { default as Pie } from './components/Pie/Pie.svg.svelte';
export { default as ArcLabel } from './components/ArcLabel/ArcLabel.svg.svelte';
export { default as Bar } from './components/Bar/Bar.svg.svelte';
export { default as Bars } from './components/Bars/Bars.svg.svelte';
export { default as Points } from './components/Points/Points.svg.svelte';
export { default as Labels } from './components/Labels/Labels.svg.svelte';
export { default as Frame } from './components/Frame/Frame.svg.svelte';
export { default as Cell } from './components/Cell/Cell.svg.svelte';
export { default as Threshold } from './components/Threshold/Threshold.svg.svelte';
export { default as AnnotationLine } from './components/AnnotationLine/AnnotationLine.svg.svelte';
export { default as AnnotationPoint } from './components/AnnotationPoint/AnnotationPoint.svg.svelte';
export { default as Trail } from './components/Trail/Trail.svg.svelte';
export { default as Vector } from './components/Vector/Vector.svg.svelte';
export { default as Link } from './components/Link/Link.svg.svelte';
export { default as AnnotationRange } from './components/AnnotationRange/AnnotationRange.svg.svelte';
export { default as Hull } from './components/Hull/Hull.svg.svelte';
export { default as Density } from './components/Density/Density.svg.svelte';
export { default as Calendar } from './components/Calendar/Calendar.svg.svelte';
export { default as CircleClipPath } from './components/CircleClipPath/CircleClipPath.svg.svelte';
export { default as Voronoi } from './components/Voronoi/Voronoi.svg.svelte';
export { default as Contour } from './components/Contour/Contour.svg.svelte';
export { default as Month } from './components/Month/Month.svg.svelte';
export { default as Raster } from './components/Raster/Raster.svg.svelte';
export { default as Violin } from './components/Violin/Violin.svg.svelte';
export { default as BoxPlot } from './components/BoxPlot/BoxPlot.svg.svelte';
// Geo components
export { default as GeoPath } from './components/geo/GeoPath/GeoPath.svg.svelte';
export { default as GeoSpline } from './components/geo/GeoSpline/GeoSpline.svg.svelte';
export { default as GeoPoint } from './components/geo/GeoPoint/GeoPoint.svg.svelte';
export { default as GeoCircle } from './components/geo/GeoCircle/GeoCircle.svg.svelte';
export { default as GeoClipPath } from './components/geo/GeoClipPath/GeoClipPath.svg.svelte';
export { default as GeoEdgeFade } from './components/geo/GeoEdgeFade/GeoEdgeFade.svg.svelte';
export { default as GeoTile } from './components/geo/GeoTile/GeoTile.svg.svelte';
export { default as TileImage } from './components/geo/TileImage/TileImage.svg.svelte';
export { default as Graticule } from './components/geo/Graticule/Graticule.svg.svelte';
// Ribbon (graph) — uses Path
export { default as Ribbon } from './components/graph/Ribbon/Ribbon.svg.svelte';
// --- Layer-agnostic re-exports ---
// These components don't render layer-specific elements (pure logic, layout
// helpers, context providers, or composite chart wrappers). Re-exported here
// so the per-layer sub-path has a complete API.
// Helpers / context providers
export { default as Blur } from './components/Blur/Blur.svelte';
export * from './components/Blur/Blur.svelte';
export { default as Bounds } from './components/Bounds.svelte';
export * from './components/Bounds.svelte';
export { default as BrushContext } from './components/BrushContext.svelte';
export * from './components/BrushContext.svelte';
export { default as CircleLegend } from './components/CircleLegend.svelte';
export * from './components/CircleLegend.svelte';
export { default as ColorRamp } from './components/ColorRamp.svelte';
export * from './components/ColorRamp.svelte';
export { default as Legend } from './components/Legend.svelte';
export * from './components/Legend.svelte';
export { default as MotionPath } from './components/MotionPath.svelte';
export * from './components/MotionPath.svelte';
export { default as Point } from './components/Point.svelte';
export * from './components/Point.svelte';
export { default as TransformContext } from './components/TransformContext.svelte';
export * from './components/TransformContext.svelte';
export * as Tooltip from './components/tooltip/index.js';
export * from './components/tooltip/TooltipContext.svelte';
// High-level chart wrappers
export { default as LineChart } from './components/charts/LineChart/LineChart.svg.svelte';
export { default as AreaChart } from './components/charts/AreaChart/AreaChart.svg.svelte';
export { default as BarChart } from './components/charts/BarChart/BarChart.svg.svelte';
export { default as PieChart } from './components/charts/PieChart/PieChart.svg.svelte';
export { default as ScatterChart } from './components/charts/ScatterChart/ScatterChart.svg.svelte';
export { default as ArcChart } from './components/charts/ArcChart/ArcChart.svg.svelte';
// Layout components
export { default as Tree } from './components/hierarchy/Tree.svelte';
export * from './components/hierarchy/Tree.svelte';
export { default as Treemap } from './components/hierarchy/Treemap.svelte';
export * from './components/hierarchy/Treemap.svelte';
export { default as Pack } from './components/hierarchy/Pack.svelte';
export * from './components/hierarchy/Pack.svelte';
export { default as Partition } from './components/hierarchy/Partition.svelte';
export * from './components/hierarchy/Partition.svelte';
export { default as Chord } from './components/graph/Chord.svelte';
export * from './components/graph/Chord.svelte';
export { default as Dagre } from './components/graph/Dagre.svelte';
export * from './components/graph/Dagre.svelte';
export { default as Sankey } from './components/graph/Sankey.svelte';
export * from './components/graph/Sankey.svelte';
export { default as ForceSimulation } from './components/force/ForceSimulation.svelte';
export * from './components/force/ForceSimulation.svelte';
export { default as Dodge } from './components/Dodge/Dodge.svelte';
export * from './components/Dodge/Dodge.svelte';
export { default as Waffle } from './components/Waffle/Waffle.svelte';
export * from './components/Waffle/Waffle.svelte';
// Geo helpers (no per-layer rendering)
export { default as GeoLegend } from './components/geo/GeoLegend/GeoLegend.svelte';
export { default as GeoProjection } from './components/geo/GeoProjection/GeoProjection.svelte';
export { default as GeoRaster } from './components/geo/GeoRaster/GeoRaster.svelte';
export { default as GeoVisible } from './components/geo/GeoVisible/GeoVisible.svelte';
export { default as RectClipPath } from './components/RectClipPath/RectClipPath.svg.svelte';
export { default as ChartClipPath } from './components/ChartClipPath/ChartClipPath.svg.svelte';
