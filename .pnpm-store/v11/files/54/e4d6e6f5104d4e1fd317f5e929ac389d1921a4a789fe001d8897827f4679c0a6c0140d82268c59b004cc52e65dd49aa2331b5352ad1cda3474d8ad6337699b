import { createAdapter } from './adapters.js';
import { memoize } from '../memoize.js';
import Type from 'typebox';
/**
 * Custom TypeBox type for Date for testing purposes.
 */
export class TDate extends Type.Base {
    Check(value) {
        return value instanceof globalThis.Date;
    }
    Errors(value) {
        return this.Check(value) ? [] : [{ message: 'must be Date' }];
    }
    Create() {
        return new globalThis.Date(0);
    }
}
/**
 * Custom TypeBox type for Date for testing purposes.
 */
export function Date() {
    return new TDate();
}
// From https://github.com/sinclairzx81/typebox/tree/ca4d771b87ee1f8e953036c95a21da7150786d3e/example/formats
const Email = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
async function modules() {
    const { Compile } = await import(/* webpackIgnore: true */ 'typebox/compile');
    const Format = await import(/* webpackIgnore: true */ 'typebox/format');
    return { Compile, Format };
}
const fetchModule = /* @__PURE__ */ memoize(modules);
async function validate(schema, data) {
    const { Compile, Format } = await fetchModule();
    if (!compiled.has(schema)) {
        compiled.set(schema, Compile(schema));
    }
    if (!Format.Has('email')) {
        Format.Set('email', (value) => Email.test(value));
    }
    const validator = compiled.get(schema);
    const errors = [...(validator?.Errors(data) ?? [])];
    if (!errors.length) {
        return { success: true, data: data };
    }
    return {
        success: false,
        issues: errors.map((issue) => ({
            path: issue.instancePath ? issue.instancePath.substring(1).split('/') : [],
            message: issue.message
        }))
    };
}
function _typebox(schema) {
    return createAdapter({
        superFormValidationLibrary: 'typebox',
        validate: async (data) => validate(schema, data),
        jsonSchema: schema
    });
}
function _typeboxClient(schema) {
    return {
        superFormValidationLibrary: 'typebox',
        validate: async (data) => validate(schema, data)
    };
}
export const typebox = /* @__PURE__ */ memoize(_typebox);
export const typeboxClient = /* @__PURE__ */ memoize(_typeboxClient);
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
const compiled = new WeakMap();
