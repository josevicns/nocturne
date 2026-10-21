/**
 * Recursively render the component tree onto a canvas context.
 * Group nodes: save → render → recurse children → restore
 * Leaf nodes: save → render → restore
 * Non-rendering nodes: just recurse children
 */
export function renderTree(ctx, node) {
    if (node.kind === 'group' && node.canvasRender) {
        // Group: save state, apply transform, render children, restore
        ctx.save();
        node.canvasRender.render(ctx);
        for (const child of node.children) {
            renderTree(ctx, child);
        }
        ctx.restore();
    }
    else if (node.canvasRender) {
        // Leaf mark: save, render, restore
        ctx.save();
        node.canvasRender.render(ctx);
        ctx.restore();
    }
    else {
        // Non-rendering node (e.g. root, composite-mark): just recurse children
        for (const child of node.children) {
            renderTree(ctx, child);
        }
    }
}
