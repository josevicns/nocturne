type Primitive = 'rect' | 'circle' | 'ellipse' | 'line' | 'group' | 'text' | 'path';
/**
 * - `native` — bare `<svg>`, no Chart at all
 * - `native-in-chart` — native elements inside Chart + Layer (isolates fixed setup)
 * - `direct` — layer-specific component, as exported by `layerchart/svg`
 * - `layerchart` — the dispatcher, as exported by `layerchart`
 *
 * `native-in-chart` and `direct` are only wired up for the primitives used by
 * the overhead-decomposition benchmark.
 */
type Mode = 'layerchart' | 'native' | 'native-in-chart' | 'direct';
type Props = {
    primitive: Primitive;
    mode: Mode;
    count?: number;
};
declare const PrimitiveBench: import("svelte").Component<Props, {}, "">;
type PrimitiveBench = ReturnType<typeof PrimitiveBench>;
export default PrimitiveBench;
