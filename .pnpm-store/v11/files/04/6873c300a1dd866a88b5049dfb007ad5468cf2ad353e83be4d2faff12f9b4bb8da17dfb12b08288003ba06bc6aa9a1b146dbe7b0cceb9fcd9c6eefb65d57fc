// deno-fmt-ignore-file
import { Guard as G, EmitGuard as E } from '../../guard/index.mjs';
// ------------------------------------------------------------------
// Build
// ------------------------------------------------------------------
export function BuildMinLength(stack, context, schema, value) {
    return E.IsMinLength(value, E.Constant(schema.minLength));
}
// ------------------------------------------------------------------
// Check
// ------------------------------------------------------------------
export function CheckMinLength(stack, context, schema, value) {
    return G.IsMinLength(value, schema.minLength);
}
// ------------------------------------------------------------------
// Error
// ------------------------------------------------------------------
export function ErrorMinLength(stack, context, schemaPath, instancePath, schema, value) {
    return CheckMinLength(stack, context, schema, value) || context.AddError({
        keyword: 'minLength',
        schemaPath,
        instancePath,
        params: { limit: schema.minLength }
    });
}
