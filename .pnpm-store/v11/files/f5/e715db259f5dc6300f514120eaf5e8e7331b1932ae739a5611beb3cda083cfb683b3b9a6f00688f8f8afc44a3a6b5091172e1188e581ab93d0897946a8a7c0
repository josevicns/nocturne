import { type ConfigurableWindow } from "../../internal/configurable-globals.js";
import type { MaybeElementGetter } from "../../internal/types.js";
import { type UseIntersectionObserverOptions } from "../use-intersection-observer/use-intersection-observer.svelte.js";
export type IsInViewportOptions = ConfigurableWindow & UseIntersectionObserverOptions;
/**
 * Tracks if an element is visible within the current viewport.
 *
 * @see {@link https://runed.dev/docs/utilities/is-in-viewport}
 */
export declare class IsInViewport {
    #private;
    constructor(node: MaybeElementGetter, options?: IsInViewportOptions);
    /** Current viewport intersection state */
    get current(): boolean;
    /** The underlying intersection observer */
    get observer(): {
        readonly isActive: boolean;
        stop: () => void;
        pause(): void;
        resume(): void;
    };
}
