/**
 * External dependencies
 */
import clsx from 'clsx';
import { __ } from '@finpress/i18n';
import { InspectorControls, useBlockProps } from '@finpress/block-editor';
import { PanelBody, ExternalLink } from '@finpress/components';
import { shipping } from '@finpress/icons';
import { ADMIN_URL, getSetting } from '@fincommerce/settings';
import ExternalLinkCard from '@fincommerce/editor-components/external-link-card';
import { innerBlockAreas } from '@fincommerce/blocks-checkout';
import { useCheckoutAddress } from '@fincommerce/base-context/hooks';
import Noninteractive from '@fincommerce/base-components/noninteractive';

/**
 * Internal dependencies
 */
import {
	FormStepBlock,
	AdditionalFields,
	AdditionalFieldsContent,
} from '@fincommerce/block-library/assets/js/blocks/checkout/form-step';
import ConfigurePlaceholder from '@fincommerce/block-library/assets/js/blocks/checkout/configure-placeholder';
import Block from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-shipping-methods-block/block';
import '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-shipping-methods-block/editor.scss';

type shippingAdminLink = {
	id: number;
	title: string;
	description: string;
};

export const Edit = ( {
	attributes,
	setAttributes,
}: {
	attributes: {
		title: string;
		description: string;
		showStepNumber: boolean;
		className: string;
	};
	setAttributes: ( attributes: Record< string, unknown > ) => void;
} ): JSX.Element | null => {
	const globalShippingMethods = getSetting(
		'globalShippingMethods'
	) as shippingAdminLink[];
	const activeShippingZones = getSetting(
		'activeShippingZones'
	) as shippingAdminLink[];

	const { showShippingMethods } = useCheckoutAddress();

	if ( ! showShippingMethods ) {
		return null;
	}

	return (
		<FormStepBlock
			attributes={ attributes }
			setAttributes={ setAttributes }
			className={ clsx(
				'wc-block-checkout__shipping-option',
				attributes?.className
			) }
		>
			<InspectorControls>
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
				{ globalShippingMethods.length > 0 && (
					<PanelBody title={ __( 'Methods', 'fincommerce' ) }>
						<p className="wc-block-checkout__controls-text">
							{ __(
								'The following shipping integrations are active on your store.',
								'fincommerce'
							) }
						</p>
						{ globalShippingMethods.map( ( method ) => {
							return (
								<ExternalLinkCard
									key={ method.id }
									href={ `${ ADMIN_URL }admin.php?page=wc-settings&tab=shipping&section=${ method.id }` }
									title={ method.title }
									description={ method.description }
								/>
							);
						} ) }
						<ExternalLink
							href={ `${ ADMIN_URL }admin.php?page=wc-settings&tab=shipping` }
						>
							{ __( 'Manage shipping methods', 'fincommerce' ) }
						</ExternalLink>
					</PanelBody>
				) }
				{ activeShippingZones.length && (
					<PanelBody title={ __( 'Shipping Zones', 'fincommerce' ) }>
						<p className="wc-block-checkout__controls-text">
							{ __(
								'Shipping Zones can be made managed in your store settings.',
								'fincommerce'
							) }
						</p>
						{ activeShippingZones.map( ( zone ) => {
							return (
								<ExternalLinkCard
									key={ zone.id }
									href={ `${ ADMIN_URL }admin.php?page=wc-settings&tab=shipping&zone_id=${ zone.id }` }
									title={ zone.title }
									description={ zone.description }
								/>
							);
						} ) }
					</PanelBody>
				) }
			</InspectorControls>
			<Noninteractive>
				<Block
					noShippingPlaceholder={
						<ConfigurePlaceholder
							icon={ shipping }
							label={ __( 'Shipping options', 'fincommerce' ) }
							description={ __(
								'Your store does not have any Shipping Options configured. Once you have added your Shipping Options they will appear here.',
								'fincommerce'
							) }
							buttonLabel={ __(
								'Configure Shipping Options',
								'fincommerce'
							) }
							buttonHref={ `${ ADMIN_URL }admin.php?page=wc-settings&tab=shipping` }
						/>
					}
				/>
			</Noninteractive>
			<AdditionalFields block={ innerBlockAreas.SHIPPING_METHODS } />
		</FormStepBlock>
	);
};

export const Save = (): JSX.Element => {
	return (
		<div { ...useBlockProps.save() }>
			<AdditionalFieldsContent />
		</div>
	);
};
