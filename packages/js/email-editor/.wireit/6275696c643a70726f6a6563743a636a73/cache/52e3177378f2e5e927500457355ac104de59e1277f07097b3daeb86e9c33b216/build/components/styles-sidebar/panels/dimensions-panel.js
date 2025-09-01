"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DimensionsPanel = DimensionsPanel;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const lodash_1 = require("lodash");
const block_editor_1 = require("@wordpress/block-editor");
// eslint-disable-next-line
const components_1 = require("@wordpress/components");
/**
 * Internal dependencies
 */
const hooks_1 = require("../../../hooks");
const events_1 = require("../../../events");
function DimensionsPanel() {
    const [availableUnits] = (0, block_editor_1.useSettings)('spacing.units');
    const units = (0, components_1.__experimentalUseCustomUnits)({
        availableUnits,
    });
    const { styles, defaultStyles, updateStyleProp } = (0, hooks_1.useEmailStyles)();
    return ((0, jsx_runtime_1.jsxs)(components_1.__experimentalToolsPanel, { label: (0, i18n_1.__)('Dimensions', 'fincommerce'), resetAll: () => {
            updateStyleProp(['spacing'], defaultStyles.spacing);
            (0, events_1.recordEvent)('styles_sidebar_screen_layout_dimensions_reset_all_selected');
        }, children: [(0, jsx_runtime_1.jsx)(components_1.__experimentalToolsPanelItem, { isShownByDefault: true, hasValue: () => !(0, lodash_1.isEqual)(styles.spacing.padding, defaultStyles.spacing.padding), label: (0, i18n_1.__)('Padding', 'fincommerce'), onDeselect: () => {
                    updateStyleProp(['spacing', 'padding'], defaultStyles.spacing.padding);
                    (0, events_1.recordEvent)('styles_sidebar_screen_layout_dimensions_padding_reset_clicked');
                }, className: "tools-panel-item-spacing", children: (0, jsx_runtime_1.jsx)(block_editor_1.__experimentalSpacingSizesControl, { allowReset: true, values: styles.spacing.padding, onChange: (value) => {
                        updateStyleProp(['spacing', 'padding'], value);
                        (0, events_1.debouncedRecordEvent)('styles_sidebar_screen_layout_dimensions_padding_updated', { value });
                    }, label: (0, i18n_1.__)('Padding', 'fincommerce'), sides: [
                        'horizontal',
                        'vertical',
                        'top',
                        'left',
                        'right',
                        'bottom',
                    ], units: units }) }), (0, jsx_runtime_1.jsx)(components_1.__experimentalToolsPanelItem, { isShownByDefault: true, label: (0, i18n_1.__)('Block spacing', 'fincommerce'), hasValue: () => styles.spacing.blockGap !== defaultStyles.spacing.blockGap, onDeselect: () => {
                    updateStyleProp(['spacing', 'blockGap'], defaultStyles.spacing.blockGap);
                    (0, events_1.recordEvent)('styles_sidebar_screen_layout_dimensions_block_spacing_reset_clicked');
                }, className: "tools-panel-item-spacing", children: (0, jsx_runtime_1.jsx)(block_editor_1.__experimentalSpacingSizesControl, { label: (0, i18n_1.__)('Block spacing', 'fincommerce'), min: 0, onChange: (value) => {
                        updateStyleProp(['spacing', 'blockGap'], value.top);
                        (0, events_1.debouncedRecordEvent)('styles_sidebar_screen_layout_dimensions_block_spacing_updated', { value });
                    }, showSideInLabel: false, sides: ['top'], values: { top: styles.spacing.blockGap }, allowReset: true }) })] }));
}
