/**
 * External dependencies
 */
import clsx from 'clsx';
import { InspectorControls, useBlockProps } from '@finpress/block-editor';
import { Disabled } from '@finpress/components';
import type { BlockEditProps } from '@finpress/blocks';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/blocks/customer-account/block';
import { Attributes } from '@fincommerce/block-library/assets/js/blocks/customer-account/types';
import { BlockSettings } from '@fincommerce/block-library/assets/js/blocks/customer-account/sidebar-settings';
import '@fincommerce/block-library/assets/js/blocks/customer-account/editor.scss';

const Edit = ( {
	attributes,
	setAttributes,
}: BlockEditProps< Attributes > ) => {
	const { className } = attributes;
	const blockProps = useBlockProps( {
		className: clsx( 'wc-block-editor-customer-account', className ),
	} );

	return (
		<>
			<div { ...blockProps }>
				<InspectorControls>
					<BlockSettings
						attributes={ attributes }
						setAttributes={ setAttributes }
					/>
				</InspectorControls>
				<Disabled>
					<Block attributes={ attributes } />
				</Disabled>
			</div>
		</>
	);
};

export default Edit;
