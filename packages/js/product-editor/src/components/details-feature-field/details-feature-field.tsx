/**
 * External dependencies
 */
import { CheckboxControl } from '@finpress/components';
import { __ } from '@finpress/i18n';
import {
	useFormContext,
	Link,
	__experimentalTooltip as Tooltip,
} from '@fincommerce/components';
import { Product } from '@fincommerce/data';
import { recordEvent } from '@fincommerce/tracks';
import {
	createElement,
	Fragment,
	createInterpolateElement,
} from '@finpress/element';

/**
 * Internal dependencies
 */
import { getCheckboxTracks } from '../../utils';
import { PRODUCT_DETAILS_SLUG } from '../../constants';

export const DetailsFeatureField = () => {
	const { getCheckboxControlProps } = useFormContext< Product >();

	return (
		<CheckboxControl
			// @ts-expect-error label type is wrong
			label={
				<>
					{ __( 'Feature this product', 'fincommerce' ) }
					<Tooltip
						text={ createInterpolateElement(
							__(
								'Include this product in a featured section on your website with a widget or shortcode. <moreLink />',
								'fincommerce'
							),
							{
								moreLink: (
									<Link
										href="https://fincommerce.com/document/fincommerce-shortcodes/#products"
										target="_blank"
										type="external"
										onClick={ () =>
											recordEvent(
												'add_product_learn_more',
												{
													category:
														PRODUCT_DETAILS_SLUG,
												}
											)
										}
									>
										{ __( 'Learn more', 'fincommerce' ) }
									</Link>
								),
							}
						) }
					/>
				</>
			}
			{ ...getCheckboxControlProps(
				'featured',
				getCheckboxTracks( 'featured' )
			) }
		/>
	);
};
