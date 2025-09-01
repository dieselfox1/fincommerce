/**
 * External dependencies
 */
import { useContext, useMemo, useState, useEffect } from '@wordpress/element';
import { ValidationContext } from './validation-context';
export function useValidation(validatorId, validator, deps = []) {
    const context = useContext(ValidationContext);
    const [isValidating, setIsValidating] = useState(false);
    const ref = useMemo(() => context.registerValidator(validatorId, validator), [validatorId, ...deps]);
    useEffect(() => {
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
