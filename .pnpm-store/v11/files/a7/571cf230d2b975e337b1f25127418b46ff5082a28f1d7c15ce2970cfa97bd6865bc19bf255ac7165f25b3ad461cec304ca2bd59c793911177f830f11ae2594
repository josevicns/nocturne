type TFromTuple<Value extends readonly unknown[]> = (Value extends [infer Left, ...infer Right extends unknown[]] ? [XMutable<Left>, ...TFromTuple<Right>] : []);
type TFromArray<Value extends unknown, Result extends unknown[] = XMutable<Value>[]> = Result;
type TFromObject<Value extends object, Result extends Record<PropertyKey, unknown> = {
    -readonly [K in keyof Value]: XMutable<Value[K]>;
}> = Result;
export type XMutable<Value extends unknown> = (Value extends readonly [...infer Schemas extends unknown[]] ? TFromTuple<Schemas> : Value extends readonly (infer Schema)[] ? TFromArray<Schema> : Value extends object ? TFromObject<Value> : Value);
export {};
