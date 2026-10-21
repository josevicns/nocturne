import {} from "../../internal/configurable-globals.js";
import { useIntersectionObserver, } from "../use-intersection-observer/use-intersection-observer.svelte.js";
/**
 * Tracks if an element is visible within the current viewport.
 *
 * @see {@link https://runed.dev/docs/utilities/is-in-viewport}
 */
export class IsInViewport {
    #isInViewport = $state(false);
    #observer;
    constructor(node, options) {
        this.#observer = useIntersectionObserver(node, (intersectionObserverEntries) => {
            let isIntersecting = this.#isInViewport;
            let latestTime = 0;
            for (const entry of intersectionObserverEntries) {
                if (entry.time >= latestTime) {
                    latestTime = entry.time;
                    isIntersecting = entry.isIntersecting;
                }
            }
            this.#isInViewport = isIntersecting;
        }, options);
    }
    /** Current viewport intersection state */
    get current() {
        return this.#isInViewport;
    }
    /** The underlying intersection observer */
    get observer() {
        return this.#observer;
    }
}
