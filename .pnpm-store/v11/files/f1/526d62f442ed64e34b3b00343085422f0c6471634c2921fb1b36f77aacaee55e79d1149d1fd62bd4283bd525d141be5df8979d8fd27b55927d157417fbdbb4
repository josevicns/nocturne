// deno-fmt-ignore-file
import * as Functions from './_functions.mjs';
import * as Schema from '../types/index.mjs';
import { CheckSchema, ErrorSchema } from './schema.mjs';
// ------------------------------------------------------------------
// Build
// ------------------------------------------------------------------
export function BuildRecursiveRef(stack, context, schema, value) {
    const target = stack.RecursiveRef(schema.$recursiveRef) ?? false;
    return Functions.CreateFunction(stack, context, target, value);
}
// ------------------------------------------------------------------
// Check
// ------------------------------------------------------------------
export function CheckRecursiveRef(stack, context, schema, value) {
    const target = stack.RecursiveRef(schema.$recursiveRef) ?? false;
    return (Schema.IsSchema(target) && CheckSchema(stack, context, target, value));
}
// ------------------------------------------------------------------
// Error
// ------------------------------------------------------------------
export function ErrorRecursiveRef(stack, context, schemaPath, instancePath, schema, value) {
    const target = stack.RecursiveRef(schema.$recursiveRef) ?? false;
    return (Schema.IsSchema(target) && ErrorSchema(stack, context, '#', instancePath, target, value));
}
