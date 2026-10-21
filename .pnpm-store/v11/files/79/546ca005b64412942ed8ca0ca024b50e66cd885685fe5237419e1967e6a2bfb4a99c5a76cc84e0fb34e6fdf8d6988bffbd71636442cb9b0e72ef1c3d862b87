type XFromTuple<Value extends readonly unknown[]> = (Value extends [infer Left, ...infer Right extends unknown[]] ? [XNonReadonly<Left>, ...XFromTuple<Right>] : []);
type XFromArray<Value extends unknown, Result extends unknown[] = XNonReadonly<Value>[]> = Result;
type XFromObject<Value extends object, Result extends Record<PropertyKey, unknown> = {
    -readonly [K in keyof Value]: XNonReadonly<Value[K]>;
}> = Result;
export type XNonReadonly<Value extends unknown> = (Value extends readonly [...infer Schemas extends unknown[]] ? XFromTuple<Schemas> : Value extends readonly (infer Schema)[] ? XFromArray<Schema> : Value extends object ? XFromObject<Value> : Value);
export {};
