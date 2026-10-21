import type { Snippet } from 'svelte';
import type { Without } from '../../utils/types.js';
import type { HTMLCanvasAttributes } from 'svelte/elements';
export type WebGLPropsWithoutHTML = {
    /**
     * A reference to the  `<canvas>` element.
     *
     * @bindable
     */
    ref?: HTMLCanvasElement;
    /**
     * The layer's z-index.
     */
    zIndex?: number;
    /**
     * Set this to `false` to set `pointer-events: none;` on the entire layer.
     *
     * @default true
     */
    pointerEvents?: boolean;
    /**
     * The second argument passed to canvas.getContext.
     *
     * See the WebGL docs [for more info](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext).
     */
    contextAttributes?: Parameters<HTMLCanvasElement['getContext']>[1];
    /**
     * The `<canvas>`'s WebGL context.
     * @bindable
     */
    context?: WebGLRenderingContext;
    /**
     * Text to display if the browser won't render a canvas tag.
     * You can also set arbitrary HTML via the `fallback` snippet but this is fine
     * if you just need text. If you use the `fallback` snippet, this prop is ignored.
     */
    fallback?: string | Snippet;
    children?: Snippet<[
        {
            ref: HTMLCanvasElement;
            webGLContext: WebGLRenderingContext | undefined;
        }
    ]>;
};
export type WebGLProps = WebGLPropsWithoutHTML & Without<HTMLCanvasAttributes, WebGLPropsWithoutHTML>;
export type WebGLContextValue = {
    gl: WebGLRenderingContext | null;
};
export declare function setWebGLContext(context: WebGLContextValue): WebGLContextValue;
export declare function getWebGLContext(): WebGLContextValue;
declare const WebGL: import("svelte").Component<WebGLProps, {}, "ref" | "context">;
type WebGL = ReturnType<typeof WebGL>;
export default WebGL;
