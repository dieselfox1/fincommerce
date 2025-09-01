/**
 * External dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { getSetting } from '@fincommerce/settings';
import clsx from 'clsx';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/blocks/order-confirmation/downloads-wrapper/editor.scss';

const Edit = ( {
	attributes,
	setAttributes,
}: {
	attributes: {
		heading: string;
	};
	setAttributes: ( attributes: Record< string, unknown > ) => void;
} ) => {
	const blockProps = useBlockProps();
	const hasDownloadableProducts = getSetting(
		'storeHasDownloadableProducts'
	);

	return (
		<div
			{ ...blockProps }
			className={ clsx( blockProps.className, {
				'store-has-downloads': hasDownloadableProducts,
			} ) }
		>
			<InnerBlocks
				allowedBlocks={ [ 'core/heading' ] }
				template={ [
					[
						'core/heading',
						{
							level: 2,
							style: { typography: { fontSize: '24px' } },
							content: attributes.heading || '',
							onChangeContent: ( value: string ) =>
								setAttributes( { heading: value } ),
						},
					],
					[
						'fincommerce/order-confirmation-downloads',
						{
							lock: {
								remove: true,
							},
						},
					],
				] }
			/>
		</div>
	);
};

export default Edit;
