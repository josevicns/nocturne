// deno-fmt-ignore-file
import * as Externals from './_externals.mjs';
import { Unique } from './_unique.mjs';
import { Guard as G, EmitGuard as E } from '../../guard/index.mjs';
import { BuildSchema, CheckSchema, ErrorSchema } from './schema.mjs';
// ------------------------------------------------------------------
// Build
// ------------------------------------------------------------------
export function BuildPatternProperties(stack, context, schema, value) {
    return E.ReduceAnd(G.Entries(schema.patternProperties).map(([pattern, schema]) => {
        const [key, prop] = [Unique(), Unique()];
        const regexp = Externals.CreateVariable(new RegExp(pattern));
        const notKey = E.Not(E.Call(E.Member(regexp, 'test'), [key]));
        const isSchema = BuildSchema(stack, context, schema, prop);
        const addKey = context.AddKey(key);
        const guarded = context.UseUnevaluated() ? E.Or(notKey, E.And(isSchema, addKey)) : E.Or(notKey, isSchema);
        return E.Every(E.Entries(value), E.Constant(0), [`[${key}, ${prop}]`, '_'], guarded);
    }));
}
// ------------------------------------------------------------------
// Check
// ------------------------------------------------------------------
export function CheckPatternProperties(stack, context, schema, value) {
    return G.Every(G.Entries(schema.patternProperties), 0, ([pattern, schema]) => {
        const regexp = new RegExp(pattern);
        return G.Every(G.Entries(value), 0, ([key, prop]) => {
            return !regexp.test(key) || CheckSchema(stack, context, schema, prop) && context.AddKey(key);
        });
    });
}
// ------------------------------------------------------------------
// Error
// ------------------------------------------------------------------
export function ErrorPatternProperties(stack, context, schemaPath, instancePath, schema, value) {
    return G.EveryAll(G.Entries(schema.patternProperties), 0, ([pattern, schema]) => {
        const nextSchemaPath = `${schemaPath}/patternProperties/${pattern}`;
        const regexp = new RegExp(pattern);
        return G.EveryAll(G.Entries(value), 0, ([key, value]) => {
            const nextInstancePath = `${instancePath}/${key}`;
            const notKey = !regexp.test(key);
            return notKey || ErrorSchema(stack, context, nextSchemaPath, nextInstancePath, schema, value) && context.AddKey(key);
        });
    });
}
