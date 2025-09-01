"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useValidation = useValidation;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const validation_context_1 = require("./validation-context");
function useValidation(validatorId, validator, deps = []) {
    const context = (0, element_1.useContext)(validation_context_1.ValidationContext);
    const [isValidating, setIsValidating] = (0, element_1.useState)(false);
    const ref = (0, element_1.useMemo)(() => context.registerValidator(validatorId, validator), [validatorId, ...deps]);
    (0, element_1.useEffect)(() => {
        return () => {
            context.unRegisterValidator(validatorId);
        };
    }, []);
    return {
        ref,
        error: context.errors[validatorId]?.message,
        isValidating,
        async validate(newData) {
            setIsValidating(true);
            return context
                .validateField(validatorId, newData)
                .finally(() => {
                setIsValidating(false);
            });
        },
    };
}
