import { Context } from 'runed';
/**
 * Access or set the current GeoContext.
 */
const _GeoContext = new Context('GeoContext');
export function getGeoContext() {
    return _GeoContext.getOr({ projection: undefined });
}
export function setGeoContext(geo) {
    return _GeoContext.set(geo);
}
