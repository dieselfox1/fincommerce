"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Suffix = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
const icons_1 = require("@wordpress/icons");
const Suffix = ({ isLoading, isFocused, value, onRemove, }) => {
    if (isLoading) {
        return (0, element_1.createElement)(components_1.Spinner, null);
    }
    if (!isFocused && value) {
        return ((0, element_1.createElement)(components_1.Button, { icon: icons_1.close, onClick: onRemove, iconSize: 16, size: "compact" }));
    }
    return null;
};
exports.Suffix = Suffix;
