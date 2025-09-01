/**
 * External dependencies
 */
import type { BlockAttributes } from '@wordpress/blocks';
/**
 * Internal dependencies
 */
import { ProductEditorBlockEditProps } from '../../../types';
export interface ConditionalBlockAttributes extends BlockAttributes {
    mustMatch: Record<string, Array<string>>;
}
export declare function Edit({ attributes, context, }: ProductEditorBlockEditProps<ConditionalBlockAttributes>): JSX.Element;
//# sourceMappingURL=edit.d.ts.map