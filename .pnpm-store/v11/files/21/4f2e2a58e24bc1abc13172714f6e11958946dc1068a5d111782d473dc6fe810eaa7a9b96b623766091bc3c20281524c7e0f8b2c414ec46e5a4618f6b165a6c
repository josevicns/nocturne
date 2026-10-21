const SSR_CAPTURE_KEY = Symbol.for('layerchart.ssr-capture');
let _capture = null;
function getGlobalCaptureStore() {
    return globalThis;
}
export function setSSRCapture(target) {
    _capture = target;
    const globalStore = getGlobalCaptureStore();
    if (target == null) {
        delete globalStore[SSR_CAPTURE_KEY];
    }
    else {
        globalStore[SSR_CAPTURE_KEY] = target;
    }
}
export function getSSRCapture() {
    return getGlobalCaptureStore()[SSR_CAPTURE_KEY] ?? _capture;
}
