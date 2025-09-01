"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomFieldNameControl = void 0;
const api_fetch_1 = __importDefault(require("@wordpress/api-fetch"));
const compose_1 = require("@wordpress/compose");
const element_1 = require("@wordpress/element");
const url_1 = require("@wordpress/url");
/**
 * Internal dependencies
 */
const combobox_control_1 = require("../../combobox-control");
/**
 * Since the Combobox does not support an arbitrary value, the
 * way to make it behave as an autocomplete, is by converting
 * the arbitrary value into an option so it can be selected as
 * a valid value
 *
 * @param search The search criteria.
 * @return The list of filtered custom field names as a Promise.
 */
async function searchCustomFieldNames(search) {
    return (0, api_fetch_1.default)({
        path: (0, url_1.addQueryArgs)('/wc/v3/products/custom-fields/names', {
            search,
        }),
    }).then((customFieldNames = []) => {
        const options = [];
        if (search && customFieldNames.indexOf(search) === -1) {
            options.push({ value: search, label: search });
        }
        customFieldNames.forEach((customFieldName) => {
            options.push({
                value: customFieldName,
                label: customFieldName,
            });
        });
        return options;
    });
}
exports.CustomFieldNameControl = (0, element_1.forwardRef)(function ForwardedCustomFieldNameControl({ value, onBlur, ...props }, ref) {
    const [customFieldNames, setCustomFieldNames] = (0, element_1.useState)([]);
    const options = (0, element_1.useMemo)(
    /**
     * Prepend the selected value as an option to let
     * the Combobox know which option is the selected
     * one even when an async request is being performed
     *
     * @return The combobox options.
     */
    function prependSelectedValueAsOption() {
        if (value) {
            const isExisting = customFieldNames.some((customFieldName) => customFieldName.value === value);
            if (!isExisting) {
                return [{ label: value, value }, ...customFieldNames];
            }
        }
        return customFieldNames;
    }, [customFieldNames, value]);
    const handleFilterValueChange = (0, compose_1.useDebounce)((0, element_1.useCallback)(function onFilterValueChange(search) {
        searchCustomFieldNames(search === '' ? value : search).then(setCustomFieldNames);
    }, [value]), 250);
    function handleBlur(event) {
        setCustomFieldNames([]);
        onBlur?.(event);
    }
    return ((0, element_1.createElement)(combobox_control_1.ComboboxControl, { ...props, ref: ref, value: value, options: options, onFilterValueChange: handleFilterValueChange, onBlur: handleBlur }));
});
