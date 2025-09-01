"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const clsx_1 = __importDefault(require("clsx"));
const prop_types_1 = __importDefault(require("prop-types"));
/**
 * Internal dependencies
 */
const ellipsis_menu_1 = __importDefault(require("../ellipsis-menu"));
const header_1 = require("../section/header");
const proptype_validator_1 = require("../lib/proptype-validator");
/**
 * A header component. The header can contain a title, actions via children, and an `EllipsisMenu` menu.
 */
class SectionHeader extends element_1.Component {
    render() {
        const { children, menu, title } = this.props;
        const className = (0, clsx_1.default)('fincommerce-section-header', this.props.className);
        return ((0, element_1.createElement)("div", { className: className },
            (0, element_1.createElement)(header_1.H, { className: "fincommerce-section-header__title fincommerce-section-header__header-item" }, title),
            (0, element_1.createElement)("hr", { role: "presentation" }),
            children && ((0, element_1.createElement)("div", { className: "fincommerce-section-header__actions fincommerce-section-header__header-item" }, children)),
            menu && ((0, element_1.createElement)("div", { className: "fincommerce-section-header__menu fincommerce-section-header__header-item" }, menu))));
    }
}
SectionHeader.propTypes = {
    /**
     * Additional CSS classes.
     */
    className: prop_types_1.default.string,
    /**
     * An `EllipsisMenu`, with filters used to control the content visible in this card
     */
    menu: (0, proptype_validator_1.validateComponent)(ellipsis_menu_1.default),
    /**
     * The title to use for this card.
     */
    title: prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.node])
        .isRequired,
};
exports.default = SectionHeader;
