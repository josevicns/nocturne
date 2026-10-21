// deno-fmt-ignore-file
import { Guard as G, EmitGuard as E } from '../../guard/index.mjs';
// ------------------------------------------------------------------
// Build
// ------------------------------------------------------------------
export function BuildMinItems(stack, context, schema, value) {
    return E.IsGreaterEqualThan(E.Member(value, 'length'), E.Constant(schema.minItems));
}
// ------------------------------------------------------------------
// Check
// ------------------------------------------------------------------
export function CheckMinItems(stack, context, schema, value) {
    return G.IsGreaterEqualThan(value.length, schema.minItems);
}
// ------------------------------------------------------------------
// Error
// ------------------------------------------------------------------
export function ErrorMinItems(stack, context, schemaPath, instancePath, schema, value) {
    return CheckMinItems(stack, context, schema, value) || context.AddError({
        keyword: 'minItems',
        schemaPath,
        instancePath,
        params: { limit: schema.minItems }
    });
}
