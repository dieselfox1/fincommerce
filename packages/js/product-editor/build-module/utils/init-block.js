import deprecated from '@wordpress/deprecated';
/**
 * Internal dependencies
 */
import { registerProductEditorBlockType } from './register-product-editor-block-type';
/**
 * Function to register an individual block.
 *
 * @param block The block to be registered.
 * @return The block, if it has been successfully registered; otherwise `undefined`.
 */
export function initBlock(block) {
    deprecated('initBlock()', {
        alternative: 'registerProductEditorBlockType()',
    });
    if (!block) {
        return;
    }
    return registerProductEditorBlockType(block);
}
