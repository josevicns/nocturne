import type { XSchema } from '../types/schema.mjs';
import type { XProperties } from '../types/properties.mjs';
import type { XIsReadonly } from './~readonly.mjs';
import type { XStaticSchema } from './schema.mjs';
type XResolveProperties<Schema extends XSchema, Result extends Record<PropertyKey, XSchema> = (Schema extends XProperties<infer Properties extends Record<PropertyKey, XSchema>> ? Properties : {})> = Result;
type XFromKey<Stack extends string[], Root extends XSchema, Properties extends Record<PropertyKey, XSchema>, Key extends string, Readonly extends boolean = Key extends keyof Properties ? XIsReadonly<Properties[Key]> : false, Value extends unknown = Key extends keyof Properties ? XStaticSchema<Stack, Root, Properties[Key]> : unknown, Result extends Record<PropertyKey, unknown> = (Readonly extends true ? {
    readonly [_ in Key]: Value;
} : {
    [_ in Key]: Value;
})> = Result;
type XFromKeys<Stack extends string[], Root extends XSchema, Properties extends Record<PropertyKey, XSchema>, Keys extends string[], Result extends Record<PropertyKey, unknown> = {}> = (Keys extends [infer Left extends string, ...infer Right extends string[]] ? XFromKeys<Stack, Root, Properties, Right, Result & XFromKey<Stack, Root, Properties, Left>> : Result);
export type XStaticRequired<Stack extends string[], Root extends XSchema, Schema extends XSchema, Keys extends string[], Properties extends Record<PropertyKey, XSchema> = XResolveProperties<Schema>, Result extends Record<PropertyKey, unknown> = XFromKeys<Stack, Root, Properties, Keys>> = Result;
export {};
