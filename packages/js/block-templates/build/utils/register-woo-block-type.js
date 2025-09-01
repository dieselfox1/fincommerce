"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerWooBlockType = registerWooBlockType;
/**
 * External dependencies
 */
const blocks_1 = require("@wordpress/blocks");
const element_1 = require("@wordpress/element");
const expression_evaluation_1 = require("@fincommerce/expression-evaluation");
const settings_1 = require("@fincommerce/settings");
const data_1 = require("@wordpress/data");
function defaultUseEvaluationContext(context) {
    return {
        getEvaluationContext: () => context,
    };
}
function getEdit(edit, useEvaluationContext) {
    return (props) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore context is added to the block props by the block editor.
        const { context } = props;
        const { _templateBlockHideConditions: hideConditions, _templateBlockDisableConditions: disableConditions, } = props.attributes;
        const { getEvaluationContext } = useEvaluationContext(context);
        const { shouldHide, shouldDisable } = (0, data_1.useSelect)((select) => {
            const evaluationContext = getEvaluationContext(select);
            return {
                shouldHide: hideConditions &&
                    Array.isArray(hideConditions) &&
                    hideConditions.some((condition) => (0, expression_evaluation_1.evaluate)(condition.expression, evaluationContext)),
                shouldDisable: disableConditions &&
                    Array.isArray(disableConditions) &&
                    disableConditions.some((condition) => (0, expression_evaluation_1.evaluate)(condition.expression, evaluationContext)),
            };
        }, [getEvaluationContext, hideConditions, disableConditions]);
        if (!edit || shouldHide) {
            return null;
        }
        return (0, element_1.createElement)(edit, {
            ...props,
            attributes: {
                ...props.attributes,
                disabled: props.attributes.disabled || shouldDisable,
            },
        });
    };
}
let requiresExperimentalRole = (0, settings_1.isWpVersion)('6.7', '<');
const adminSettings = (0, settings_1.getSetting)('admin');
if (requiresExperimentalRole && adminSettings.gutenberg_version) {
    requiresExperimentalRole =
        parseFloat(adminSettings?.gutenberg_version) < 19.4;
}
function augmentAttributes(attributes) {
    // Note: If you modify this function, also update the server-side
    // Automattic\FinCommerce\Admin\Features\ProductBlockEditor\BlockRegistry::augment_attributes() function.
    const augmentedAttributes = {
        ...attributes,
        ...{
            _templateBlockId: {
                type: 'string',
                role: 'content',
            },
            _templateBlockOrder: {
                type: 'integer',
                role: 'content',
            },
            _templateBlockHideConditions: {
                type: 'array',
                role: 'content',
            },
            _templateBlockDisableConditions: {
                type: 'array',
                role: 'content',
            },
            disabled: attributes.disabled || {
                type: 'boolean',
                role: 'content',
            },
        },
    };
    if (requiresExperimentalRole) {
        return Object.keys(augmentedAttributes).reduce((acc, key) => {
            if (augmentedAttributes[key].role) {
                acc[key] = {
                    ...augmentedAttributes[key],
                    __experimentalRole: augmentedAttributes[key].role,
                };
            }
            else {
                acc[key] = augmentedAttributes[key];
            }
            return acc;
        }, {});
    }
    return augmentedAttributes;
}
/**
 * Function to register an individual block.
 *
 * @param block The block to be registered.
 * @return The block, if it has been successfully registered; otherwise `undefined`.
 */
function registerWooBlockType(block, useEvaluationContext) {
    if (!block) {
        return;
    }
    const { metadata, settings, name } = block;
    const { edit } = settings;
    if (!edit) {
        return;
    }
    const augmentedMetadata = {
        ...metadata,
        attributes: augmentAttributes(metadata.attributes),
    };
    return (0, blocks_1.registerBlockType)({ name, ...augmentedMetadata }, {
        ...settings,
        edit: getEdit(edit, useEvaluationContext ?? defaultUseEvaluationContext),
    });
}
