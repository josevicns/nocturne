import type { Snippet } from 'svelte';
import type { ChordGroup, Chord } from 'd3-chord';
export type ChordProps = {
    /**
     * The input adjacency matrix for the chord layout.
     */
    matrix: number[][];
    /**
     * The variant of chord layout to use.
     *
     * - `'default'` - symmetric chord layout (d3.chord)
     * - `'directed'` - directed/asymmetric chord layout (d3.chordDirected)
     * - `'transpose'` - transpose chord layout, highlights outgoing (d3.chordTranspose)
     *
     * @default 'default'
     */
    variant?: 'default' | 'directed' | 'transpose';
    /**
     * The angular padding between adjacent groups in radians.
     *
     * @default 0
     */
    padAngle?: number;
    /**
     * A comparator function to sort groups.
     */
    sortGroups?: ((a: number, b: number) => number) | null;
    /**
     * A comparator function to sort subgroups within each group.
     */
    sortSubgroups?: ((a: number, b: number) => number) | null;
    /**
     * A comparator function to sort chords.
     */
    sortChords?: ((a: number, b: number) => number) | null;
    /**
     * Multiplier for inner radius relative to outerRadius.
     *
     * @default 0.9
     */
    innerRadiusRatio?: number;
    children?: Snippet<[
        {
            groups: ChordGroup[];
            chords: Chord[];
            innerRadius: number;
            outerRadius: number;
        }
    ]>;
};
declare const Chord: import("svelte").Component<ChordProps, {}, "">;
type Chord = ReturnType<typeof Chord>;
export default Chord;
