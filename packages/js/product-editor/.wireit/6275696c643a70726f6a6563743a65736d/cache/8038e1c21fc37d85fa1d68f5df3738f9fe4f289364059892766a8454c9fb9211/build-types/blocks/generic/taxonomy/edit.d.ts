/**
 * External dependencies
 */
import type { BlockAttributes } from '@wordpress/blocks';
import '@fincommerce/settings';
import type { ProductEditorBlockEditProps } from '../../../types';
interface TaxonomyBlockAttributes extends BlockAttributes {
    label: string;
    help?: string;
    slug: string;
    property: string;
    createTitle: string;
    dialogNameHelpText?: string;
    parentTaxonomyText?: string;
    placeholder?: string;
}
export declare function Edit({ attributes, context: { postType, isInSelectedTab }, }: ProductEditorBlockEditProps<TaxonomyBlockAttributes>): JSX.Element;
export {};
//# sourceMappingURL=edit.d.ts.map