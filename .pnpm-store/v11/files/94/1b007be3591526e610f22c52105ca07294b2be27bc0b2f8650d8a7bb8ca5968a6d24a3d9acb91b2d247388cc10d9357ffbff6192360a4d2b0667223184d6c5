export type DurationOption = {
    milliseconds?: number;
    seconds?: number;
    minutes?: number;
    hours?: number;
    days?: number;
    years?: number;
};
export declare enum DurationUnits {
    Year = 0,
    Day = 1,
    Hour = 2,
    Minute = 3,
    Second = 4,
    Millisecond = 5
}
export declare class Duration {
    #private;
    constructor(options?: {
        start?: Date | string;
        end?: Date | string | null;
        duration?: DurationOption;
    });
    get years(): number;
    get days(): number;
    get hours(): number;
    get minutes(): number;
    get seconds(): number;
    get milliseconds(): number;
    valueOf(): number;
    toJSON(): {
        years: number;
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
        milliseconds: number;
    };
    format(options?: {
        minUnits?: DurationUnits;
        totalUnits?: number;
        fractional?: boolean;
        variant?: 'short' | 'long';
    }): string;
    toString(): string;
    /**
     * Returns the ISO 8601 duration string representation of the duration.
     * @returns ISO 8601 duration string (e.g. "P3Y6M4DT12H30M5S")
     * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
     */
    toISOString(): string;
}
//# sourceMappingURL=duration.d.ts.map