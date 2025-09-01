"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withOptionsHydration = exports.useOptionsHydration = void 0;
/**
 * External dependencies
 */
const compose_1 = require("@wordpress/compose");
const data_1 = require("@wordpress/data");
const element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
const _1 = require("./");
const useOptionsHydration = (data) => {
    const shouldHydrate = (0, data_1.useSelect)((select) => {
        const { isResolving, hasFinishedResolution } = select(_1.store);
        if (!data) {
            return {};
        }
        return Object.fromEntries(Object.keys(data).map((name) => {
            const hydrate = !isResolving('getOption', [name]) &&
                !hasFinishedResolution('getOption', [name]);
            return [name, hydrate];
        }));
    }, []);
    const { startResolution, finishResolution, receiveOptions } = (0, data_1.useDispatch)(_1.store);
    (0, element_1.useEffect)(() => {
        Object.entries(shouldHydrate).forEach(([name, hydrate]) => {
            if (hydrate) {
                startResolution('getOption', [name]);
                receiveOptions({ [name]: data[name] });
                finishResolution('getOption', [name]);
            }
        });
    }, [shouldHydrate]);
};
exports.useOptionsHydration = useOptionsHydration;
const withOptionsHydration = (data) => (0, compose_1.createHigherOrderComponent)((OriginalComponent) => (props) => {
    (0, exports.useOptionsHydration)(data);
    return (0, element_1.createElement)(OriginalComponent, { ...props });
}, 'withOptionsHydration');
exports.withOptionsHydration = withOptionsHydration;
