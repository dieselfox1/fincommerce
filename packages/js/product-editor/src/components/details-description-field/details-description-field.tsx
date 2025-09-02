/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import {
	useFormContext,
	__experimentalRichTextEditor as RichTextEditor,
} from '@fincommerce/components';
import { Product } from '@fincommerce/data';
import { BlockInstance, serialize, parse } from '@finpress/blocks';
import { useState, createElement } from '@finpress/element';

export const DetailsDescriptionField = () => {
	const { setValue, values } = useFormContext< Product >();
	const [ descriptionBlocks, setDescriptionBlocks ] = useState<
		BlockInstance[]
	>( parse( values.description || '' ) );

	return (
		<RichTextEditor
			label={ __( 'Description', 'fincommerce' ) }
			blocks={ descriptionBlocks }
			onChange={ ( blocks ) => {
				setDescriptionBlocks( blocks );
				if ( ! descriptionBlocks.length ) {
					return;
				}
				setValue( 'description', serialize( blocks ) );
			} }
			placeholder={ __(
				'Describe this product. What makes it unique? What are its most important features?',
				'fincommerce'
			) }
		/>
	);
};
