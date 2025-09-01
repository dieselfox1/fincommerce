"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withNavigationHydration = void 0;
/**
 * External dependencies
 */
const compose_1 = require("@wordpress/compose");
const data_1 = require("@wordpress/data");
const element_1 = require("@wordpress/element");
const deprecated_1 = __importDefault(require("@wordpress/deprecated"));
/**
 * Internal dependencies
 */
const constants_1 = require("./constants");
/**
 * Higher-order component used to hydrate navigation data.
 *
 * @param {Object}     data           Data object with menu items and site information.
 * @param {MenuItem[]} data.menuItems Menu items to hydrate.
 */
const withNavigationHydration = (data) => (0, compose_1.createHigherOrderComponent)((OriginalComponent) => (props) => {
    (0, deprecated_1.default)('withNavigationHydration', {});
    const shouldHydrate = (0, data_1.useSelect)((select) => {
        if (!data) {
            return;
        }
        const { isResolving, hasFinishedResolution } = select(constants_1.STORE_NAME);
        return (!isResolving('getMenuItems') &&
            !hasFinishedResolution('getMenuItems'));
    }, []);
    const { startResolution, finishResolution, setMenuItems } = (0, data_1.useDispatch)(constants_1.STORE_NAME);
    (0, element_1.useEffect)(() => {
        if (!shouldHydrate) {
            return;
        }
        startResolution('getMenuItems', []);
        setMenuItems(data.menuItems);
        finishResolution('getMenuItems', []);
    }, [shouldHydrate]);
    return (0, element_1.createElement)(OriginalComponent, { ...props });
}, 'withNavigationHydration');
exports.withNavigationHydration = withNavigationHydration;
