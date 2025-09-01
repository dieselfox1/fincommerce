"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Preview = Preview;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const data_1 = require("@wordpress/data");
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
/**
 * Internal dependencies
 */
const store_1 = require("../../../store");
const hooks_1 = require("../../../hooks");
const style_variables_1 = require("../../../style-variables");
const EMPTY_ARRAY = [];
const firstFrame = {
    start: {
        scale: 1,
        opacity: 1,
    },
    hover: {
        scale: 0,
        opacity: 0,
    },
};
const midFrame = {
    hover: {
        opacity: 1,
    },
    start: {
        opacity: 0.5,
    },
};
const secondFrame = {
    hover: {
        scale: 1,
        opacity: 1,
    },
    start: {
        scale: 0,
        opacity: 0,
    },
};
const normalizedHeight = 152;
const normalizedColorSwatchSize = 32;
/**
 * Component to render the styles preview based on the component from the site editor:
 * https://github.com/WordPress/gutenberg/blob/5c7c4e7751df5e05fc70a354cd0d81414ac9c7e7/packages/edit-site/src/components/global-styles/preview-styles.js
 *
 * @param root0
 * @param root0.label
 * @param root0.isFocused
 * @param root0.withHoverView
 */
function Preview({ label, isFocused, withHoverView, }) {
    const { colors } = (0, data_1.useSelect)((select) => ({
        colors: select(store_1.storeName).getPaletteColors(),
    }), []);
    const paletteColors = (0, element_1.useMemo)(() => (colors?.theme || EMPTY_ARRAY).concat(colors?.default || EMPTY_ARRAY), [colors]);
    const { styles } = (0, hooks_1.useEmailStyles)();
    const { backgroundColor, headingColor, highlightedColors } = (0, element_1.useMemo)(() => {
        const backgroundCol = (0, style_variables_1.getCompressedVariableValue)(styles?.color?.background) ||
            'white';
        const textCol = (0, style_variables_1.getCompressedVariableValue)(styles?.color?.text) || 'black';
        const headingCol = (0, style_variables_1.getCompressedVariableValue)(styles?.elements?.h1?.color?.text) || textCol;
        const linkColor = (0, style_variables_1.getCompressedVariableValue)(styles?.elements?.link?.color?.text) || headingCol;
        const buttonBackgroundCol = (0, style_variables_1.getCompressedVariableValue)(styles?.elements?.button?.color?.background) || linkColor;
        const textColorPaletteObj = paletteColors.find(({ color }) => color.toLowerCase() === textCol.toLowerCase());
        const buttonBackgroundColorPaletteObj = paletteColors.find(({ color }) => color.toLowerCase() === buttonBackgroundCol.toLowerCase());
        // We pick the colors for the highlighted colors the same way as the site editor
        // https://github.com/WordPress/gutenberg/blob/7b3850b6a39ce45948f09efe750451c6323a4613/packages/edit-site/src/components/global-styles/hooks.js#L83-L95
        const highlightedColorsObj = [
            ...(textColorPaletteObj
                ? [textColorPaletteObj]
                : EMPTY_ARRAY),
            ...(buttonBackgroundColorPaletteObj
                ? [buttonBackgroundColorPaletteObj]
                : EMPTY_ARRAY),
            ...paletteColors,
        ]
            .filter(({ color }, index, self) => color.toLowerCase() !== backgroundCol.toLowerCase() &&
            index ===
                self.findIndex((item) => item.color.toLowerCase() ===
                    color.toLowerCase() // remove duplicates
                ))
            .slice(0, 2);
        return {
            backgroundColor: backgroundCol,
            headingColor: headingCol,
            highlightedColors: highlightedColorsObj,
        };
    }, [styles, paletteColors]);
    const headingFontWeight = styles?.elements?.heading?.typography?.fontWeight || 'inherit';
    const headingFontFamily = styles?.elements?.heading?.typography?.fontFamily || 'inherit';
    const ratio = 1;
    // When is set label, the preview animates the hover state and displays the label
    const [isHovered, setIsHovered] = (0, element_1.useState)(false);
    return ((0, jsx_runtime_1.jsx)("div", { onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), children: (0, jsx_runtime_1.jsxs)(components_1.__unstableMotion.div, { style: {
                height: normalizedHeight * ratio,
                width: '100%',
                background: backgroundColor,
                cursor: withHoverView ? 'pointer' : undefined,
            }, initial: "start", animate: (isHovered || isFocused) && label ? 'hover' : 'start', children: [(0, jsx_runtime_1.jsx)(components_1.__unstableMotion.div, { variants: firstFrame, style: {
                        height: '100%',
                        overflow: 'hidden',
                    }, children: (0, jsx_runtime_1.jsxs)(components_1.__experimentalHStack, { spacing: 10 * ratio, justify: "center", style: {
                            height: '100%',
                            overflow: 'hidden',
                        }, children: [(0, jsx_runtime_1.jsx)(components_1.__unstableMotion.div, { style: {
                                    fontFamily: headingFontFamily,
                                    fontSize: 65 * ratio,
                                    color: headingColor,
                                    fontWeight: headingFontWeight,
                                }, animate: { scale: 1, opacity: 1 }, initial: { scale: 0.1, opacity: 0 }, transition: { delay: 0.3, type: 'tween' }, children: "Aa" }), (0, jsx_runtime_1.jsx)(components_1.__experimentalVStack, { spacing: 4 * ratio, children: highlightedColors.map(({ slug, color }, index) => ((0, jsx_runtime_1.jsx)(components_1.__unstableMotion.div, { style: {
                                        height: normalizedColorSwatchSize *
                                            ratio,
                                        width: normalizedColorSwatchSize *
                                            ratio,
                                        background: color,
                                        borderRadius: (normalizedColorSwatchSize *
                                            ratio) /
                                            2,
                                    }, animate: {
                                        scale: 1,
                                        opacity: 1,
                                    }, initial: {
                                        scale: 0.1,
                                        opacity: 0,
                                    }, transition: {
                                        delay: index === 1 ? 0.2 : 0.1,
                                    } }, slug))) })] }) }), (0, jsx_runtime_1.jsx)(components_1.__unstableMotion.div, { variants: withHoverView && midFrame, style: {
                        height: '100%',
                        width: '100%',
                        position: 'absolute',
                        top: 0,
                        overflow: 'hidden',
                        filter: 'blur(60px)',
                        opacity: 0.1,
                    }, children: (0, jsx_runtime_1.jsx)(components_1.__experimentalHStack, { spacing: 0, justify: "flex-start", style: {
                            height: '100%',
                            overflow: 'hidden',
                        }, children: paletteColors.slice(0, 4).map(({ color }) => ((0, jsx_runtime_1.jsx)("div", { style: {
                                height: '100%',
                                background: color,
                                flexGrow: 1,
                            } }, color))) }) }), (0, jsx_runtime_1.jsx)(components_1.__unstableMotion.div, { variants: secondFrame, style: {
                        height: '100%',
                        width: '100%',
                        overflow: 'hidden',
                        position: 'absolute',
                        top: 0,
                    }, children: (0, jsx_runtime_1.jsx)(components_1.__experimentalVStack, { spacing: 3 * ratio, justify: "center", style: {
                            height: '100%',
                            overflow: 'hidden',
                            padding: 10 * ratio,
                            boxSizing: 'border-box',
                        }, children: label && ((0, jsx_runtime_1.jsx)("div", { style: {
                                fontSize: 40 * ratio,
                                fontFamily: headingFontFamily,
                                color: headingColor,
                                fontWeight: headingFontWeight,
                                lineHeight: '1em',
                                textAlign: 'center',
                            }, children: label })) }) })] }) }));
}
