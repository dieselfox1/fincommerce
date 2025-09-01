"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationProvider = ValidationProvider;
const core_data_1 = require("@wordpress/core-data");
const element_1 = require("@wordpress/element");
const validation_context_1 = require("./validation-context");
const helpers_1 = require("./helpers");
function ValidationProvider({ postType, productId, children, }) {
    const validatorsRef = (0, element_1.useRef)({});
    const fieldRefs = (0, element_1.useRef)({});
    const [errors, setErrors] = (0, element_1.useState)({});
    const { record: initialValue } = (0, core_data_1.useEntityRecord)('postType', postType, productId);
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
        const firstElementWithError = (0, helpers_1.findFirstInvalidElement)(fieldRefs.current, newErrors);
        firstElementWithError?.focus();
        return newErrors;
    }
    return ((0, element_1.createElement)(validation_context_1.ValidationContext.Provider, { value: {
            errors,
            getFieldByValidatorId,
            registerValidator,
            unRegisterValidator,
            validateField,
            validateAll,
        } }, children));
}
