"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCustomFields = useCustomFields;
const core_data_1 = require("@wordpress/core-data");
const element_1 = require("@wordpress/element");
const utils_1 = require("./utils");
function useCustomFields() {
    const [metas, setMetas] = (0, core_data_1.useEntityProp)('postType', 'product', 'meta_data');
    const { customFields, otherMetas } = (0, element_1.useMemo)(function extractCustomFieldsFromMetas() {
        return metas.reduce((utils_1.disjoinMetas), {
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
