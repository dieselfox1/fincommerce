"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_CONTROLS = void 0;
exports.TypographyElementPanel = TypographyElementPanel;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
// eslint-disable-next-line
const block_editor_1 = require("@wordpress/block-editor");
/**
 * Internal dependencies
 */
const hooks_1 = require("../../../hooks");
const utils_1 = require("../utils");
const events_1 = require("../../../events");
exports.DEFAULT_CONTROLS = {
    fontFamily: true,
    fontSize: true,
    fontAppearance: true,
    lineHeight: true,
    letterSpacing: false,
    textTransform: false,
    textDecoration: false,
    writingMode: true,
    textColumns: true,
};
function TypographyElementPanel({ element, headingLevel, defaultControls = exports.DEFAULT_CONTROLS, }) {
    const [fontSizes, blockLevelFontFamilies] = (0, block_editor_1.useSettings)('typography.fontSizes', 'typography.fontFamilies');
    // Ref: https://github.com/WordPress/gutenberg/issues/59778
    const fontFamilies = blockLevelFontFamilies?.default || [];
    const { styles, defaultStyles, updateStyleProp } = (0, hooks_1.useEmailStyles)();
    const elementStyles = (0, utils_1.getElementStyles)(styles, element, headingLevel);
    const defaultElementStyles = (0, utils_1.getElementStyles)(defaultStyles, element, headingLevel);
    const { fontFamily, fontSize, fontStyle, fontWeight, lineHeight, letterSpacing, textDecoration, textTransform, } = elementStyles.typography;
    const { fontFamily: defaultFontFamily, fontSize: defaultFontSize, fontStyle: defaultFontStyle, fontWeight: defaultFontWeight, lineHeight: defaultLineHeight, letterSpacing: defaultLetterSpacing, textDecoration: defaultTextDecoration, textTransform: defaultTextTransform, } = defaultElementStyles.typography;
    const hasFontFamily = () => fontFamily !== defaultFontFamily;
    const hasFontSize = () => fontSize !== defaultFontSize;
    const hasFontAppearance = () => fontWeight !== defaultFontWeight || fontStyle !== defaultFontStyle;
    const hasLineHeight = () => lineHeight !== defaultLineHeight;
    const hasLetterSpacing = () => letterSpacing !== defaultLetterSpacing;
    const hasTextDecoration = () => textDecoration !== defaultTextDecoration;
    const hasTextTransform = () => textTransform !== defaultTextTransform;
    const showToolFontSize = element !== 'heading' || headingLevel !== 'heading';
    const updateElementStyleProp = (0, element_1.useCallback)((path, newValue) => {
        if (element === 'heading') {
            updateStyleProp(['elements', headingLevel, ...path], newValue);
        }
        else if (element === 'text') {
            updateStyleProp([...path], newValue);
        }
        else {
            updateStyleProp(['elements', element, ...path], newValue);
        }
    }, [element, updateStyleProp, headingLevel]);
    const setLetterSpacing = (newValue) => {
        updateElementStyleProp(['typography', 'letterSpacing'], newValue);
        (0, events_1.debouncedRecordEvent)('styles_sidebar_screen_typography_element_panel_set_letter_spacing', {
            element,
            newValue,
            selectedDefaultLetterSpacing: newValue === defaultLetterSpacing,
        });
    };
    const setLineHeight = (newValue) => {
        updateElementStyleProp(['typography', 'lineHeight'], newValue);
        (0, events_1.debouncedRecordEvent)('styles_sidebar_screen_typography_element_panel_set_line_height', {
            element,
            newValue,
            selectedDefaultLineHeight: newValue === defaultLineHeight,
        });
    };
    const setFontSize = (newValue) => {
        updateElementStyleProp(['typography', 'fontSize'], newValue);
        (0, events_1.debouncedRecordEvent)('styles_sidebar_screen_typography_element_panel_set_font_size', {
            element,
            headingLevel,
            newValue,
            selectedDefaultFontSize: newValue === defaultFontSize,
        });
    };
    const setFontFamily = (newValue) => {
        updateElementStyleProp(['typography', 'fontFamily'], newValue);
        (0, events_1.debouncedRecordEvent)('styles_sidebar_screen_typography_element_panel_set_font_family', {
            element,
            newValue,
            selectedDefaultFontFamily: newValue === defaultFontFamily,
        });
    };
    const setTextDecoration = (newValue) => {
        updateElementStyleProp(['typography', 'textDecoration'], newValue);
        (0, events_1.debouncedRecordEvent)('styles_sidebar_screen_typography_element_panel_set_text_decoration', {
            element,
            newValue,
            selectedDefaultTextDecoration: newValue === defaultTextDecoration,
        });
    };
    const setTextTransform = (newValue) => {
        updateElementStyleProp(['typography', 'textTransform'], newValue);
        (0, events_1.debouncedRecordEvent)('styles_sidebar_screen_typography_element_panel_set_text_transform', {
            element,
            newValue,
            selectedDefaultTextTransform: newValue === defaultTextTransform,
        });
    };
    const setFontAppearance = ({ fontStyle: newFontStyle, fontWeight: newFontWeight, }) => {
        updateElementStyleProp(['typography', 'fontStyle'], newFontStyle);
        updateElementStyleProp(['typography', 'fontWeight'], newFontWeight);
        (0, events_1.debouncedRecordEvent)('styles_sidebar_screen_typography_element_panel_set_font_appearance', {
            element,
            newFontStyle,
            newFontWeight,
            selectedDefaultFontStyle: newFontStyle === defaultFontStyle,
            selectedDefaultFontWeight: newFontWeight === defaultFontWeight,
        });
    };
    const resetAll = () => {
        updateElementStyleProp(['typography'], {});
        (0, events_1.recordEvent)('styles_sidebar_screen_typography_element_panel_reset_all_styles_selected', {
            element,
            headingLevel,
        });
    };
    return ((0, jsx_runtime_1.jsxs)(components_1.__experimentalToolsPanel, { label: (0, i18n_1.__)('Typography', 'fincommerce'), resetAll: resetAll, children: [(0, jsx_runtime_1.jsx)(components_1.__experimentalToolsPanelItem, { label: (0, i18n_1.__)('Font family', 'fincommerce'), hasValue: hasFontFamily, onDeselect: () => setFontFamily(undefined), isShownByDefault: defaultControls.fontFamily, children: (0, jsx_runtime_1.jsx)(block_editor_1.__experimentalFontFamilyControl, { value: fontFamily, onChange: setFontFamily, size: "__unstable-large", fontFamilies: fontFamilies, __nextHasNoMarginBottom: true }) }), showToolFontSize && ((0, jsx_runtime_1.jsx)(components_1.__experimentalToolsPanelItem, { label: (0, i18n_1.__)('Font size', 'fincommerce'), hasValue: hasFontSize, onDeselect: () => setFontSize(undefined), isShownByDefault: defaultControls.fontSize, children: (0, jsx_runtime_1.jsx)(components_1.FontSizePicker, { value: fontSize, onChange: setFontSize, fontSizes: fontSizes, disableCustomFontSizes: false, withReset: false, withSlider: true, size: "__unstable-large", __nextHasNoMarginBottom: true }) })), (0, jsx_runtime_1.jsx)(components_1.__experimentalToolsPanelItem, { className: "single-column", label: (0, i18n_1.__)('Appearance', 'fincommerce'), hasValue: hasFontAppearance, onDeselect: () => {
                    setFontAppearance({
                        fontStyle: undefined,
                        fontWeight: undefined,
                    });
                }, isShownByDefault: defaultControls.fontAppearance, children: (0, jsx_runtime_1.jsx)(block_editor_1.__experimentalFontAppearanceControl, { value: {
                        fontStyle,
                        fontWeight,
                    }, onChange: setFontAppearance, hasFontStyles: true, hasFontWeights: true, size: "__unstable-large" }) }), (0, jsx_runtime_1.jsx)(components_1.__experimentalToolsPanelItem, { className: "single-column", label: (0, i18n_1.__)('Line height', 'fincommerce'), hasValue: hasLineHeight, onDeselect: () => setLineHeight(undefined), isShownByDefault: defaultControls.lineHeight, children: (0, jsx_runtime_1.jsx)(block_editor_1.LineHeightControl, { __nextHasNoMarginBottom: true, __unstableInputWidth: "auto", value: lineHeight, onChange: setLineHeight, size: "__unstable-large" }) }), (0, jsx_runtime_1.jsx)(components_1.__experimentalToolsPanelItem, { className: "single-column", label: (0, i18n_1.__)('Letter spacing', 'fincommerce'), hasValue: hasLetterSpacing, onDeselect: () => setLetterSpacing(undefined), isShownByDefault: defaultControls.letterSpacing, children: (0, jsx_runtime_1.jsx)(block_editor_1.__experimentalLetterSpacingControl, { value: letterSpacing, onChange: setLetterSpacing, size: "__unstable-large", __unstableInputWidth: "auto" }) }), (0, jsx_runtime_1.jsx)(components_1.__experimentalToolsPanelItem, { className: "single-column", label: (0, i18n_1.__)('Text decoration', 'fincommerce'), hasValue: hasTextDecoration, onDeselect: () => setTextDecoration(undefined), isShownByDefault: defaultControls.textDecoration, children: (0, jsx_runtime_1.jsx)(block_editor_1.__experimentalTextDecorationControl, { value: textDecoration, onChange: setTextDecoration, size: "__unstable-large", __unstableInputWidth: "auto" }) }), (0, jsx_runtime_1.jsx)(components_1.__experimentalToolsPanelItem, { label: (0, i18n_1.__)('Letter case', 'fincommerce'), hasValue: hasTextTransform, onDeselect: () => setTextTransform(defaultTextTransform), isShownByDefault: defaultControls.textTransform, children: (0, jsx_runtime_1.jsx)(block_editor_1.__experimentalTextTransformControl, { value: textTransform, onChange: setTextTransform, showNone: true, isBlock: true, size: "__unstable-large", __nextHasNoMarginBottom: true }) })] }));
}
exports.default = TypographyElementPanel;
