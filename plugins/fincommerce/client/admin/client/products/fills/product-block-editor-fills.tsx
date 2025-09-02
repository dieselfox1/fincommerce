/**
 * External dependencies
 */
import { MenuGroup } from '@finpress/components';
import { __ } from '@finpress/i18n';
import { recordEvent } from '@fincommerce/tracks';
import { useSelect } from '@finpress/data';
import { Product, ProductVariation } from '@fincommerce/data';
import { store as coreStore, useEntityProp } from '@finpress/core-data';

/**
 * Internal dependencies
 */
import {
	FeedbackMenuItem,
	ClassicEditorMenuItem,
	AboutTheEditorMenuItem,
} from '../fills/more-menu-items';

export type MoreMenuFillProps = { productType?: string; onClose: () => void };

export const MoreMenuFill = ( {
	productType = 'product',
	onClose,
}: MoreMenuFillProps ) => {
	const [ id ] = useEntityProp( 'postType', productType, 'id' );

	const product = useSelect(
		( select ) => {
			const { getEntityRecord } = select( coreStore );

			return getEntityRecord( 'postType', productType, id ) as
				| Product
				| ProductVariation;
		},
		[ id, productType ]
	);

	const recordClick = ( optionName: string ) => {
		recordEvent( 'product_dropdown_option_click', {
			selected_option: optionName,
			product_type: product.type,
			product_status: product.status,
		} );
	};

	return (
		<>
			<MenuGroup label={ __( 'New product form (Beta)', 'fincommerce' ) }>
				<AboutTheEditorMenuItem
					onClick={ () => {
						recordClick( 'about' );
					} }
					onCloseGuide={ () => {
						onClose();
					} }
				/>
				<FeedbackMenuItem
					onClick={ () => {
						recordClick( 'feedback' );
						onClose();
					} }
				/>
			</MenuGroup>
			<MenuGroup>
				<ClassicEditorMenuItem
					productId={
						( product as ProductVariation ).parent_id ?? product.id
					}
					onClick={ () => {
						recordClick( 'classic_editor' );
						onClose();
					} }
				/>
			</MenuGroup>
		</>
	);
};
