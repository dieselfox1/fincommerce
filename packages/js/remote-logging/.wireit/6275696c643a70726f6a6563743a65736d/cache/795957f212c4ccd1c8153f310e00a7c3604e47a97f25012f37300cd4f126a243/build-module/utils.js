/**
 * Deeply merges two LogData objects.
 *
 * @param target - The target LogData object.
 * @param source - The source LogData object to merge into the target.
 * @return The merged LogData object.
 */
export function mergeLogData(target, source) {
    const result = { ...target };
    for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            const typedKey = key;
            if (typedKey === 'extra' || typedKey === 'properties') {
                result[typedKey] = {
                    ...target[typedKey],
                    ...source[typedKey],
                };
            }
            else if (typedKey === 'tags' &&
                Array.isArray(source[typedKey])) {
                result[typedKey] = [
                    ...(Array.isArray(target[typedKey])
                        ? target[typedKey]
                        : []),
                    ...source[typedKey],
                ];
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                result[typedKey] = source[typedKey];
            }
        }
    }
    return result;
}
export const isDevelopmentEnvironment = process.env.NODE_ENV === 'development';
