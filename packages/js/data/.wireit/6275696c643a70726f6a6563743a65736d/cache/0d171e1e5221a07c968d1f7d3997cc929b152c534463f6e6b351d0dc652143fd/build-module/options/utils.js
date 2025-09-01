// TODO: Propose @fincommerce/base-utils package to be shared between packages and use debounce from there.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = (func, wait, immediate) => {
    let timeout;
    let latestArgs = null;
    const debounced = ((...args) => {
        latestArgs = args;
        if (timeout)
            clearTimeout(timeout);
        timeout = setTimeout(() => {
            timeout = null;
            if (!immediate && latestArgs)
                func(...latestArgs);
        }, wait);
        if (immediate && !timeout)
            func(...args);
    });
    debounced.flush = () => {
        if (timeout && latestArgs) {
            func(...latestArgs);
            clearTimeout(timeout);
            timeout = null;
        }
    };
    return debounced;
};
