type TIsEnd<End extends string[], Input extends string> = (End extends [infer Left extends string, ...infer Right extends string[]] ? Input extends `${Left}${string}` ? true : TIsEnd<Right, Input> : false);
/** Match Input until but not including End. No match if End not found. */
export type TUntil<End extends string[], Input extends string, Result extends string = ''> = (Input extends `` ? [] : TIsEnd<End, Input> extends true ? [Result, Input] : Input extends `${infer Left extends string}${infer Right extends string}` ? TUntil<End, Right, `${Result}${Left}`> : []);
/** Match Input until but not including End. No match if End not found. */
export declare function Until<End extends string[], Input extends string>(end: [...End], input: Input, result?: string): TUntil<End, Input>;
export {};
