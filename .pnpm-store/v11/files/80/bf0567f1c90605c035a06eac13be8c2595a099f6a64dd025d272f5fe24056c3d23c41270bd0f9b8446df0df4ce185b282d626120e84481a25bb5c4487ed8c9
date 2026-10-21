import { Context } from 'runed';
const CanvasContext = new Context('CanvasContext');
const defaultCanvasContext = {
    register: (_) => {
        return () => { };
    },
    invalidate: () => { },
};
export function getCanvasContext() {
    return CanvasContext.getOr(defaultCanvasContext);
}
export function setCanvasContext(context) {
    return CanvasContext.set(context);
}
