"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TypographyPreview;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * Internal dependencies
 */
const hooks_1 = require("../../../hooks");
const utils_1 = require("../utils");
function TypographyPreview({ element, headingLevel, }) {
    const { styles } = (0, hooks_1.useEmailStyles)();
    const elementStyles = (0, utils_1.getElementStyles)(styles, element, headingLevel, true);
    const { fontFamily, fontSize, fontStyle, fontWeight, lineHeight, letterSpacing, textDecoration, textTransform, } = elementStyles.typography;
    const textColor = elementStyles.color?.text || 'inherit';
    const background = elementStyles.color?.background || '#f0f0f0';
    const extraStyles = element === 'link'
        ? {
            textDecoration: textDecoration ?? 'underline',
        }
        : {};
    return ((0, jsx_runtime_1.jsx)("div", { className: "edit-site-typography-preview", style: {
            fontFamily: fontFamily ?? 'serif',
            background,
            color: textColor,
            lineHeight,
            fontSize,
            fontStyle,
            fontWeight,
            letterSpacing,
            textDecoration,
            textTransform,
            ...extraStyles,
        }, children: "Aa" }));
}
