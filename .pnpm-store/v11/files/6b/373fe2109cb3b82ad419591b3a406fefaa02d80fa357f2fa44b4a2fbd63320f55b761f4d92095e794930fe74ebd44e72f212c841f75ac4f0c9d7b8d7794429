/**
 * Returns true if the value matches RFC 1123 hostname syntax.
 * @specification https://tools.ietf.org/html/rfc1123
 */
export function IsHostname(value) {
    if (value.length > 253 || value.length === 0)
        return false;
    let start = 0;
    let prev = 0;
    for (let i = 0; i < value.length; i++) {
        const ch = value.charCodeAt(i);
        if (ch === 46) { // '.'
            // trailing dot is valid e.g. "example.com." but not "."
            if (i === value.length - 1 && start < i)
                break;
            const len = i - start;
            if (len === 0 || len > 63 || value.charCodeAt(start) === 45 || prev === 45)
                return false;
            start = i + 1;
        }
        else if (!((ch >= 97 && ch <= 122) || // a-z
            (ch >= 65 && ch <= 90) || // A-Z
            (ch >= 48 && ch <= 57) || // 0-9
            ch === 45 // '-'
        )) {
            return false;
        }
        prev = ch;
    }
    const length = value.length - start;
    const first = value.charCodeAt(start);
    const last = value.charCodeAt(value.length - 1);
    return length > 0 && length <= 63 && first !== 45 && last !== 45;
}
