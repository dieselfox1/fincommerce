"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const prop_types_1 = __importDefault(require("prop-types"));
const clsx_1 = __importDefault(require("clsx"));
/**
 * Spinner - An indeterminate circular progress indicator.
 */
class Spinner extends element_1.Component {
    render() {
        const { className } = this.props;
        const classes = (0, clsx_1.default)('fincommerce-spinner', className);
        return ((0, element_1.createElement)("svg", { className: classes, viewBox: "0 0 100 100", xmlns: "http://www.w3.org/2000/svg" },
            (0, element_1.createElement)("circle", { className: "fincommerce-spinner__circle", fill: "none", strokeWidth: "5", strokeLinecap: "round", cx: "50", cy: "50", r: "30" })));
    }
}
Spinner.propTypes = {
    /**
     * Additional class name to style the component.
     */
    className: prop_types_1.default.string,
};
exports.default = Spinner;
