import { type HierarchyNode } from 'd3-hierarchy';
/**
 *  Find first ancestor matching filter, including node.
 *  Similar to `node.find()` (https://github.com/d3/d3-hierarchy#node_find) but checks ancestors instead of descendants
 */
export declare function findAncestor<T = any>(node: HierarchyNode<T>, filter: (node: HierarchyNode<T>) => boolean): HierarchyNode<T> | null;
/** Datum for a frame parsed by `parseFoldedStacks()`.  `value` is the frame's _self_ weight. */
export type StackFrame = {
    name: string;
    value: number;
};
export type ParseFoldedStacksOptions = {
    /**
     * Name of the synthetic root node that wraps all top-level frames.
     *
     * @default 'root'
     */
    rootName?: string;
    /**
     * Delimiter between frames within a single stack.
     *
     * @default ';'
     */
    separator?: string;
};
/**
 * Parse "folded" (a.k.a. "collapsed") stacks into a d3 `HierarchyNode` suitable for flame graphs
 * (`Partition`) — similar to `d3.stratify()`, but for stack traces instead of an id/parentId table.
 *
 * Folded stacks are the de-facto interchange format emitted by most profilers (Brendan Gregg's
 * `stackcollapse-*` tools, `async-profiler -o collapsed`, etc.).  Each line is a stack of
 * semicolon-separated frames (leaf last) followed by whitespace and a numeric weight:
 *
 * ```
 * main;http.handle;router.dispatch;db.query 42
 * main;http.handle;router.dispatch 8
 * main;gc 5
 * ```
 *
 * Each frame's datum `value` is its _self_ weight (the sum of stacks ending at that frame).  Like
 * `hierarchy()`/`stratify()`, the returned node is **not** summed — call `.sum((d) => d.value)` to
 * compute inclusive/total values.  Repeated stacks accumulate, blank lines and `#` comments are
 * ignored, and a weight is parsed as the trailing number so frame names may contain spaces.
 */
export declare function parseFoldedStacks(text: string, options?: ParseFoldedStacksOptions): HierarchyNode<StackFrame>;
