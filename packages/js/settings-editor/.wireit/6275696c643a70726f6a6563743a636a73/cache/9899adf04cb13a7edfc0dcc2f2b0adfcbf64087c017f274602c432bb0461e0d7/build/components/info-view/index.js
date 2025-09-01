"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoView = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const clsx_1 = __importDefault(require("clsx"));
/**
 * Internal dependencies
 */
const utils_1 = require("../../utils");
const InfoView = ({ text, className, css = '' }) => {
    const ref = (0, element_1.useRef)(null);
    (0, element_1.useEffect)(() => {
        if (ref.current) {
            ref.current.style.cssText = css;
        }
    }, [css]);
    return ((0, element_1.createElement)("div", { ref: ref, className: (0, clsx_1.default)('fincommerce-settings-info-view', className), dangerouslySetInnerHTML: {
            __html: (0, utils_1.sanitizeHTML)(text ?? ''),
        } }));
};
exports.InfoView = InfoView;
