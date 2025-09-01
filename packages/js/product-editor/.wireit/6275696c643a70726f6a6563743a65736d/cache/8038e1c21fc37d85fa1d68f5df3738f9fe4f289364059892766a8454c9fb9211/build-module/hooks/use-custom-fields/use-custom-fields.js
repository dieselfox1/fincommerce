import { useEntityProp } from '@wordpress/core-data';
import { useMemo } from '@wordpress/element';
import { disjoinMetas } from './utils';
export function useCustomFields() {
    const [metas, setMetas] = useEntityProp('postType', 'product', 'meta_data');
    const { customFields, otherMetas } = useMemo(function extractCustomFieldsFromMetas() {
        return metas.reduce((disjoinMetas), {
            customFields: [],
            otherMetas: [],
        });
    }, [metas]);
    function setCustomFields(value) {
        const newValue = typeof value === 'function' ? value(customFields) : value;
        setMetas([...otherMetas, ...newValue]);
    }
    function addCustomFields(value) {
        setCustomFields((current) => [...current, ...value]);
    }
    function updateCustomField(customField, index) {
        setCustomFields((current) => current.map((field, fieldIndex) => {
            if (customField.id && field.id === customField.id) {
                return customField;
            }
            if (index === fieldIndex) {
                return customField;
            }
            return field;
        }));
    }
    function removeCustomField(customField) {
        setCustomFields((current) => {
            // If the id is undefined then it is a local copy.
            if (customField.id === undefined) {
                return current.filter(function isNotEquals(field) {
                    return !(field.key === customField.key &&
                        field.value === customField.value);
                });
            }
            return current.map((field) => {
                if (field.id === customField.id) {
                    return {
                        ...field,
                        value: null,
                    };
                }
                return field;
            });
        });
    }
    return {
        customFields,
        addCustomFields,
        setCustomFields,
        updateCustomField,
        removeCustomField,
    };
}
