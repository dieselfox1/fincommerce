/**
 * External dependencies
 */
import { BlockInstance } from '@wordpress/blocks';
/**
 * Internal dependencies
 */
import type { ProductEditorUIStateProps } from './types';
declare const _default: {
    isModalEditorOpen: (state: ProductEditorUIStateProps) => boolean | undefined;
    getModalEditorBlocks: (state: ProductEditorUIStateProps) => BlockInstance[];
    getModalEditorContentHasChanged: (state: ProductEditorUIStateProps) => boolean;
    isPrepublishPanelOpen: (state: ProductEditorUIStateProps) => boolean | undefined;
};
export default _default;
//# sourceMappingURL=selectors.d.ts.map