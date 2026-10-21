import { extract } from "../extract/extract.svelte.js";
import { get } from "../../internal/utils/get.js";
import { defaultWindow } from "../../internal/configurable-globals.js";
/**
 * Watch for intersection changes of a target element.
 *
 * @see https://runed.dev/docs/utilities/useIntersectionObserver
 * @see https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver IntersectionObserver MDN
 */
export function useIntersectionObserver(target, callback, options = {}) {
    const { root, rootMargin = "0px", threshold = 0.1, immediate = true, window = defaultWindow, once = false, } = options;
    let isActive = $state(immediate);
    let observer;
    const targets = $derived.by(() => {
        const value = extract(target);
        return new Set(value ? (Array.isArray(value) ? value : [value]) : []);
    });
    const stop = $effect.root(() => {
        $effect(() => {
            if (!targets.size || !isActive || !window)
                return;
            const wrappedCallback = (entries, observer) => {
                entries.forEach((entry) => {
                    // Checking for isIntersecting and intersectionRatio >= threshold bc of a firefox bug
                    // @see https://github.com/w3c/IntersectionObserver/issues/432
                    const isThresholdMet = Array.isArray(threshold)
                        ? threshold.some((t) => entry.intersectionRatio >= t)
                        : entry.intersectionRatio >= threshold;
                    const inView = entry.isIntersecting && isThresholdMet;
                    callback([entry], observer);
                    if (once && inView) {
                        isActive = false;
                        return () => {
                            observer?.disconnect();
                        };
                    }
                });
            };
            observer = new window.IntersectionObserver(wrappedCallback, {
                rootMargin,
                root: get(root),
                threshold,
            });
            for (const el of targets)
                observer.observe(el);
            return () => {
                observer?.disconnect();
            };
        });
    });
    $effect(() => {
        return stop;
    });
    return {
        get isActive() {
            return isActive;
        },
        stop,
        pause() {
            isActive = false;
        },
        resume() {
            isActive = true;
        },
    };
}
