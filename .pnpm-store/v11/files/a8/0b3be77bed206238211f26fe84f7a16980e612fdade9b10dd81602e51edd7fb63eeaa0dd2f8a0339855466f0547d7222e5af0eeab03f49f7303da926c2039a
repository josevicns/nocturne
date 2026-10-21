// deno-fmt-ignore-file
import { Guard as G, EmitGuard as E } from '../../guard/index.mjs';
// ------------------------------------------------------------------
// Build
// ------------------------------------------------------------------
export function BuildMaxLength(stack, context, schema, value) {
    return E.IsMaxLength(value, E.Constant(schema.maxLength));
}
// ------------------------------------------------------------------
// Check
// ------------------------------------------------------------------
export function CheckMaxLength(stack, context, schema, value) {
    return G.IsMaxLength(value, schema.maxLength);
}
// ------------------------------------------------------------------
// Error
// ------------------------------------------------------------------
export function ErrorMaxLength(stack, context, schemaPath, instancePath, schema, value) {
    return CheckMaxLength(stack, context, schema, value) || context.AddError({
        keyword: 'maxLength',
        schemaPath,
        instancePath,
        params: { limit: schema.maxLength }
    });
}
