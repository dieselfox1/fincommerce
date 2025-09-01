"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreenTypographyElement = ScreenTypographyElement;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
/**
 * Internal dependencies
 */
const typography_element_panel_1 = __importStar(require("../panels/typography-element-panel"));
const typography_preview_1 = __importDefault(require("../previews/typography-preview"));
const screen_header_1 = __importDefault(require("./screen-header"));
const events_1 = require("../../../events");
const PANELS = {
    text: {
        title: (0, i18n_1.__)('Text', 'fincommerce'),
        description: (0, i18n_1.__)('Manage the fonts and typography used on text.', 'fincommerce'),
        defaultControls: typography_element_panel_1.DEFAULT_CONTROLS,
    },
    link: {
        title: (0, i18n_1.__)('Links', 'fincommerce'),
        description: (0, i18n_1.__)('Manage the fonts and typography used on links.', 'fincommerce'),
        defaultControls: {
            ...typography_element_panel_1.DEFAULT_CONTROLS,
            textDecoration: true,
        },
    },
    heading: {
        title: (0, i18n_1.__)('Headings', 'fincommerce'),
        description: (0, i18n_1.__)('Manage the fonts and typography used on headings.', 'fincommerce'),
        defaultControls: {
            ...typography_element_panel_1.DEFAULT_CONTROLS,
            textTransform: true,
        },
    },
    button: {
        title: (0, i18n_1.__)('Buttons', 'fincommerce'),
        description: (0, i18n_1.__)('Manage the fonts and typography used on buttons.', 'fincommerce'),
        defaultControls: typography_element_panel_1.DEFAULT_CONTROLS,
    },
};
function ScreenTypographyElement({ element, }) {
    (0, events_1.recordEventOnce)('styles_sidebar_screen_typography_element_opened', {
        element,
    });
    const [headingLevel, setHeadingLevel] = (0, element_1.useState)('heading');
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(screen_header_1.default, { title: PANELS[element].title, description: PANELS[element].description }), (0, jsx_runtime_1.jsx)(components_1.__experimentalSpacer, { marginX: 4, children: (0, jsx_runtime_1.jsx)(typography_preview_1.default, { element: element, headingLevel: headingLevel }) }), element === 'heading' && ((0, jsx_runtime_1.jsx)(components_1.__experimentalSpacer, { marginX: 4, marginBottom: "1em", children: (0, jsx_runtime_1.jsxs)(components_1.__experimentalToggleGroupControl, { label: (0, i18n_1.__)('Select heading level', 'fincommerce'), hideLabelFromVision: true, value: headingLevel, onChange: (value) => {
                        setHeadingLevel(value.toString());
                        (0, events_1.recordEvent)('styles_sidebar_screen_typography_element_heading_level_selected', { value });
                    }, isBlock: true, size: "__unstable-large", __nextHasNoMarginBottom: true, children: [(0, jsx_runtime_1.jsx)(components_1.__experimentalToggleGroupControlOption, { value: "heading", label: (0, i18n_1._x)('All', 'heading levels', 'fincommerce') }), (0, jsx_runtime_1.jsx)(components_1.__experimentalToggleGroupControlOption, { value: "h1", label: (0, i18n_1._x)('H1', 'Heading Level', 'fincommerce') }), (0, jsx_runtime_1.jsx)(components_1.__experimentalToggleGroupControlOption, { value: "h2", label: (0, i18n_1._x)('H2', 'Heading Level', 'fincommerce') }), (0, jsx_runtime_1.jsx)(components_1.__experimentalToggleGroupControlOption, { value: "h3", label: (0, i18n_1._x)('H3', 'Heading Level', 'fincommerce') }), (0, jsx_runtime_1.jsx)(components_1.__experimentalToggleGroupControlOption, { value: "h4", label: (0, i18n_1._x)('H4', 'Heading Level', 'fincommerce') }), (0, jsx_runtime_1.jsx)(components_1.__experimentalToggleGroupControlOption, { value: "h5", label: (0, i18n_1._x)('H5', 'Heading Level', 'fincommerce') }), (0, jsx_runtime_1.jsx)(components_1.__experimentalToggleGroupControlOption, { value: "h6", label: (0, i18n_1._x)('H6', 'Heading Level', 'fincommerce') })] }) })), (0, jsx_runtime_1.jsx)(typography_element_panel_1.default, { element: element, headingLevel: headingLevel, defaultControls: PANELS[element].defaultControls })] }));
}
