"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useValidations = useValidations;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const validation_context_1 = require("./validation-context");
function isInvalid(errors) {
    return Object.values(errors).some(Boolean);
}
function useValidations() {
    const context = (0, element_1.useContext)(validation_context_1.ValidationContext);
    const [isValidating, setIsValidating] = (0, element_1.useState)(false);
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
