/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { useBlockProps, InspectorControls } from '@finpress/block-editor';
import { PanelBody, ToggleControl } from '@finpress/components';
import { getSetting } from '@fincommerce/settings';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-order-summary-taxes/block';

export const Edit = ( {
	attributes,
	setAttributes,
}: {
	attributes: {
		className: string;
		showRateAfterTaxName: boolean;
	};
	setAttributes: ( attributes: Record< string, unknown > ) => void;
} ): JSX.Element => {
	const { className, showRateAfterTaxName } = attributes;
	const blockProps = useBlockProps();
	const taxesEnabled = getSetting( 'taxesEnabled' ) as boolean;
	const displayItemizedTaxes = getSetting(
		'displayItemizedTaxes',
		false
	) as boolean;
	const displayCartPricesIncludingTax = getSetting(
		'displayCartPricesIncludingTax',
		false
	) as boolean;
	return (
		<div { ...blockProps }>
			<InspectorControls>
				{ taxesEnabled &&
					displayItemizedTaxes &&
					! displayCartPricesIncludingTax && (
						<PanelBody title={ __( 'Taxes', 'fincommerce' ) }>
							<ToggleControl
								label={ __(
									'Show rate after tax name',
									'fincommerce'
								) }
								help={ __(
									'Show the percentage rate alongside each tax line in the summary.',
									'fincommerce'
								) }
								checked={ showRateAfterTaxName }
								onChange={ () =>
									setAttributes( {
										showRateAfterTaxName:
											! showRateAfterTaxName,
									} )
								}
							/>
						</PanelBody>
					) }
			</InspectorControls>
			<Block
				className={ className }
				showRateAfterTaxName={ showRateAfterTaxName }
			/>
		</div>
	);
};

export const Save = (): JSX.Element => {
	return <div { ...useBlockProps.save() } />;
};
