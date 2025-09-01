"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWooBlockProps = void 0;
/**
 * External dependencies
 */
const block_editor_1 = require("@wordpress/block-editor");
const useWooBlockProps = (attributes, props = {}) => {
    const additionalProps = {
        'data-template-block-id': attributes._templateBlockId,
        'data-template-block-order': attributes._templateBlockOrder,
        tabIndex: -1,
        ...props,
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore the type definitions are slightly wrong. It should be possible to pass the tabIndex attribute.
    return (0, block_editor_1.useBlockProps)(additionalProps);
};
exports.useWooBlockProps = useWooBlockProps;
