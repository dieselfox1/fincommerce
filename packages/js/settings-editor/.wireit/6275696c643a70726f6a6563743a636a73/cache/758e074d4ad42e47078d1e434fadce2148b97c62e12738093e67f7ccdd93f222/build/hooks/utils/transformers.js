"use strict";
// Transform settings to DataForms accepted data
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformToFormField = exports.transformToField = exports.transformToInitialData = exports.getLabelAndHelp = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
const settings_group_1 = require("../../components/settings-group");
const custom_view_1 = require("../../components/custom-view");
const info_view_1 = require("../../components/info-view");
const checkbox_1 = require("../../form-controls/checkbox");
const input_1 = require("../../form-controls/input");
const textarea_1 = require("../../form-controls/textarea");
const color_1 = require("../../form-controls/color");
const select_1 = require("../../form-controls/select");
const radio_1 = require("../../form-controls/radio");
const single_select_page_1 = require("../../form-controls/single-select-page");
const single_select_page_with_search_1 = require("../../form-controls/single-select-page-with-search");
/**
 * Helper function to determine label and help text from setting.
 *
 * @param setting The setting object containing description and tip information
 * @return Object with label and help text
 *
 * Cases:
 * - desc_tip === true: description becomes help text, empty label
 * - desc_tip is string: string becomes help text, description becomes label
 * - desc_tip === false: empty help text, description becomes label
 * - desc_tip undefined: empty help text, description becomes label
 */
const getLabelAndHelp = (setting) => {
    const description = setting.desc || setting.description || '';
    if (setting.desc_tip === true) {
        return {
            label: '',
            help: description,
        };
    }
    return {
        label: description,
        help: typeof setting.desc_tip === 'string' ? setting.desc_tip : '',
    };
};
exports.getLabelAndHelp = getLabelAndHelp;
/**
 * Transforms a single setting into initial form data.
 * For checkbox groups, it initializes each sub-setting with its value or 'no'.
 * For other fields, it uses the setting's value or an empty string.
 *
 * @param setting The setting to transform
 * @param acc     Accumulator object containing the form data
 * @return         Updated accumulator with the setting's initial data
 */
const transformToInitialData = (setting, acc) => {
    switch (setting.type) {
        case 'checkboxgroup':
            if (setting.settings?.length) {
                setting.settings.forEach((subSetting) => {
                    acc[subSetting.id] =
                        subSetting.value === 'yes' ? 'yes' : 'no';
                });
            }
            break;
        default:
            acc[setting.id] = 'value' in setting ? setting.value : '';
    }
    return acc;
};
exports.transformToInitialData = transformToInitialData;
/**
 * Transforms a FinCommerce setting into a DataViews Field configuration.
 * Handles various field types including groups, checkboxes, text inputs, and selects.
 *
 * @param setting The setting to transform
 * @return         A Field configuration or array of Field configurations
 */
