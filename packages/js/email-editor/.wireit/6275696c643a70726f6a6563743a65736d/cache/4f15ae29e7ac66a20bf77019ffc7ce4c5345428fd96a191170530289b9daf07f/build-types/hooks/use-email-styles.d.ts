/**
 * Internal dependencies
 */
import { EmailStyles } from '../store';
interface EmailStylesData {
    styles: EmailStyles;
    userStyles: EmailStyles;
    defaultStyles: EmailStyles;
    updateStyleProp: (path: any, newValue: any) => void;
    updateStyles: (newStyles: EmailStyles) => void;
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
export declare function setImmutably(setObject: any, setPath: any, value: any): typeof setObject;
export declare const useEmailStyles: () => EmailStylesData;
export {};
