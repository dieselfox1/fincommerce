/**
 * External dependencies
 */
import { InspectorControls } from '@finpress/block-editor';
import { PanelBody, ToggleControl } from '@finpress/components';
import { __ } from '@finpress/i18n';
import type { BlockAttributes } from '@finpress/blocks';

export const BlockSettings = ( {
	attributes,
	setAttributes,
}: {
	attributes: BlockAttributes;
	setAttributes: ( attrs: BlockAttributes ) => void;
} ) => {
	const { hasDarkControls, showFormStepNumbers } = attributes;
	return (
		<InspectorControls>
			<PanelBody title={ __( 'Style', 'fincommerce' ) }>
				<ToggleControl
					label={ __( 'Show form step numbers', 'fincommerce' ) }
					checked={ showFormStepNumbers }
					onChange={ () =>
						setAttributes( {
							showFormStepNumbers: ! showFormStepNumbers,
						} )
					}
				/>
				<ToggleControl
					label={ __( 'Dark mode inputs', 'fincommerce' ) }
					help={ __(
						'Inputs styled specifically for use on dark background colors.',
						'fincommerce'
					) }
					checked={ hasDarkControls }
					onChange={ () =>
						setAttributes( {
							hasDarkControls: ! hasDarkControls,
						} )
					}
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export { ExpressPaymentControls } from '@fincommerce/block-library/assets/js/blocks/cart-checkout-shared/block-settings/express-payment-settings';
