import type { HTMLAttributes } from 'svelte/elements';
import { TransformState, type TransformStateOptions } from '../states/transform.svelte.js';
import type { MotionProp } from '../utils/motion.svelte.js';
type TransformContextPropsWithoutHTML = TransformStateOptions & {
    /**
     * A bindable reference to TransformState.
     *
     * @bindable
     */
    state?: TransformState;
    ref?: HTMLElement;
    children?: Snippet<[{
        transformState: TransformState;
    }]>;
    motion?: MotionProp;
};
type TransformContextProps = TransformContextPropsWithoutHTML & Without<HTMLAttributes<HTMLElement>, TransformContextPropsWithoutHTML>;
import type { Snippet } from 'svelte';
import type { Without } from '../utils/types.js';
declare const TransformContext: import("svelte").Component<TransformContextProps, {}, "state" | "ref">;
type TransformContext = ReturnType<typeof TransformContext>;
export default TransformContext;
