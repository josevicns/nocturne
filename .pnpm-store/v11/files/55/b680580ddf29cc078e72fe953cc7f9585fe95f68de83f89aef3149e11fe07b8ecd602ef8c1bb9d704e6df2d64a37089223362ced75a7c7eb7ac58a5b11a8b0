import type { Component } from 'svelte';
import type { AnnotationPointProps } from './AnnotationPoint.shared.svelte.js';
export type AnnotationPointBaseLayerComponents = {
    Circle: Component<any>;
    /**
     * Used for callout link rendering. Optional because the HTML layer
     * doesn't have a `Link` variant; HTML annotation points without callouts
     * still render correctly.
     */
    Link?: Component<any>;
    Text: Component<any>;
};
export type AnnotationPointBaseProps = AnnotationPointProps & AnnotationPointBaseLayerComponents;
declare const AnnotationPoint: Component<AnnotationPointBaseProps, {}, "">;
type AnnotationPoint = ReturnType<typeof AnnotationPoint>;
export default AnnotationPoint;
