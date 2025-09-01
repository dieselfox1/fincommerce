"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initContentValidationMiddleware = void 0;
/**
 * External dependencies
 */
const data_1 = require("@wordpress/data");
const i18n_1 = require("@wordpress/i18n");
/**
 * Internal dependencies
 */
const store_1 = require("../store");
// Store original actions
const originalActions = new WeakMap();
// Define which stores and actions we want to intercept
const INTERCEPTED_ACTIONS = {
    core: ['saveEditedEntityRecord', 'saveEntityRecord'],
};
const initContentValidationMiddleware = () => {
    // Check if middleware is already registered to avoid duplicate registrations
    if (Object.keys(originalActions).length > 0) {
        return;
    }
    (0, data_1.use)((registry) => ({
        dispatch: (namespace) => {
            const storeName = typeof namespace === 'object' ? namespace.name : namespace;
            // Only intercept actions for stores we're interested in
            if (!INTERCEPTED_ACTIONS[storeName]) {
                return registry.dispatch(storeName);
            }
            const actions = registry.dispatch(storeName);
            // Initialize namespace level objects if not yet done
            if (!originalActions[storeName]) {
                originalActions[storeName] = {};
            }
            // Check if we need to intercept any actions for this store
            const actionsToIntercept = INTERCEPTED_ACTIONS[storeName].filter((actionName) => !originalActions[storeName][actionName]);
            // Only proceed with the loop if there are actions to intercept
            if (actionsToIntercept.length > 0) {
                // Only intercept actions we're interested in
                for (const actionName of actionsToIntercept) {
                    originalActions[storeName][actionName] =
                        actions[actionName];
                    // Create a local rewritten action
                    actions[actionName] = async (...args) => {
                        // Get validation function from the store
                        const validation = registry
                            .select(store_1.storeName)
                            .getContentValidation();
                        const validateContent = validation?.validateContent;
                        if (validateContent) {
                            let isValid;
                            try {
                                // Validate content before saving
                                isValid = validateContent();
                            }
                            catch (error) {
                                // If there's an error, we'll consider the validation failed
                                isValid = false;
                            }
                            if (!isValid) {
                                // Return a rejected promise instead of throwing an error
                                return Promise.reject(new Error((0, i18n_1.__)('Content validation failed.', 'fincommerce')));
                            }
                        }
                        // If validation passes, call the original function
                        return await originalActions[storeName][actionName](...args);
                    };
                }
            }
            return actions;
        },
    }));
};
exports.initContentValidationMiddleware = initContentValidationMiddleware;
