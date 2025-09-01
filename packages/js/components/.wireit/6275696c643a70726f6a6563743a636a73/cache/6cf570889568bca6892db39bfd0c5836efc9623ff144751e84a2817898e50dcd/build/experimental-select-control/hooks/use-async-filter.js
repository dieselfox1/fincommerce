"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_DEBOUNCE_TIME = void 0;
exports.default = useAsyncFilter;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const compose_1 = require("@wordpress/compose");
const element_1 = require("@wordpress/element");
const suffix_icon_1 = require("../suffix-icon");
exports.DEFAULT_DEBOUNCE_TIME = 250;
function useAsyncFilter({ filter, onFilterStart, onFilterEnd, onFilterError, debounceTime, }) {
    const [isFetching, setIsFetching] = (0, element_1.useState)(false);
    const handleInputChange = (0, element_1.useCallback)(function handleInputChangeCallback(value) {
        if (typeof filter === 'function') {
            if (typeof onFilterStart === 'function')
                onFilterStart(value);
            setIsFetching(true);
            filter(value)
                .then((filteredItems) => {
                if (typeof onFilterEnd === 'function')
                    onFilterEnd(filteredItems, value);
            })
                .catch((error) => {
                if (typeof onFilterError === 'function')
                    onFilterError(error, value);
            })
                .finally(() => {
                setIsFetching(false);
            });
        }
    }, [filter, onFilterStart, onFilterEnd, onFilterError]);
    return {
        isFetching,
        suffix: isFetching === true ? ((0, element_1.createElement)(suffix_icon_1.SuffixIcon, { icon: (0, element_1.createElement)(components_1.Spinner, null) })) : undefined,
        getFilteredItems: (items) => items,
        onInputChange: (0, compose_1.useDebounce)(handleInputChange, typeof debounceTime === 'number'
            ? debounceTime
            : exports.DEFAULT_DEBOUNCE_TIME),
    };
}
