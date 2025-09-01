"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSettingsForm = useSettingsForm;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
const transformers_1 = require("./utils/transformers");
/**
 * Hook for managing settings form state and transformations.
 *
 * @param settings Array of settings to transform into form fields
 * @return Object containing form fields, layout, data and utility functions
 */
function useSettingsForm(settings) {
    // Memoize initial data to avoid recalculation
    const initialData = (0, element_1.useMemo)(() => {
        return settings.reduce((acc, setting) => (0, transformers_1.transformToInitialData)(setting, acc), {});
    }, [settings]);
    // Track current form data
    const [formData, setFormData] = (0, element_1.useState)(initialData);
    // Memoize field configurations
    const fields = (0, element_1.useMemo)(() => {
        return settings.reduce((acc, setting) => {
            const field = (0, transformers_1.transformToField)(setting);
            return Array.isArray(field)
                ? [...acc, ...field]
                : [...acc, field];
        }, []);
    }, [settings]);
    // Memoize form layout
    const form = (0, element_1.useMemo)(() => ({
        type: 'regular',
        labelPosition: 'top',
        fields: settings
            .map(transformers_1.transformToFormField)
            .filter((field) => field !== false),
    }), [settings]);
    // Update a single field value
    const updateField = (0, element_1.useCallback)((changedField) => {
        setFormData((prevData) => ({
            ...prevData,
            ...changedField,
        }));
    }, []);
    // Reset form to initial values
    const resetForm = (0, element_1.useCallback)(() => {
        setFormData(initialData);
    }, [initialData]);
    // Check if form has unsaved changes
    const isDirty = (0, element_1.useMemo)(() => {
        return Object.keys(formData).some((key) => formData[key] !== initialData[key]);
    }, [formData, initialData]);
    return {
        // Dataforms props
        fields,
        form,
        data: formData,
        // Utility methods
        updateField,
        resetForm,
        isDirty,
    };
}
