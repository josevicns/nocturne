type CreateTuple<Size extends number, Tuple extends unknown[] = []> = Tuple['length'] extends Size ? Tuple : CreateTuple<Size, [...Tuple, unknown]>;
export type XLessThan<Left extends number, Right extends number> = Left extends Right ? false : CreateTuple<Left> extends [...CreateTuple<Right>, ...infer _Rest] ? false : true;
export type XLessThanEqual<Left extends number, Right extends number> = Left extends Right ? true : XLessThan<Left, Right>;
export type XGreaterThan<Left extends number, Right extends number> = XLessThan<Right, Left>;
export type XGreaterThanEqual<Left extends number, Right extends number> = XLessThanEqual<Right, Left>;
export {};
