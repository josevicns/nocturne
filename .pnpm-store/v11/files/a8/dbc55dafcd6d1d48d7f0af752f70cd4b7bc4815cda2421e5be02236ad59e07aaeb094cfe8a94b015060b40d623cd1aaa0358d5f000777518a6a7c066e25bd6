// deno-fmt-ignore-file
import { Settings } from '../settings/index.mjs';
import { Metrics } from './metrics.mjs';
function Merge(left, right, configuration = {}) {
    const descriptor = { configurable: true, writable: true, enumerable: true, ...configuration };
    for (const key of Object.keys(right)) {
        Object.defineProperty(left, key, { ...descriptor, value: right[key] });
    }
    return left;
}
/**
 * Creates an object with hidden, enumerable, and optional property sets. This function
 * ensures types are instantiated according to configuration rules for enumerable and
 * non-enumerable properties.
 */
export function Create(hidden, enumerable, options = {}) {
    Metrics.create += 1;
    const settings = Settings.Get();
    const withHidden = Merge({}, hidden, { enumerable: settings.enumerableKind });
    const withEnumerable = Merge(withHidden, enumerable);
    const withOptions = Merge(withEnumerable, options);
    return settings.immutableTypes ? Object.freeze(withOptions) : withOptions;
}
