"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultArrowRender = exports.defaultItemRender = exports.defaultSelectedRender = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const icons_1 = require("@wordpress/icons");
const Flag = ({ alpha2, src }) => ((0, element_1.createElement)("img", { alt: `${alpha2} flag`, src: src, className: "wcpay-component-phone-number-input__flag" }));
const defaultSelectedRender = ({ alpha2, code, flag }) => ((0, element_1.createElement)(element_1.Fragment, null,
    (0, element_1.createElement)(Flag, { alpha2: alpha2, src: flag }),
    ` +${code}`));
exports.defaultSelectedRender = defaultSelectedRender;
const defaultItemRender = ({ alpha2, name, code, flag }) => ((0, element_1.createElement)(element_1.Fragment, null,
    (0, element_1.createElement)(Flag, { alpha2: alpha2, src: flag }),
    `${name} +${code}`));
exports.defaultItemRender = defaultItemRender;
const defaultArrowRender = () => ((0, element_1.createElement)(icons_1.Icon, { icon: icons_1.chevronDown, size: 18 }));
exports.defaultArrowRender = defaultArrowRender;
