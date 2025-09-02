/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { useBlockProps, InspectorControls } from '@finpress/block-editor';
import { PanelBody, ToggleControl } from '@finpress/components';
import { isExperimentalBlocksEnabled } from '@fincommerce/block-settings';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-order-summary-cart-items/block';

export type BlockAttributes = {
	className?: string;
	disableProductDescriptions?: boolean;
};

export const Edit = ( {
	attributes,
	setAttributes,
}: {
	attributes: BlockAttributes;
	setAttributes: ( attributes: Record< string, unknown > ) => void;
} ): JSX.Element => {
	const { className = '', disableProductDescriptions = false } = attributes;
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			{ /* For now this setting can only be enabled if you have experimental features enabled. */ }
			{ isExperimentalBlocksEnabled() && (
				<InspectorControls>
					<PanelBody title={ __( 'Settings', 'fincommerce' ) }>
						<ToggleControl
							label={ __(
								'Disable product descriptions',
								'fincommerce'
							) }
							help={ __(
								'Disable display of product descriptions.',
								'fincommerce'
							) }
							checked={ disableProductDescriptions }
							onChange={ () =>
								setAttributes( {
									disableProductDescriptions:
										! disableProductDescriptions,
								} )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }
			<Block
				disableProductDescriptions={ disableProductDescriptions }
				className={ className }
			/>
		</div>
	);
};

export const Save = (): JSX.Element => {
	return <div { ...useBlockProps.save() } />;
};
