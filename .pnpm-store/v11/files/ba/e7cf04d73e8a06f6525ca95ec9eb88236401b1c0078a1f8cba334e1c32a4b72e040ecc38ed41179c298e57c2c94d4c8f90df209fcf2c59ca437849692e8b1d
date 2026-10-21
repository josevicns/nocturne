import { type ConfigurableWindow } from "../../internal/configurable-globals.js";
type Serializer<T> = {
    serialize: (value: T) => string;
    deserialize: (value: string) => T | undefined;
};
type StorageType = "local" | "session";
type PersistedStateOptions<T> = {
    /**
     * The storage type to use.
     *
     * @default "local"
     */
    storage?: StorageType;
    /**
     * The serializer to use.
     *
     * @default { serialize: JSON.stringify, deserialize: JSON.parse }
     */
    serializer?: Serializer<T>;
    /**
     * Whether to sync with the state changes from other tabs.
     *
     * @default true
     */
    syncTabs?: boolean;
    /**
     * Whether to connect to storage on initialization, which means that updates to the state will
     * be persisted to storage and reads from the state will be read from storage.
     *
     * When `connected` is `false`, the state is not connected to storage and any changes to the state will
     * not be persisted to storage and any changes to storage will not be reflected in the state until
     * `.connect()` is called.
     *
     * @default true
     */
    connected?: boolean;
} & ConfigurableWindow;
/**
 * Creates reactive state that is persisted and synchronized across browser sessions and tabs using Web Storage.
 * @param key The unique key used to store the state in the storage.
 * @param initialValue The initial value of the state if not already present in the storage.
 * @param options Configuration options including storage type, serializer for complex data types, and whether to sync state changes across tabs.
 *
 * @see {@link https://runed.dev/docs/utilities/persisted-state}
 */
export declare class PersistedState<T> {
    #private;
    constructor(key: string, initialValue: T, options?: PersistedStateOptions<T>);
    get current(): T;
    set current(newValue: T);
    /**
     * Returns whether the state is currently connected to storage.
     *
     * When `connected` is `false`, the state is not connected to storage and any
     * changes to the state will not be persisted to storage and any changes to storage
     * will not be reflected in the state.
     */
    get connected(): boolean;
    /**
     * Disconnects the state from storage, preventing updates to storage and stopping
     * cross-tab synchronization. The current value in storage is removed.
     *
     * Call `.connect()` to re-enable storage persistence.
     */
    disconnect(): void;
    /**
     * Reconnects the state to storage, enabling storage persistence and cross-tab
     * synchronization. The current value is immediately persisted to storage.
     *
     * **NOTE**: By default, the state is already connected to storage and this method is
     * only useful to re-enable storage persistence after calling `disconnect()`
     * or starting with `connected: false` as an option.
     */
    connect(): void;
}
export {};
