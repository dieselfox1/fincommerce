"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const html_entities_1 = require("@wordpress/html-entities");
const prop_types_1 = __importDefault(require("prop-types"));
const clsx_1 = __importDefault(require("clsx"));
/**
 * A button useful for a launcher of a dropdown component. The button is 100% width of its container and displays
 * single or multiple lines rendered as `<span/>` elements.
 *
 * @param {Object} props Props passed to component.
 * @return {Object} -
 */
const DropdownButton = (props) => {
    const { labels, isOpen, ...otherProps } = props;
    const buttonClasses = (0, clsx_1.default)('fincommerce-dropdown-button', {
        'is-open': isOpen,
        'is-multi-line': labels.length > 1,
    });
    return ((0, element_1.createElement)(components_1.Button, { className: buttonClasses, "aria-expanded": isOpen, ...otherProps },
        (0, element_1.createElement)("div", { className: "fincommerce-dropdown-button__labels" }, labels.map((label, i) => ((0, element_1.createElement)("span", { key: i }, (0, html_entities_1.decodeEntities)(label)))))));
};
DropdownButton.propTypes = {
    /**
     * An array of elements to be rendered as the content of the button.
     */
    labels: prop_types_1.default.array.isRequired,
    /**
     * Boolean describing if the dropdown in open or not.
     */
    isOpen: prop_types_1.default.bool,
};
exports.default = DropdownButton;
