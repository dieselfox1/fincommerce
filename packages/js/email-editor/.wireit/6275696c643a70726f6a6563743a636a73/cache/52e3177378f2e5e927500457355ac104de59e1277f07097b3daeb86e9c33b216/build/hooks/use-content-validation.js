"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useContentValidation = exports.validateEmailContent = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const data_1 = require("@wordpress/data");
const core_data_1 = require("@wordpress/core-data");
const hooks_1 = require("@wordpress/hooks");
/**
 * Internal dependencies
 */
const store_1 = require("../store");
const use_shallow_equal_1 = require("./use-shallow-equal");
const use_validation_notices_1 = require("./use-validation-notices");
// Shared reference to an empty array for cases where it is important to avoid
// returning a new array reference on every invocation
const EMPTY_ARRAY = [];
const validateEmailContent = (content, templateContent, { addValidationNotice, hasValidationNotice, removeValidationNotice, }) => {
    const rules = (0, hooks_1.applyFilters)('fincommerce_email_editor_content_validation_rules', EMPTY_ARRAY);
    let isValid = true;
    rules.forEach(({ id, testContent, message, actions }) => {
        // Check both content and template content for the rule.
        if (testContent(content + templateContent)) {
            addValidationNotice(id, message, actions);
            isValid = false;
        }
        else if (hasValidationNotice(id)) {
            removeValidationNotice(id);
        }
    });
    return isValid;
};
exports.validateEmailContent = validateEmailContent;
const useContentValidation = () => {
    const { addValidationNotice, hasValidationNotice, removeValidationNotice } = (0, use_validation_notices_1.useValidationNotices)();
    const { editedContent, editedTemplateContent } = (0, data_1.useSelect)((mapSelect) => ({
        editedContent: mapSelect(store_1.storeName).getEditedEmailContent(),
        editedTemplateContent: mapSelect(store_1.storeName).getCurrentTemplateContent(),
    }));
    const content = (0, use_shallow_equal_1.useShallowEqual)(editedContent);
    const templateContent = (0, use_shallow_equal_1.useShallowEqual)(editedTemplateContent);
    const validateContent = (0, element_1.useCallback)(() => {
        return (0, exports.validateEmailContent)(content, templateContent, {
            addValidationNotice,
            hasValidationNotice,
            removeValidationNotice,
        });
    }, [
        content,
        templateContent,
        addValidationNotice,
        removeValidationNotice,
        hasValidationNotice,
    ]);
    // Register the validation function with the store
    (0, element_1.useEffect)(() => {
        (0, data_1.dispatch)(store_1.storeName).setContentValidation({
            validateContent,
        });
        return () => {
            (0, data_1.dispatch)(store_1.storeName).setContentValidation(undefined);
        };
    }, [validateContent]);
    // Subscribe to updates so notices can be dismissed once resolved.
    (0, element_1.useEffect)(() => {
        const unsubscribe = (0, data_1.subscribe)(() => {
            if (!hasValidationNotice()) {
                return;
            }
            validateContent();
        }, core_data_1.store);
        return () => unsubscribe();
    }, [hasValidationNotice, validateContent]);
    return {
        validateContent,
    };
};
exports.useContentValidation = useContentValidation;
