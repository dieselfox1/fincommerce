/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Product } from '@fincommerce/data';
import { useEntityProp } from '@wordpress/core-data';
import { recordEvent } from '@fincommerce/tracks';
import { CheckboxControl, PanelBody } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { VisibilitySectionProps } from './types';
import { TRACKS_SOURCE } from '../../../constants';
import { RequirePassword } from '../../require-password';
import { CatalogVisibility } from '../../catalog-visibility';

export function VisibilitySection( { productType }: VisibilitySectionProps ) {
	const [ catalogVisibility, setCatalogVisibility ] = useEntityProp<
		Product[ 'catalog_visibility' ]
	>( 'postType', productType, 'catalog_visibility' );

	const [ reviewsAllowed, setReviewsAllowed ] = useEntityProp<
		Product[ 'reviews_allowed' ]
	>( 'postType', productType, 'reviews_allowed' );

	const [ postPassword, setPostPassword ] = useEntityProp< string >(
		'postType',
		productType,
		'post_password'
	);

	function getVisibilityLabel() {
		if ( postPassword !== '' ) {
			return __( 'Password protected', 'fincommerce' );
		}
		if ( catalogVisibility === 'hidden' ) {
			return __( 'Hidden', 'fincommerce' );
		}
		return __( 'Public', 'fincommerce' );
	}

	return (
		<PanelBody
			initialOpen={ false }
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore We need to send an Element.
			title={ [
				__( 'Visibility: ', 'fincommerce' ),
				<span className="editor-post-publish-panel__link" key="label">
					{ getVisibilityLabel() }
				</span>,
			] }
		>
			<div className="fincommerce-publish-panel-visibility">
				<fieldset className="fincommerce-publish-panel-visibility__fieldset">
					<legend className="fincommerce-publish-panel-visibility__legend">
						{ __(
							'Control how this product is viewed by customers and other site users.',
							'fincommerce'
						) }
					</legend>
					<CatalogVisibility
						catalogVisibility={ catalogVisibility }
						label={ __( 'Hide in product catalog', 'fincommerce' ) }
						visibility={ 'search' }
						onCheckboxChange={ setCatalogVisibility }
					/>
					<CatalogVisibility
						catalogVisibility={ catalogVisibility }
						label={ __(
							'Hide from search results',
							'fincommerce'
						) }
						visibility={ 'catalog' }
						onCheckboxChange={ setCatalogVisibility }
					/>
					<CheckboxControl
						label={ __( 'Enable product reviews', 'fincommerce' ) }
						checked={ reviewsAllowed }
						onChange={ ( selected: boolean ) => {
							setReviewsAllowed( selected );
							recordEvent( 'product_prepublish_panel', {
								source: TRACKS_SOURCE,
								action: 'enable_product_reviews',
								value: selected,
							} );
						} }
					/>
					<RequirePassword
						label={ __( 'Require a password', 'fincommerce' ) }
						postPassword={ postPassword }
						onInputChange={ setPostPassword }
					/>
				</fieldset>
			</div>
		</PanelBody>
	);
}
