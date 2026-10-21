import { type ValidationAdapter, type AdapterOptions, type Infer, type InferIn, type ClientValidationAdapter } from './adapters.js';
import { type GenericSchema, type GenericSchemaAsync, type Config, type GenericIssue } from 'valibot';
import { type ConversionConfig } from '@valibot/to-json-schema';
import type { JSONSchema } from '../jsonSchema/index.js';
type SupportedSchemas = GenericSchema | GenericSchemaAsync;
export declare const valibotToJSONSchema: (options: ConversionConfig & {
    schema: SupportedSchemas;
}) => JSONSchema;
export declare const valibot: <T extends SupportedSchemas>(schema: T, options?: (Omit<ConversionConfig, "schema"> & AdapterOptions<Infer<T, "valibot">> & {
    config?: Config<GenericIssue<unknown>>;
}) | undefined) => ValidationAdapter<Infer<T, "valibot">, InferIn<T, "valibot">>;
export declare const valibotClient: <T extends SupportedSchemas>(schema: T, options?: (Omit<ConversionConfig, "schema"> & AdapterOptions<Infer<T, "valibot">> & {
    config?: Config<GenericIssue<unknown>>;
}) | undefined) => ClientValidationAdapter<Infer<T, "valibot">, InferIn<T, "valibot">>;
export {};
