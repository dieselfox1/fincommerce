/**
 * External dependencies
 */
import { createElement, Fragment } from '@wordpress/element';
import { Icon, chevronDown } from '@wordpress/icons';
const Flag = ({ alpha2, src }) => (createElement("img", { alt: `${alpha2} flag`, src: src, className: "wcpay-component-phone-number-input__flag" }));
export const defaultSelectedRender = ({ alpha2, code, flag }) => (createElement(Fragment, null,
    createElement(Flag, { alpha2: alpha2, src: flag }),
    ` +${code}`));
export const defaultItemRender = ({ alpha2, name, code, flag }) => (createElement(Fragment, null,
    createElement(Flag, { alpha2: alpha2, src: flag }),
    `${name} +${code}`));
export const defaultArrowRender = () => (createElement(Icon, { icon: chevronDown, size: 18 }));
