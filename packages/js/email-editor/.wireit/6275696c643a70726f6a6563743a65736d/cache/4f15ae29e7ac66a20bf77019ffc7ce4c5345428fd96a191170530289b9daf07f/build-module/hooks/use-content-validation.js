/**
 * External dependencies
 */
import { useCallback, useEffect } from '@wordpress/element';
import { useSelect, subscribe, dispatch } from '@wordpress/data';
import { store as coreDataStore } from '@wordpress/core-data';
import { applyFilters } from '@wordpress/hooks';
/**
 * Internal dependencies
 */
import { storeName as emailEditorStore, } from '../store';
import { useShallowEqual } from './use-shallow-equal';
import { useValidationNotices } from './use-validation-notices';
// Shared reference to an empty array for cases where it is important to avoid
// returning a new array reference on every invocation
const EMPTY_ARRAY = [];
export const validateEmailContent = (content, templateContent, { addValidationNotice, hasValidationNotice, removeValidationNotice, }) => {
    const rules = applyFilters('fincommerce_email_editor_content_validation_rules', EMPTY_ARRAY);
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
export const useContentValidation = () => {
    const { addValidationNotice, hasValidationNotice, removeValidationNotice } = useValidationNotices();
    const { editedContent, editedTemplateContent } = useSelect((mapSelect) => ({
        editedContent: mapSelect(emailEditorStore).getEditedEmailContent(),
        editedTemplateContent: mapSelect(emailEditorStore).getCurrentTemplateContent(),
    }));
    const content = useShallowEqual(editedContent);
    const templateContent = useShallowEqual(editedTemplateContent);
    const validateContent = useCallback(() => {
        return validateEmailContent(content, templateContent, {
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
    useEffect(() => {
        dispatch(emailEditorStore).setContentValidation({
            validateContent,
        });
        return () => {
            dispatch(emailEditorStore).setContentValidation(undefined);
        };
    }, [validateContent]);
    // Subscribe to updates so notices can be dismissed once resolved.
    useEffect(() => {
        const unsubscribe = subscribe(() => {
            if (!hasValidationNotice()) {
                return;
            }
            validateContent();
        }, coreDataStore);
        return () => unsubscribe();
    }, [hasValidationNotice, validateContent]);
    return {
        validateContent,
    };
};
