import type { XSchema } from '../types/schema.mjs';
export type XIsReadonly<Schema extends XSchema> = (Schema extends {
    readOnly: true;
} ? true : Schema extends {
    '~readonly': true;
} ? true : false);
