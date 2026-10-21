import { Renderer } from './renderer.js';
import * as util from 'node:util';
export type Formatter = (input: string) => string;
export type DisplayOptions = {
    symbolFormatter?: Formatter;
    text?: string;
    symbol?: string;
    symbolType?: 'succeed' | 'fail' | 'warn' | 'info' | 'spinner';
};
export type SpinnerOptions = {
    colors?: boolean | ColorOptions;
    frames?: string[];
    symbols?: Partial<Symbols>;
    disableNewLineEnding?: boolean;
};
type Style = Parameters<typeof util.styleText>[0];
export type ColorOptions = {
    succeed?: Style;
    fail?: Style;
    warn?: Style;
    info?: Style;
    spinner?: Style;
    text?: Style;
};
export type Symbols = {
    succeed: string;
    fail: string;
    warn: string;
    info: string;
};
export declare const renderer: Renderer;
export declare class Spinner {
    running: boolean;
    private text;
    private currentSymbol;
    private symbolFormatter?;
    private interval?;
    private frameIndex;
    private symbols;
    private frames;
    private component;
    private colors?;
    constructor(display?: DisplayOptions | string, { disableNewLineEnding, colors, frames, symbols }?: SpinnerOptions);
    start(tickMs?: number): void;
    tick(): void;
    private onProcessExit;
    private addListeners;
    private clearListeners;
    refresh(): void;
    setDisplay(displayOpts?: DisplayOptions, render?: boolean): void;
    setText(text: string, render?: boolean): void;
    succeed(display?: DisplayOptions | string): void;
    fail(display?: DisplayOptions | string): void;
    warn(display?: DisplayOptions | string): void;
    info(display?: DisplayOptions | string): void;
    stop(): void;
    private end;
    private format;
}
export {};
