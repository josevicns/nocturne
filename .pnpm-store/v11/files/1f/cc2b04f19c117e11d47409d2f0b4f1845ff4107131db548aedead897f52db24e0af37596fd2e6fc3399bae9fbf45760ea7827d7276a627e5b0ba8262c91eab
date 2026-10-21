import type { XSchema } from '../types/schema.mjs';
import type { XStaticSchema } from './schema.mjs';
import type { XIsReadonly } from './~readonly.mjs';
type XReadonlyOptionalProperties<Stack extends string[], Root extends XSchema, Properties extends Record<PropertyKey, XSchema>> = {
    readonly [Key in keyof Properties as XIsReadonly<Properties[Key]> extends true ? Key : never]?: XStaticSchema<Stack, Root, Properties[Key]>;
};
type XOptionalProperties<Stack extends string[], Root extends XSchema, Properties extends Record<PropertyKey, XSchema>> = {
    [Key in keyof Properties as XIsReadonly<Properties[Key]> extends true ? never : Key]?: XStaticSchema<Stack, Root, Properties[Key]>;
};
export type XStaticProperties<Stack extends string[], Root extends XSchema, Properties extends Record<PropertyKey, XSchema>, ReadonlyOptional extends Record<PropertyKey, unknown> = XReadonlyOptionalProperties<Stack, Root, Properties>, Optional extends Record<PropertyKey, unknown> = XOptionalProperties<Stack, Root, Properties>, Result extends Record<PropertyKey, unknown> = ReadonlyOptional & Optional> = Result;
export {};
