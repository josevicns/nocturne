import type { DateTimeType } from '../config.js';

/** The Zod schema a `format: date-time` value is validated with. */
export function dateTimeZodSchema(dateTimeType: DateTimeType): string {
  return dateTimeType === 'string' ? 'z.iso.datetime({ offset: true })' : 'z.coerce.date()';
}
