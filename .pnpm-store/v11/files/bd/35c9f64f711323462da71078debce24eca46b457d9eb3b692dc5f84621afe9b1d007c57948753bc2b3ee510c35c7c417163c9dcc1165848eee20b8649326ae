// deno-fmt-ignore-file
import { Arguments } from '../system/arguments/index.mjs';
import { Environment } from '../system/environment/index.mjs';
import { Base } from '../type/index.mjs';
import { Errors, Clean, Convert, Create, Default, Decode, Encode, HasCodec, Parser } from '../value/index.mjs';
import { Build } from '../schema/index.mjs';
// ------------------------------------------------------------------
// Validator<...>
// ------------------------------------------------------------------
export class Validator extends Base {
    /** Constructs a Validator. */
    constructor(...args) {
        super();
        const matched = Arguments.Match(args, {
            6: (context, type, isEvalulated, hasCodec, code, check) => [context, type, isEvalulated, hasCodec, code, check],
            2: (context, type) => [context, type]
        });
        if (matched.length === 6) {
            const [context, type, isEvaluated, hasCodec, code, check] = matched;
            this.context = context;
            this.type = type;
            this.isEvaluated = isEvaluated;
            this.hasCodec = hasCodec;
            this.code = code;
            this.check = check;
        }
        else {
            const [context, type] = matched;
            const result = Build(context, type).Evaluate();
            this.hasCodec = HasCodec(context, type);
            this.context = context;
            this.type = type;
            this.isEvaluated = result.IsEvaluated;
            this.code = result.Code;
            this.check = result.Check;
        }
    }
    // ----------------------------------------------------------------
    // IsEvaluated
    // ----------------------------------------------------------------
    /** Returns true if this validator is using runtime eval optimizations. */
    IsEvaluated() {
        return this.isEvaluated;
    }
    // ----------------------------------------------------------------
    // Context | Type
    // ----------------------------------------------------------------
    /** Returns the Context for this validator. */
    Context() {
        return this.context;
    }
    /** Returns the Type for this validator. */
    Type() {
        return this.type;
    }
    // ----------------------------------------------------------------
    // Code
    // ----------------------------------------------------------------
    /** Returns the generated code for this validator. */
    Code() {
        return this.code;
    }
    // ----------------------------------------------------------------
    // Base<...>
    // ----------------------------------------------------------------
    /** Checks a value matches the Validator type. */
    Check(value) {
        return this.check(value);
    }
    /** Returns errors for the given value. */
    Errors(value) {
        if (Environment.CanEvaluate() && this.check(value))
            return [];
        return Errors(this.context, this.type, value);
    }
    /** Cleans a value using the Validator type. */
    Clean(value) {
        return Clean(this.context, this.type, value);
    }
    /** Converts a value using the Validator type. */
    Convert(value) {
        return Convert(this.context, this.type, value);
    }
    /** Creates a value using the Validator type. */
    Create() {
        return Create(this.context, this.type);
    }
    /** Creates defaults using the Validator type. */
    Default(value) {
        return Default(this.context, this.type, value);
    }
    /** Clones this validator. */
    Clone() {
        return new Validator(this.context, this.type, this.isEvaluated, this.hasCodec, this.code, this.check);
    }
    // ----------------------------------------------------------------
    // Parse | Decode | Encode
    // ----------------------------------------------------------------
    /** Parses a value */
    Parse(value) {
        const result = this.Check(value) ? value : Parser(this.context, this.type, value);
        return result;
    }
    /** Decodes a value */
    Decode(value) {
        const result = this.hasCodec ? Decode(this.context, this.type, value) : this.Parse(value);
        return result;
    }
    /** Encodes a value */
    Encode(value) {
        const result = this.hasCodec ? Encode(this.context, this.type, value) : this.Parse(value);
        return result;
    }
}
