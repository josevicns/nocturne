import { TProperties } from '../../types/properties.mjs';
import { type TRef } from '../../types/ref.mjs';
import { type TState, type TInstantiateType } from '../instantiate.mjs';
import { type TCyclicCheck } from '../cyclic/check.mjs';
export type TRefInstantiate<Context extends TProperties, State extends TState, Ref extends string> = (Ref extends keyof Context ? TCyclicCheck<[Ref], Context, Context[Ref]> extends true ? TRef<Ref> : TInstantiateType<Context, State, Context[Ref]> : TRef<Ref>);
export declare function RefInstantiate<Context extends TProperties, State extends TState, Ref extends string>(context: Context, state: State, ref: Ref): TRefInstantiate<Context, State, Ref>;
