import { createAdapter } from './adapters.js';
import { safeParseAsync } from 'valibot';
import { memoize } from '../memoize.js';
import { toJsonSchema } from '@valibot/to-json-schema';
const defaultOptions = {
    ignoreActions: ['transform', 'mime_type', 'max_size', 'min_size', 'starts_with', 'trim'],
    typeMode: 'input',
    errorMode: 'ignore',
    overrideSchema: (context) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const type = context.valibotSchema.type;
        if (type === 'date') {
            return { type: 'integer', format: 'unix-time' };
        }
        if (type === 'bigint') {
            return { type: 'string', format: 'bigint' };
        }
        if (type === 'file' || type === 'blob' || type === 'instance' || type === 'custom') {
            return {};
        }
    }
};
/* @__NO_SIDE_EFFECTS__ */
export const valibotToJSONSchema = (options) => {
    const { schema, ...rest } = options;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return toJsonSchema(schema, { ...defaultOptions, ...rest });
};
async function _validate(schema, data, config) {
    const result = await safeParseAsync(schema, data, config);
    if (result.success) {
        return {
            data: result.output,
            success: true
        };
    }
    return {
        issues: result.issues.map(({ message, path }) => ({
            message,
            path: path?.map(({ key }) => key)
        })),
        success: false
    };
}
function _valibot(schema, options = {}) {
    return createAdapter({
        superFormValidationLibrary: 'valibot',
        validate: async (data) => _validate(schema, data, options?.config),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        jsonSchema: options?.jsonSchema ?? valibotToJSONSchema({ schema: schema, ...options }),
        defaults: 'defaults' in options ? options.defaults : undefined
    });
}
function _valibotClient(schema, options = {}) {
    return {
        superFormValidationLibrary: 'valibot',
        validate: async (data) => _validate(schema, data, options?.config)
    };
}
export const valibot = /* @__PURE__ */ memoize(_valibot);
export const valibotClient = /* @__PURE__ */ memoize(_valibotClient);
