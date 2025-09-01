import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useRef, useState } from '@wordpress/element';
import { ValidationContext } from './validation-context';
import { findFirstInvalidElement } from './helpers';
export function ValidationProvider({ postType, productId, children, }) {
    const validatorsRef = useRef({});
    const fieldRefs = useRef({});
    const [errors, setErrors] = useState({});
    const { record: initialValue } = useEntityRecord('postType', postType, productId);
    function registerValidator(validatorId, validator) {
        validatorsRef.current = {
            ...validatorsRef.current,
            [validatorId]: validator,
        };
        return (element) => {
            fieldRefs.current[validatorId] = element;
        };
    }
    function unRegisterValidator(validatorId) {
        if (validatorsRef.current[validatorId]) {
            delete validatorsRef.current[validatorId];
        }
        if (fieldRefs.current[validatorId]) {
            delete fieldRefs.current[validatorId];
        }
    }
    async function validateField(validatorId, newData) {
        const validators = validatorsRef.current;
        if (validatorId in validators) {
            const validator = validators[validatorId];
            const result = validator(initialValue, newData);
            return result.then((error) => {
                const errorWithValidatorId = error !== undefined ? { validatorId, ...error } : undefined;
                setErrors((currentErrors) => ({
                    ...currentErrors,
                    [validatorId]: errorWithValidatorId,
                }));
                return errorWithValidatorId;
            });
        }
        return Promise.resolve(undefined);
    }
    async function getFieldByValidatorId(validatorId) {
        return fieldRefs.current[validatorId];
    }
    async function validateAll(newData) {
        const newErrors = {};
        const validators = validatorsRef.current;
        for (const validatorId in validators) {
            newErrors[validatorId] = await validateField(validatorId, newData);
        }
        setErrors(newErrors);
        const firstElementWithError = findFirstInvalidElement(fieldRefs.current, newErrors);
        firstElementWithError?.focus();
        return newErrors;
    }
    return (createElement(ValidationContext.Provider, { value: {
            errors,
            getFieldByValidatorId,
            registerValidator,
            unRegisterValidator,
            validateField,
            validateAll,
        } }, children));
}
