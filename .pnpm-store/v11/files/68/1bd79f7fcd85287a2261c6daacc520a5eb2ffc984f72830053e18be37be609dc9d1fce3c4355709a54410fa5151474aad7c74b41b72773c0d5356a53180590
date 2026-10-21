import type { XSchema } from '../types/schema.mjs';
export type TIsReadonly<Schema extends XSchema> = (Schema extends {
    readOnly: true;
} ? true : Schema extends {
    '~readonly': true;
} ? true : false);
