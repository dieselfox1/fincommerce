/**
 * External dependencies
 */
import {
	BLOCK_ATTRIBUTES,
	INNER_BLOCKS_TEMPLATE,
} from '@fincommerce/blocks/product-query/variations';
import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
} from '@finpress/block-editor';
import { InnerBlockTemplate } from '@finpress/blocks';
import { Notice } from '@finpress/components';
import { __ } from '@finpress/i18n';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/related-products/editor.scss';

const Edit = () => {
	const TEMPLATE: InnerBlockTemplate[] = [
		[ 'core/query', BLOCK_ATTRIBUTES, INNER_BLOCKS_TEMPLATE ],
	];
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<Notice
					className={ 'wc-block-editor-related-products__notice' }
					status={ 'warning' }
					isDismissible={ false }
				>
					<p>
						{ __(
							'These products will vary depending on the main product in the page',
							'fincommerce'
						) }
					</p>
				</Notice>
			</InspectorControls>
			<InnerBlocks template={ TEMPLATE } />
		</div>
	);
};

export default Edit;
