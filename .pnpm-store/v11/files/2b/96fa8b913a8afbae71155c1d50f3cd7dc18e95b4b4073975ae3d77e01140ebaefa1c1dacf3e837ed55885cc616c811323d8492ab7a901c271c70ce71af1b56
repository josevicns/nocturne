import {} from 'zod/v3';
import { createAdapter } from './adapters.js';
import { zodToJsonSchema as zodToJson } from 'zod-v3-to-json-schema';
import { memoize } from '../memoize.js';
const defaultOptions = {
    dateStrategy: 'integer',
    pipeStrategy: 'output',
    $refStrategy: 'none'
};
/* @__NO_SIDE_EFFECTS__ */
export const zodToJSONSchema = (...params) => {
    params[1] = typeof params[1] == 'object' ? { ...defaultOptions, ...params[1] } : defaultOptions;
    return zodToJson(...params);
};
async function validate(schema, data, errorMap) {
    const result = await schema.safeParseAsync(data, { errorMap });
    if (result.success) {
        return {
            data: result.data,
            success: true
        };
    }
    return {
        issues: result.error.issues.map(({ message, path }) => ({ message, path })),
        success: false
    };
}
function _zod(schema, options) {
    // Detect Zod v4 schema passed to v3 adapter
    if ('_zod' in schema && typeof schema._zod === 'object') {
        console.warn('[superforms] Zod v4 schema detected but using Zod v3 adapter. ' +
            'Import { zod4 } from "sveltekit-superforms/adapters" instead of { zod } for Zod v4 support.');
    }
    return createAdapter({
        superFormValidationLibrary: 'zod',
        validate: async (data) => {
            return validate(schema, data, options?.errorMap);
        },
        jsonSchema: options?.jsonSchema ?? zodToJSONSchema(schema, options?.config),
        defaults: options?.defaults
    });
}
function _zodClient(schema, options) {
    return {
        superFormValidationLibrary: 'zod',
        validate: async (data) => validate(schema, data, options?.errorMap)
    };
}
export const zod = /* @__PURE__ */ memoize(_zod);
export const zodClient = /* @__PURE__ */ memoize(_zodClient);
