"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterStores = void 0;
/**
 * External dependencies
 */
const data_1 = require("@wordpress/data");
const element_1 = require("@wordpress/element");
const interface_1 = require("@wordpress/interface");
const RegisterStores = () => {
    const registry = (0, data_1.useRegistry)();
    (0, element_1.useEffect)(() => {
        // @ts-expect-error No types for this exist yet.
        registry.register(interface_1.store);
    }, [registry]);
    return null;
};
exports.RegisterStores = RegisterStores;
