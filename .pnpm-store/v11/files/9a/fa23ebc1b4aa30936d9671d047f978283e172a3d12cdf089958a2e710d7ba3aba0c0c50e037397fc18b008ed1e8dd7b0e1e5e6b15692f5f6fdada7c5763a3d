import { Context } from 'runed';
import { Settings, defaultSettings } from '../states/settings.svelte.js';
const _SettingsContext = new Context('Settings');
/** Get the current settings context, or default if not set */
export function getSettings() {
    return _SettingsContext.getOr(defaultSettings);
}
export function setSettings(settings) {
    return _SettingsContext.set(new Settings(settings));
}
