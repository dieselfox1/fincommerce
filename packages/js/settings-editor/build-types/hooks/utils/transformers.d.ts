import type { Field, FormField } from '@wordpress/dataviews';
export type DataItem = Record<string, BaseSettingsField['value']>;
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
export declare const getLabelAndHelp: (setting: BaseSettingsField | CheckboxSettingsField) => {
    label: string;
    help: string;
};
/**
 * Transforms a single setting into initial form data.
 * For checkbox groups, it initializes each sub-setting with its value or 'no'.
 * For other fields, it uses the setting's value or an empty string.
 *
 * @param setting The setting to transform
 * @param acc     Accumulator object containing the form data
 * @return         Updated accumulator with the setting's initial data
 */
export declare const transformToInitialData: (setting: SettingsField, acc: DataItem) => DataItem;
/**
 * Transforms a FinCommerce setting into a DataViews Field configuration.
 * Handles various field types including groups, checkboxes, text inputs, and selects.
 *
 * @param setting The setting to transform
 * @return         A Field configuration or array of Field configurations
 */
export declare const transformToField: (setting: SettingsField) => Field<DataItem>[] | Field<DataItem>;
/**
 * Transforms a setting into a form layout field configuration.
 * Determines how the field should be structured in the form layout.
 *
 * @param setting The setting to transform
 * @return         FormField configuration, setting ID, or false if the field should be excluded
 */
export declare const transformToFormField: (setting: SettingsField) => FormField | string | false;
//# sourceMappingURL=transformers.d.ts.map