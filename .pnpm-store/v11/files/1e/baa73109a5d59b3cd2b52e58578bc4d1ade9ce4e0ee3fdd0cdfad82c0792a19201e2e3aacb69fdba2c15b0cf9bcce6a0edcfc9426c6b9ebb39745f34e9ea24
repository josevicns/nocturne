/** Global settings context for charts */
export class Settings {
    layer;
    debug;
    constructor(options = {}) {
        this.layer = $state(options.layer ?? 'svg');
        this.debug = $state(options.debug ?? false);
    }
}
export const defaultSettings = new Settings();
