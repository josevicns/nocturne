import { type TSchema } from '../types/schema.mjs';
import { type TProperties } from '../types/properties.mjs';
import { type TCyclic } from '../types/cyclic.mjs';
import { type TExtendsLeft } from './extends-left.mjs';
import { type TCyclicExtends } from '../engine/cyclic/index.mjs';
type TNormal<Type extends TSchema> = (Type extends TCyclic ? TCyclicExtends<Type> : Type);
/** Performs a structural extends check on left and right types and yields inferred types on right if specified. */
export type TExtends<Inferred extends TProperties, Left extends TSchema, Right extends TSchema, NormalLeft extends TSchema = TNormal<Left>, NormalRight extends TSchema = TNormal<Right>> = TExtendsLeft<Inferred, NormalLeft, NormalRight>;
/** Performs a structural extends check on left and right types and yields inferred types on right if specified. */
export declare function Extends<Inferred extends TProperties, Left extends TSchema, Right extends TSchema>(inferred: Inferred, left: Left, right: Right): TExtends<Inferred, Left, Right>;
export {};
