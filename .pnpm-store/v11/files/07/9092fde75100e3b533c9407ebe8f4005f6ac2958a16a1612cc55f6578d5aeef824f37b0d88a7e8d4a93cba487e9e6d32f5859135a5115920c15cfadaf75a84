import type { NodeViewRenderer, NodeViewProps, NodeViewRendererOptions } from '@tiptap/core';
import type { Decoration, DecorationSource } from '@tiptap/pm/view';
import type { Node as ProseMirrorNode } from '@tiptap/pm/model';
import { type Component, getAllContexts } from 'svelte';
interface RendererUpdateProps {
    oldNode: ProseMirrorNode;
    oldDecorations: readonly Decoration[];
    oldInnerDecorations: DecorationSource;
    newNode: ProseMirrorNode;
    newDecorations: readonly Decoration[];
    newInnerDecorations: DecorationSource;
    updateProps: () => void;
}
type AttrProps = Record<string, string> | ((props: {
    node: ProseMirrorNode;
    HTMLAttributes: Record<string, any>;
}) => Record<string, string>);
export interface SvelteNodeViewRendererOptions extends NodeViewRendererOptions {
    update: ((props: RendererUpdateProps) => boolean) | null;
    as?: string;
    attrs?: AttrProps;
    context?: ReturnType<typeof getAllContexts>;
}
declare const SvelteNodeViewRenderer: (component: Component<NodeViewProps>, options?: Partial<SvelteNodeViewRendererOptions>) => NodeViewRenderer;
export default SvelteNodeViewRenderer;
