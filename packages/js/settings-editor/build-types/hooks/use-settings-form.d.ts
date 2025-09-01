import type { Field, FormField } from '@wordpress/dataviews';
import type { DataFormItem } from '../types';
/**
 * Hook for managing settings form state and transformations.
 *
 * @param settings Array of settings to transform into form fields
 * @return Object containing form fields, layout, data and utility functions
 */
export declare function useSettingsForm(settings: SettingsField[]): {
    fields: Field<DataFormItem>[];
    form: {
        type: "regular";
        labelPosition: "top";
        fields: (string | FormField)[];
    };
    data: DataFormItem;
    updateField: (changedField: DataFormItem) => void;
    resetForm: () => void;
    isDirty: boolean;
};
//# sourceMappingURL=use-settings-form.d.ts.map