const transformToField = (setting) => {
    switch (setting.type) {
        case 'group':
            return {
                id: setting.id,
                label: '',
                Edit: () => (0, element_1.createElement)(settings_group_1.SettingsGroup, { ...setting }),
            };
        case 'checkboxgroup':
            return setting.settings?.map((subSetting) => {
                const { label, help } = (0, exports.getLabelAndHelp)(subSetting);
                return {
                    id: subSetting.id,
                    type: 'text',
                    label,
                    Edit: (props) => (0, element_1.createElement)(checkbox_1.Checkbox, { ...props, help: help }),
                };
            });
        case 'checkbox': {
            const { label, help } = (0, exports.getLabelAndHelp)(setting);
            return {
                id: setting.id,
                type: 'text',
                label,
                Edit: (props) => (0, element_1.createElement)(checkbox_1.Checkbox, { ...props, help: help }),
            };
        }
        case 'text':
        case 'password':
        case 'datetime':
        case 'datetime-local':
        case 'date':
        case 'month':
        case 'time':
        case 'week':
        case 'number':
        case 'email':
        case 'url':
        case 'tel': {
            const { label, help } = (0, exports.getLabelAndHelp)(setting);
            return {
                id: setting.id,
                type: 'text',
                label,
                placeholder: setting.placeholder,
                Edit: (props) => ((0, element_1.createElement)(input_1.Input, { ...props, type: setting.type, help: help })),
            };
        }
        case 'select': {
            const { label, help } = (0, exports.getLabelAndHelp)(setting);
            return {
                id: setting.id,
                type: 'text',
                label,
                elements: Object.entries(setting.options || {}).map(([value, _label]) => ({
                    label: _label,
                    value,
                })),
                Edit: (props) => (0, element_1.createElement)(select_1.Select, { ...props, help: help }),
            };
        }
        case 'single_select_page': {
            const { label, help } = (0, exports.getLabelAndHelp)(setting);
            return {
                id: setting.id,
                type: 'text',
                label,
                Edit: (props) => ((0, element_1.createElement)(single_select_page_1.SingleSelectPage, { ...props, help: help })),
            };
        }
        case 'single_select_page_with_search': {
            const { label, help } = (0, exports.getLabelAndHelp)(setting);
            return {
                id: setting.id,
                type: 'text',
                label,
                Edit: (props) => ((0, element_1.createElement)(single_select_page_with_search_1.SingleSelectPageWithSearch, { ...props, help: help, className: setting.class, exclude: setting.exclude })),
            };
        }
        case 'textarea': {
            const { label, help } = (0, exports.getLabelAndHelp)(setting);
            return {
                id: setting.id,
                type: 'text',
                placeholder: setting.placeholder,
                label,
                Edit: (props) => (0, element_1.createElement)(textarea_1.Textarea, { ...props, help: help }),
            };
        }
        case 'radio': {
            const { label, help } = (0, exports.getLabelAndHelp)(setting);
            return {
                id: setting.id,
                type: 'text',
                label,
                elements: Object.entries(setting.options || {}).map(([value, _label]) => ({
                    label: _label,
                    value,
                })),
                Edit: (props) => (0, element_1.createElement)(radio_1.Radio, { ...props, help: help }),
            };
        }
        case 'color':
            return {
                id: setting.id,
                type: 'text',
                label: setting.desc,
                Edit: color_1.Color,
            };
        case 'info':
            return {
                id: setting.id,
                type: 'text',
                label: setting.title,
                Edit: () => ((0, element_1.createElement)(info_view_1.InfoView, { text: setting.text, className: setting.row_class, css: setting.css })),
            };
        case 'custom':
            return {
                id: setting.id,
                type: 'text',
                Edit: () => (0, element_1.createElement)(custom_view_1.CustomView, { html: setting.content }),
            };
        case 'slotfill_placeholder':
            return {
                id: setting.id,
                type: 'text',
                Edit: () => ((0, element_1.createElement)("div", { id: setting.id, className: setting.class })),
            };
        case 'sectionend':
            return {
                id: setting.id,
                type: 'text',
                Edit: () => null,
            };
        default:
            return {
                id: setting.id,
                type: 'text',
                label: setting.desc,
                Edit: () => (0, element_1.createElement)("div", null,
                    "To be implemented: ",
                    setting.type),
            };
    }
};
exports.transformToField = transformToField;
/**
 * Transforms a setting into a form layout field configuration.
 * Determines how the field should be structured in the form layout.
 *
 * @param setting The setting to transform
 * @return         FormField configuration, setting ID, or false if the field should be excluded
 */
const transformToFormField = (setting) => {
    switch (setting.type) {
        case 'checkboxgroup':
            return {
                id: setting.id,
                label: setting.title,
                children: setting.settings?.map((subSetting) => subSetting.id),
            };
        case 'sectionend':
        case 'title':
            return false;
        case 'custom':
        case 'group':
        case 'slotfill_placeholder':
            return setting.id;
        default:
            return {
                id: setting.id,
                label: setting.title,
                children: [setting.id],
            };
    }
};
exports.transformToFormField = transformToFormField;
