"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEmailStyles = void 0;
exports.setImmutably = setImmutably;
/**
 * External dependencies
 */
const deepmerge_1 = __importDefault(require("deepmerge"));
const data_1 = require("@wordpress/data");
const element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
const store_1 = require("../store");
const use_user_theme_1 = require("./use-user-theme");
// Shared reference to an empty object for cases where it is important to avoid
// returning a new object reference on every invocation
const EMPTY_OBJECT = {};
/**
 * Check if a nested object is empty.
 *
 * @param {Object} obj The object to check.
 * @return {boolean} True if the nested object is empty, false otherwise.
 */
function isNestedEmpty(obj) {
    const isNotEmpty = Object.keys(obj).some((key) => Object.keys(obj[key]).length > 0);
    return !isNotEmpty;
}
/**
 * Immutably sets a value inside an object. Like `lodash#set`, but returning a
 * new object. Treats nullish initial values as empty objects. Clones any
 * nested objects. Supports arrays, too.
 *
 * @param                       setObject
 * @param {number|string|Array} setPath   Path in the object to modify.
 * @param {*}                   value     New value to set.
 * @return {Object} Cloned object with the new value set.
 */
function setImmutably(setObject, setPath, value) {
    // Normalize path
    const path = Array.isArray(setPath) ? [...setPath] : [setPath];
    // Shallowly clone the base of the object
    const object = Array.isArray(setObject)
        ? [...setObject]
        : { ...setObject };
    const leaf = path.pop();
    // Traverse object from root to leaf, shallowly cloning at each level
    let prev = object;
    path.forEach((key) => {
        const lvl = prev[key];
        prev[key] = Array.isArray(lvl) ? [...lvl] : { ...lvl };
        prev = prev[key];
    });
    prev[leaf] = value;
    return object;
}
/**
 * Shorten the variable names in the styles object. Some components need the h
 * Transforms variables like var(--wp--preset--spacing--10) to var:preset|spacing|10
 *
 * @param {Object} obj The object to shorten the variable names in.
 * @return {Object} The object with the shortened variable names.
 */
function shortenWpPresetVariables(obj) {
    // Helper function to replace the variable string
    const replaceVariable = (value) => {
        return value.replace(/var\(--([a-z]+)--([a-z]+(?:--[a-z0-9]+(?:-[a-z0-9]+)*)*)--([a-z0-9-]+)\)/g, (_match, _prefix, group1, group2) => {
            const groups = group1.split('--').concat(group2);
            return `var:${groups.join('|')}`;
        });
    };
    // Recursive function to traverse the object
    const traverse = (current) => {
        if (typeof current === 'object' && current !== null) {
            for (const key in current) {
                if (current.hasOwnProperty(key)) {
                    current[key] = traverse(current[key]);
                }
            }
        }
        else if (typeof current === 'string') {
            return replaceVariable(current);
        }
        return current;
    };
    return traverse(obj);
}
/**
 * Remove empty arrays and keys with undefined values from an object.
 * Empty values causes issues with deepmerge, because it can overwrite default value we provide in base email theme.
 *
 * @param {Object} obj The object to clean.
 * @return {Object} The cleaned object.
 */
function cleanupUserStyles(obj) {
    const cleanObject = (current) => {
        if ((typeof current === 'object' && current !== null) ||
            current === undefined) {
            if (Array.isArray(current) && current.length === 0) {
                return undefined; // Remove empty arrays
            }
            for (const key in current) {
                if (current.hasOwnProperty(key)) {
                    const cleanedValue = cleanObject(current[key]);
                    if (cleanedValue === undefined ||
                        isNestedEmpty(cleanedValue)) {
                        delete current[key]; // Remove keys with undefined values
                    }
                    else {
                        current[key] = cleanedValue;
                    }
                }
            }
        }
        return current;
    };
    return cleanObject(obj);
}
const useEmailStyles = () => {
    // const { templateTheme, updateTemplateTheme } = useEmailTheme();
    const { userTheme, updateUserTheme } = (0, use_user_theme_1.useUserTheme)();
    // This is email level styling stored in post meta.
    const styles = (0, element_1.useMemo)(() => {
        return userTheme
            ? cleanupUserStyles(shortenWpPresetVariables(userTheme?.styles))
            : EMPTY_OBJECT;
    }, [userTheme]);
    // Default styles from theme.json.
    const { styles: defaultStyles } = (0, data_1.useSelect)((select) => ({
        styles: select(store_1.storeName).getStyles(),
    }));
    // Update email styles.
    const updateStyles = (0, element_1.useCallback)((newStyles) => {
        const newTheme = {
            ...userTheme,
            styles: cleanupUserStyles(newStyles),
        };
        updateUserTheme(newTheme);
    }, [updateUserTheme, userTheme]);
    // Update an email style prop.
    const updateStyleProp = (0, element_1.useCallback)((path, newValue) => {
        const newTheme = setImmutably(userTheme, ['styles', ...path], newValue);
        updateUserTheme(newTheme);
    }, [updateUserTheme, userTheme]);
    const mergedStyles = (0, element_1.useMemo)(() => {
        if (!defaultStyles) {
            return EMPTY_OBJECT;
        }
        if (!styles) {
            return defaultStyles;
        }
        return deepmerge_1.default.all([defaultStyles, styles]);
    }, [defaultStyles, styles]);
    return {
        styles: mergedStyles,
        userStyles: userTheme?.styles, // Styles defined by user
        defaultStyles, // Default styles from editors theme.json
        updateStyleProp,
        updateStyles,
    };
};
exports.useEmailStyles = useEmailStyles;
