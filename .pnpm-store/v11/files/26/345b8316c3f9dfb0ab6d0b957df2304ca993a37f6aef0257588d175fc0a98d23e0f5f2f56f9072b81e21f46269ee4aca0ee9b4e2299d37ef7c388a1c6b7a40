const UriReference = /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i;
/**
 * Returns true if the value is a uri reference
 * @specification
 * @source ajv-formats
 */
export function IsUriReference(value) {
    return UriReference.test(value);
}
