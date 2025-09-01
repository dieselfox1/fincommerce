/**
 * External dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { BlockEditProps } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import {
	Flex,
	FlexItem,
	PanelBody,
	RadioControl,
	ToggleControl,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import RatingStars from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/rating-filter/components/rating-stars';
import type { Attributes } from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/rating-filter/types';

function MinimumRatingLabel( {
	stars,
	ariaLabel,
}: {
	stars: number;
	ariaLabel: string;
} ) {
	return (
		<Flex
			title={ ariaLabel }
			aria-label={ ariaLabel }
			justify="flex-start"
			gap={ 1 }
		>
			<FlexItem>
				<RatingStars stars={ stars } />
			</FlexItem>
			<FlexItem>{ __( '& up', 'fincommerce' ) }</FlexItem>
		</Flex>
	);
}

export const Inspector = ( {
	attributes,
	setAttributes,
}: Pick<
	BlockEditProps< Attributes >,
	'attributes' | 'setAttributes' | 'clientId'
> ) => {
	const { showCounts, minRating } = attributes;

	function setCountVisibility( value: boolean ) {
		setAttributes( {
			showCounts: value,
		} );
	}

	function setMinRating( value: string ) {
		setAttributes( {
			minRating: value,
		} );
	}

	return (
		<InspectorControls key="inspector">
			<PanelBody title={ __( 'Display', 'fincommerce' ) }>
				<RadioControl
					label={ __( 'Minimum rating', 'fincommerce' ) }
					selected={ minRating }
					className="wc-block-rating-filter__rating-control"
					options={ [
						{
							label: (
								<MinimumRatingLabel
									stars={ 4 }
									ariaLabel={ __(
										'Four stars and up',
										'fincommerce'
									) }
								/>
							),
							value: '4',
						},
						{
							label: (
								<MinimumRatingLabel
									stars={ 3 }
									ariaLabel={ __(
										'Three stars and up',
										'fincommerce'
									) }
								/>
							),
							value: '3',
						},
						{
							label: (
								<MinimumRatingLabel
									stars={ 2 }
									ariaLabel={ __(
										'Two stars and up',
										'fincommerce'
									) }
								/>
							),
							value: '2',
						},
						{
							label: __( 'No limit', 'fincommerce' ),
							value: '0', // no limit
						},
					] }
					onChange={ setMinRating }
				/>
				<ToggleControl
					label={ __( 'Product counts', 'fincommerce' ) }
					checked={ showCounts }
					onChange={ setCountVisibility }
					__nextHasNoMarginBottom
				/>
			</PanelBody>
		</InspectorControls>
	);
};
