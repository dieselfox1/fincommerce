/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ExternalLink } from '@wordpress/components';
import { ADMIN_URL } from '@fincommerce/settings';
import Noninteractive from '@fincommerce/base-components/noninteractive';
import { SHIPPING_ENABLED } from '@fincommerce/block-settings';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-order-summary-shipping/block';

export const Edit = ( {
	attributes,
}: {
	attributes: {
		className: string;
		lock: {
			move: boolean;
			remove: boolean;
		};
	};
} ): JSX.Element => {
	const { className } = attributes;
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<InspectorControls>
				{ !! SHIPPING_ENABLED && (
					<PanelBody
						title={ __( 'Shipping Calculations', 'fincommerce' ) }
					>
						<p className="wc-block-checkout__controls-text">
							{ __(
								'Options that control shipping can be managed in your store settings.',
								'fincommerce'
							) }
						</p>
						<ExternalLink
							href={ `${ ADMIN_URL }admin.php?page=wc-settings&tab=shipping&section=options` }
						>
							{ __( 'Manage shipping options', 'fincommerce' ) }
						</ExternalLink>{ ' ' }
					</PanelBody>
				) }
			</InspectorControls>
			<Noninteractive>
				<Block className={ className } />
			</Noninteractive>
		</div>
	);
};

export const Save = (): JSX.Element => {
	return <div { ...useBlockProps.save() } />;
};
