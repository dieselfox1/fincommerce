/**
 * External dependencies
 */
import { useContext, useState } from '@wordpress/element';
import { ValidationContext } from './validation-context';
function isInvalid(errors) {
    return Object.values(errors).some(Boolean);
}
export function useValidations() {
    const context = useContext(ValidationContext);
    const [isValidating, setIsValidating] = useState(false);
    async function focusByValidatorId(validatorId) {
        const field = await context.getFieldByValidatorId(validatorId);
        if (!field) {
            return;
        }
        const tab = field.closest('.wp-block-fincommerce-product-tab__content');
        const observer = new MutationObserver(() => {
            if (tab && getComputedStyle(tab).display !== 'none') {
                field.focus();
                observer.disconnect();
            }
        });
        if (tab) {
            observer.observe(tab, {
                attributes: true,
            });
        }
    }
    return {
        isValidating,
        async validate(newData) {
            setIsValidating(true);
            return new Promise((resolve, reject) => {
                context
                    .validateAll(newData)
                    .then((errors) => {
                    if (isInvalid(errors)) {
                        reject(errors);
                    }
                    else {
                        resolve();
                    }
                })
                    .catch(() => {
                    reject(context.errors);
                });
            }).finally(() => {
                setIsValidating(false);
            });
        },
        focusByValidatorId,
        getFieldByValidatorId: context.getFieldByValidatorId,
    };
}
