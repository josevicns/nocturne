import { memoize } from '../memoize.js';
import { createAdapter, createJsonSchema } from './adapters.js';
async function _validate(schema, data) {
    const result = await schema['~standard'].validate(data);
    if ('value' in result)
        return { success: true, data: result.value };
    else {
        return {
            success: false,
            issues: [
                ...result.issues.map((i) => ({
                    message: i.message,
                    path: i.path?.map((p) => (typeof p === 'object' && 'key' in p ? p.key : p))
                }))
            ]
        };
    }
}
function _standard(schema, options) {
    return createAdapter({
        superFormValidationLibrary: 'standard',
        validate: (data) => _validate(schema, data),
        jsonSchema: createJsonSchema(options),
        defaults: options.defaults
    });
}
function _standardClient(schema) {
    return {
        superFormValidationLibrary: 'standard',
        validate: async (data) => _validate(schema, data)
    };
}
export const standard = /* @__PURE__ */ memoize(_standard);
export const standardClient = /* @__PURE__ */ memoize(_standardClient);
