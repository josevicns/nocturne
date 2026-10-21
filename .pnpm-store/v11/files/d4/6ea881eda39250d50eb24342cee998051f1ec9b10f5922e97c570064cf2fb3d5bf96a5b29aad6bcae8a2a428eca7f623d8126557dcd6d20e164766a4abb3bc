import type { XSchema } from '../types/schema.mjs';
import type { XNonReadonly } from './~non-readonly.mjs';
import type { XStaticSchema } from './schema.mjs';
export type XStatic<Value extends unknown, Schema extends XSchema = Value extends XSchema ? Value : {}, NonReadonly extends XSchema = XNonReadonly<Schema>, Result extends unknown = XStaticSchema<[], NonReadonly, NonReadonly>> = Result;
