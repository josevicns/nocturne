import { mount } from 'svelte';
import type { NodeViewProps } from '@tiptap/core';
interface RendererOptions {
    element: HTMLElement;
    props: NodeViewProps;
}
type App = ReturnType<typeof mount>;
declare class SvelteRenderer {
    component: App;
    props: NodeViewProps;
    dom: HTMLElement;
    constructor(component: App, { element, props }: RendererOptions);
    updateProps(props: Partial<NodeViewProps>): void;
    updateAttributes(attributes: Record<string, string>): void;
    destroy(): void;
}
export default SvelteRenderer;
