"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const element_1 = require("@wordpress/element");
const hooks_1 = require("@wordpress/hooks");
const compose_1 = require("@wordpress/compose");
const data_1 = require("@wordpress/data");
const expression_evaluation_1 = require("@fincommerce/expression-evaluation");
/**
 * Internal dependencies
 */
const utils_1 = require("../utils");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const areAllBlocksInvisible = (blocks, context) => {
    return blocks.every((block) => {
        if (!block.attributes?._templateBlockHideConditions ||
            !Array.isArray(block.attributes?._templateBlockHideConditions)) {
            return false;
        }
        return block.attributes._templateBlockHideConditions.some((condition) => (0, expression_evaluation_1.evaluate)(condition.expression, context));
    });
};
const maybeHideInventoryAdvancedCollapsible = (0, compose_1.createHigherOrderComponent)((BlockEdit) => {
    return (props) => {
        const { hasInnerBlocks, allBlocksInvisible: blocksInvisible } = (0, data_1.useSelect)((select) => {
            // bail early if not the product-inventory-advanced block
            if (props?.attributes
                ?._templateBlockId !==
                'product-inventory-advanced') {
                return {
                    hasInnerBlocks: true,
                    allBlocksInvisible: false,
                };
            }
            const evalContext = (0, utils_1.useEvaluationContext)(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            props.context);
            const advancedCollapsibleBlock = select('core/block-editor'
            // @ts-expect-error Selector is not typed
            ).getBlock(props?.clientId);
            let allBlocksInvisible = false;
            if (advancedCollapsibleBlock?.innerBlocks?.length) {
                const advancedSectionBlock = advancedCollapsibleBlock?.innerBlocks[0];
                allBlocksInvisible = areAllBlocksInvisible(advancedSectionBlock?.innerBlocks, evalContext.getEvaluationContext(select));
            }
            return {
                hasInnerBlocks: !!advancedCollapsibleBlock?.innerBlocks
                    ?.length,
                allBlocksInvisible,
            };
        }, [props.attributes, props.context, props.clientId]);
        // No inner blocks, so we can render the default block edit.
        if (!hasInnerBlocks) {
            return (0, element_1.createElement)(BlockEdit, { ...props });
        }
        if (blocksInvisible) {
            return null;
        }
        return (0, element_1.createElement)(BlockEdit, { ...props });
    };
}, 'maybeHideInventoryAdvancedCollapsible');
function default_1() {
    (0, hooks_1.addFilter)('editor.BlockEdit', 'fincommerce/handle-hide-inventory-advanced-collapsible', maybeHideInventoryAdvancedCollapsible);
}
