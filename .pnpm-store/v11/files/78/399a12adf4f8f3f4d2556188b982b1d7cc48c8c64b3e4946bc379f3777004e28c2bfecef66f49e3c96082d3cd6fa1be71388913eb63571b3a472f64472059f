// deno-fmt-ignore-file
import { IsLiteralNumber, IsLiteralString } from '../../types/literal.mjs';
import { IsEnum } from '../../types/enum.mjs';
import { IsTemplateLiteral } from '../../types/template-literal.mjs';
import { IsUnion } from '../../types/union.mjs';
import { EnumValuesToVariants } from '../enum/index.mjs';
import { TemplateLiteralDecode } from '../template-literal/decode.mjs';
function FromTemplateLiteral(pattern) {
    const decoded = TemplateLiteralDecode(pattern);
    const result = FromType(decoded);
    return result;
}
function FromUnion(types) {
    return types.reduce((result, left) => {
        return [...result, ...FromType(left)];
    }, []);
}
function FromType(type) {
    const result = (IsEnum(type) ? FromUnion(EnumValuesToVariants(type.enum)) :
        IsLiteralString(type) || IsLiteralNumber(type) ? [type] :
            IsTemplateLiteral(type) ? FromTemplateLiteral(type.pattern) :
                IsUnion(type) ? FromUnion(type.anyOf) :
                    []);
    return result;
}
export function MappedKeys(type) {
    const result = FromType(type);
    return result;
}
