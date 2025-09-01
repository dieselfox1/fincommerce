import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { isEqual } from 'lodash';
import { 
// We can remove the ts-expect-error comments once the types are available.
// @ts-expect-error TS7016: Could not find a declaration file for module '@wordpress/block-editor'.
__experimentalSpacingSizesControl as SpacingSizesControl, // eslint-disable-line
useSettings, } from '@wordpress/block-editor';
// eslint-disable-next-line
import { __experimentalToolsPanel as ToolsPanel, // eslint-disable-line
__experimentalToolsPanelItem as ToolsPanelItem, // eslint-disable-line
__experimentalUseCustomUnits as useCustomUnits, // eslint-disable-line
 } from '@wordpress/components';
/**
 * Internal dependencies
 */
import { useEmailStyles } from '../../../hooks';
import { recordEvent, debouncedRecordEvent } from '../../../events';
export function DimensionsPanel() {
    const [availableUnits] = useSettings('spacing.units');
    const units = useCustomUnits({
        availableUnits,
    });
    const { styles, defaultStyles, updateStyleProp } = useEmailStyles();
    return (_jsxs(ToolsPanel, { label: __('Dimensions', 'fincommerce'), resetAll: () => {
            updateStyleProp(['spacing'], defaultStyles.spacing);
            recordEvent('styles_sidebar_screen_layout_dimensions_reset_all_selected');
        }, children: [_jsx(ToolsPanelItem, { isShownByDefault: true, hasValue: () => !isEqual(styles.spacing.padding, defaultStyles.spacing.padding), label: __('Padding', 'fincommerce'), onDeselect: () => {
                    updateStyleProp(['spacing', 'padding'], defaultStyles.spacing.padding);
                    recordEvent('styles_sidebar_screen_layout_dimensions_padding_reset_clicked');
                }, className: "tools-panel-item-spacing", children: _jsx(SpacingSizesControl, { allowReset: true, values: styles.spacing.padding, onChange: (value) => {
                        updateStyleProp(['spacing', 'padding'], value);
                        debouncedRecordEvent('styles_sidebar_screen_layout_dimensions_padding_updated', { value });
                    }, label: __('Padding', 'fincommerce'), sides: [
                        'horizontal',
                        'vertical',
                        'top',
                        'left',
                        'right',
                        'bottom',
                    ], units: units }) }), _jsx(ToolsPanelItem, { isShownByDefault: true, label: __('Block spacing', 'fincommerce'), hasValue: () => styles.spacing.blockGap !== defaultStyles.spacing.blockGap, onDeselect: () => {
                    updateStyleProp(['spacing', 'blockGap'], defaultStyles.spacing.blockGap);
                    recordEvent('styles_sidebar_screen_layout_dimensions_block_spacing_reset_clicked');
                }, className: "tools-panel-item-spacing", children: _jsx(SpacingSizesControl, { label: __('Block spacing', 'fincommerce'), min: 0, onChange: (value) => {
                        updateStyleProp(['spacing', 'blockGap'], value.top);
                        debouncedRecordEvent('styles_sidebar_screen_layout_dimensions_block_spacing_updated', { value });
                    }, showSideInLabel: false, sides: ['top'], values: { top: styles.spacing.blockGap }, allowReset: true }) })] }));
}
