"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEmailCss = useEmailCss;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const data_1 = require("@wordpress/data");
const editor_1 = require("@wordpress/editor");
const deepmerge_1 = __importDefault(require("deepmerge"));
/**
 * Internal dependencies
 */
const store_1 = require("../store");
const use_user_theme_1 = require("./use-user-theme");
const private_apis_1 = require("../private-apis");
const style_variables_1 = require("../style-variables");
// Empty array to avoid re-rendering the component when the array is empty
const EMPTY_ARRAY = [];
function useEmailCss() {
    const { userTheme } = (0, use_user_theme_1.useUserTheme)();
    const { editorTheme, layout, deviceType, editorSettingsStyles } = (0, data_1.useSelect)((select) => {
        const { getEditorSettings, 
        // @ts-expect-error getDeviceType is not in types.
        getDeviceType, } = select(editor_1.store);
        const editorSettings = getEditorSettings();
        return {
            editorTheme: select(store_1.storeName).getTheme(),
            // @ts-expect-error There are no types for the experimental features settings.
            // eslint-disable-next-line no-underscore-dangle
            layout: editorSettings.__experimentalFeatures?.layout,
            deviceType: getDeviceType(),
            editorSettingsStyles: editorSettings.styles,
        };
    }, []);
    const mergedConfig = (0, element_1.useMemo)(() => deepmerge_1.default.all([
        {},
        editorTheme || {},
        userTheme || {},
    ]), [editorTheme, userTheme]);
    const [styles] = (0, private_apis_1.useGlobalStylesOutputWithConfig)(mergedConfig);
    let rootContainerStyles = '';
    if (layout && deviceType !== 'Mobile') {
        rootContainerStyles = `display:flow-root; width:${layout?.contentSize}; margin: 0 auto;box-sizing: border-box;`;
    }
    const padding = mergedConfig.styles?.spacing?.padding;
    if (padding) {
        rootContainerStyles += `padding-left:${(0, style_variables_1.unwrapCompressedPresetStyleVariable)(padding.left)};`;
        rootContainerStyles += `padding-right:${(0, style_variables_1.unwrapCompressedPresetStyleVariable)(padding.right)};`;
    }
    const finalStyles = (0, element_1.useMemo)(() => {
        return [
            ...(styles ?? []),
            {
                css: `.is-root-container{ ${rootContainerStyles} }`,
            },
            ...(editorSettingsStyles ?? []),
        ];
    }, [styles, editorSettingsStyles, rootContainerStyles]);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return [finalStyles || EMPTY_ARRAY];
}
