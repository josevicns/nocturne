// deno-fmt-ignore-file
import { Guard as G, EmitGuard as E } from '../../guard/index.mjs';
// ------------------------------------------------------------------
// Build
// ------------------------------------------------------------------
export function BuildExclusiveMaximum(stack, context, schema, value) {
    return E.IsLessThan(value, E.Constant(schema.exclusiveMaximum));
}
// ------------------------------------------------------------------
// Check
// ------------------------------------------------------------------
export function CheckExclusiveMaximum(stack, context, schema, value) {
    return G.IsLessThan(value, schema.exclusiveMaximum);
}
// ------------------------------------------------------------------
// Error
// ------------------------------------------------------------------
export function ErrorExclusiveMaximum(stack, context, schemaPath, instancePath, schema, value) {
    return CheckExclusiveMaximum(stack, context, schema, value) || context.AddError({
        keyword: 'exclusiveMaximum',
        schemaPath,
        instancePath,
        params: { comparison: '<', limit: schema.exclusiveMaximum }
    });
}
