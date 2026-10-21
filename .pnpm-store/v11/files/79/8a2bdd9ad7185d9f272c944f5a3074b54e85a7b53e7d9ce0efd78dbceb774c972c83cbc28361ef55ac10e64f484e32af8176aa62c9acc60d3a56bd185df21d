export declare class TextComponent {
    text: string;
    onChange?: () => void;
    onFinish?: () => void;
    finished: boolean;
    newLineEnding: boolean;
    constructor(text: string);
    setText(text: string): void;
    /**
     * Tells the renderer that the component should not be rerendered if it can be avoided
     */
    finish(): void;
    output(): string;
    disableNewLineEnding(): void;
}
export declare class Renderer {
    hideCursor: boolean;
    private components;
    private lastLinesAmt;
    private terminalWidth;
    private finishedComponents;
    private outputBuffer;
    constructor(hideCursor?: boolean);
    addComponent(component: TextComponent): void;
    private onComponentFinish;
    removeComponent(component: TextComponent): void;
    render(): void;
    clear(): void;
    _reset(): void;
}
