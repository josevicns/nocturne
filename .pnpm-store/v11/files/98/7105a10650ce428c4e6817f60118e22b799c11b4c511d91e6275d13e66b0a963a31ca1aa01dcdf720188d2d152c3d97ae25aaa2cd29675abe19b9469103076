import { type ValidationAdapter, type Infer, type InferIn, type ClientValidationAdapter } from './adapters.js';
import type { TSchema } from 'typebox';
import Type from 'typebox';
/**
 * Custom TypeBox type for Date for testing purposes.
 */
export declare class TDate extends Type.Base<globalThis.Date> {
    Check(value: unknown): value is globalThis.Date;
    Errors(value: unknown): object[];
    Create(): globalThis.Date;
}
/**
 * Custom TypeBox type for Date for testing purposes.
 */
export declare function Date(): TDate;
export declare const typebox: <T extends TSchema>(schema: T) => ValidationAdapter<Infer<T, "typebox">, InferIn<T, "typebox">>;
export declare const typeboxClient: <T extends TSchema>(schema: T) => ClientValidationAdapter<Infer<T, "typebox">, InferIn<T, "typebox">>;
