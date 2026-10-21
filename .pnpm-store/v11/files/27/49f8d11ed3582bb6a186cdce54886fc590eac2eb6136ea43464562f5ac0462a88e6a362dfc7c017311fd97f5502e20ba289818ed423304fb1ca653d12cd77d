const Duration = /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/;
/**
 * Returns true if the value is a Duration string
 * @source ajv-formats
 */
export function IsDuration(value) {
    return Duration.test(value);
}
