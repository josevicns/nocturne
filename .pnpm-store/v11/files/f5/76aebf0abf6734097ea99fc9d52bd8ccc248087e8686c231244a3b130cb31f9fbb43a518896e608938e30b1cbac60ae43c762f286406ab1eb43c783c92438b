// deno-fmt-ignore-file
import { Guard as G, EmitGuard as E } from '../../guard/index.mjs';
// ------------------------------------------------------------------
// Build
// ------------------------------------------------------------------
export function BuildMinimum(stack, context, schema, value) {
    return E.IsGreaterEqualThan(value, E.Constant(schema.minimum));
}
// ------------------------------------------------------------------
// Check
// ------------------------------------------------------------------
export function CheckMinimum(stack, context, schema, value) {
    return G.IsGreaterEqualThan(value, schema.minimum);
}
// ------------------------------------------------------------------
// Error
// ------------------------------------------------------------------
export function ErrorMinimum(stack, context, schemaPath, instancePath, schema, value) {
    return CheckMinimum(stack, context, schema, value) || context.AddError({
        keyword: 'minimum',
        schemaPath,
        instancePath,
        params: { comparison: '>=', limit: schema.minimum }
    });
}
