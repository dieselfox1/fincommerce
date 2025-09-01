/**
 * External dependencies
 */
import { useMemo, useCallback, useState } from '@wordpress/element';
/**
 * Internal dependencies
 */
import { transformToInitialData, transformToField, transformToFormField, } from './utils/transformers';
/**
 * Hook for managing settings form state and transformations.
 *
 * @param settings Array of settings to transform into form fields
 * @return Object containing form fields, layout, data and utility functions
 */
export function useSettingsForm(settings) {
    // Memoize initial data to avoid recalculation
    const initialData = useMemo(() => {
        return settings.reduce((acc, setting) => transformToInitialData(setting, acc), {});
    }, [settings]);
    // Track current form data
    const [formData, setFormData] = useState(initialData);
    // Memoize field configurations
    const fields = useMemo(() => {
        return settings.reduce((acc, setting) => {
            const field = transformToField(setting);
            return Array.isArray(field)
                ? [...acc, ...field]
                : [...acc, field];
        }, []);
    }, [settings]);
    // Memoize form layout
    const form = useMemo(() => ({
        type: 'regular',
        labelPosition: 'top',
        fields: settings
            .map(transformToFormField)
            .filter((field) => field !== false),
    }), [settings]);
    // Update a single field value
    const updateField = useCallback((changedField) => {
        setFormData((prevData) => ({
            ...prevData,
            ...changedField,
        }));
    }, []);
    // Reset form to initial values
    const resetForm = useCallback(() => {
        setFormData(initialData);
    }, [initialData]);
    // Check if form has unsaved changes
    const isDirty = useMemo(() => {
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
