"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initTextHooks = void 0;
/**
 * External dependencies
 */
const hooks_1 = require("@wordpress/hooks");
const i18n_1 = require("@wordpress/i18n");
/**
 * Replace text in the email editor.
 * This is used to contextualize some default texts to the email editing context
 */
const initTextHooks = () => {
    const replaceTextMatrix = {
        'You’ve tried to select a block that is part of a template that may be used elsewhere on your site. Would you like to edit the template?': {
            domain: 'default',
            replacementText: (0, i18n_1.__)('You’ve tried to select a block that is part of a template that may be used in other emails. Would you like to edit the template?', 'fincommerce'),
        },
    };
    (0, hooks_1.addFilter)('i18n.gettext', 'fincommerce/email-editor/override-text', (translation, text, domain) => {
        if (replaceTextMatrix[text] &&
            replaceTextMatrix[text].domain === (domain || 'default')) {
            return replaceTextMatrix[text].replacementText;
        }
        return translation;
    });
};
exports.initTextHooks = initTextHooks;
