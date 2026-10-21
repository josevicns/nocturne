// deno-fmt-ignore-file
import { EvaluateUnion } from '../evaluate/evaluate.mjs';
import { ToIndexableKeys } from '../indexable/to-indexable-keys.mjs';
function SelectProperty(properties, indexer) {
    const result = indexer in properties ? [properties[indexer]] : [];
    return result;
}
function SelectProperties(properties, indexer) {
    return indexer.reduce((result, left) => {
        return [...result, ...SelectProperty(properties, left)];
    }, []);
}
export function FromObject(properties, indexer) {
    const keys = ToIndexableKeys(indexer);
    const variants = SelectProperties(properties, keys);
    const result = EvaluateUnion(variants);
    return result;
}
