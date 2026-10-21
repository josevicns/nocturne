import type { Snippet } from 'svelte';
import { BrushState, type BrushDomainType, type BrushExtent, type BrushSelection } from '../states/brush.svelte.js';
type BrushEventPayload = {
    brush: BrushState;
};
type BrushContextPropsWithoutHTML = {
    /**
     * The axis to apply brushing
     *
     * @default 'x'
     */
    axis?: 'x' | 'y' | 'both';
    /**
     * Size of the draggable handles (width/height)
     *
     * @default 5
     */
    handleSize?: number;
    /**
     * Whether clicking on the empty area resets the brush.
     *
     * @default true
     */
    clickToReset?: boolean;
    /**
     * External x domain to sync the brush to.
     * When provided, the brush reactively updates to reflect this value.
     */
    x?: BrushDomainType;
    /**
     * External y domain to sync the brush to.
     * When provided, the brush reactively updates to reflect this value.
     */
    y?: BrushDomainType;
    /**
     * Minimum selection size per axis. In domain units for continuous scales (e.g. milliseconds
     * for time scales), or number of categories for band/point scales.
     */
    minExtent?: BrushExtent;
    /**
     * Maximum selection size per axis, e.g. `{ x: 30 * 24 * 60 * 60 * 1000 }` to cap a time-scale
     * brush at 30 days. In domain units for continuous scales, or number of categories for band scales.
     */
    maxExtent?: BrushExtent;
    /**
     * Custom constraint function, called after `min/maxExtent` on every selection update. Receives
     * the candidate `{ x, y }` domain selection and returns a corrected one (e.g. snapping edges to
     * boundaries). Mirrors `TransformContext`'s `constrain`.
     */
    constrain?: (selection: BrushSelection) => BrushSelection;
    /**
     * Keep the selection within the domain extent. Pointer gestures already clamp to the domain;
     * this additionally clamps `constrain` output (e.g. a snap that rounds past the first/last
     * value). Set `false` to allow `constrain` to place edges outside the domain.
     *
     * @default true
     */
    constrainToDomain?: boolean;
    /**
     * Disable brush
     *
     * @default false
     */
    disabled?: boolean;
    /**
     * Attributes passed to the range <div> element
     */
    range?: Partial<HTMLAttributes<HTMLElement>>;
    /**
     * Attributes passed to the handle <div> elements
     */
    handle?: Partial<HTMLAttributes<HTMLElement>>;
    /**
     * Classes to apply to the various elements rendered
     *
     * @default {}
     */
    classes?: {
        root?: string;
        frame?: string;
        range?: string;
        handle?: string;
        labels?: string;
    };
    onBrushStart?: (detail: BrushEventPayload) => void;
    onChange?: (detail: BrushEventPayload) => void;
    onBrushEnd?: (detail: BrushEventPayload) => void;
    /**
     * A reference to this brush's state for use in parent components.
     *
     * @bindable
     */
    state?: BrushState;
    children?: Snippet<[{
        state: BrushState;
    }]>;
};
import type { HTMLAttributes } from 'svelte/elements';
declare const BrushContext: import("svelte").Component<BrushContextPropsWithoutHTML, {}, "state">;
type BrushContext = ReturnType<typeof BrushContext>;
export default BrushContext;
