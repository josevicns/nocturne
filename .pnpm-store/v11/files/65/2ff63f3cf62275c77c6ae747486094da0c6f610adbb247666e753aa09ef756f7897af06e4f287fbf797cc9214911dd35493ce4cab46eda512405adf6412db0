import { IsIPv4Internal } from './ipv4.mjs';
/**
 * Returns true if the value is an Email
 * @specification Json Schema 2020-12
 */
export function IsEmail(value) {
    const dot = value.indexOf('.');
    const at = value.indexOf('@');
    const quoted = value[0] === '"' && value[at - 1] === '"';
    const ipLiteral = value[at + 1] === '[' && value[value.length - 1] === ']';
    const ipv6 = ipLiteral && value.indexOf(':', at) !== -1;
    const ipv4 = ipLiteral && !ipv6 && IsIPv4Internal(value, at + 2, value.length - 1);
    return (at > 0 && at < value.length - 1) &&
        !(
        // .test@example.com
        (!quoted && dot === 0) ||
            // te..st@example.com
            (!quoted && dot !== -1 && value.indexOf('.', dot + 1) === dot + 1) ||
            // test.@example.com
            (dot !== -1 && value.indexOf('@', dot) === dot + 1) ||
            // joe bloggs@example.com
            (!quoted && value.indexOf(' ') !== -1) ||
            // user1@oceania.org, user2@oceania.org
            (value.indexOf(',') !== -1) ||
            // joe.bloggs@[127.0.0.300]
            (ipLiteral && !ipv4 && !ipv6) ||
            // joe.bloggs@invalid=domain.com
            (value.indexOf('=', at) !== -1));
}
