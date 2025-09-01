/**
 * External dependencies
 */
import clsx from 'clsx';
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, ExternalLink } from '@wordpress/components';
import { payment } from '@wordpress/icons';
import { ADMIN_URL, getSetting } from '@fincommerce/settings';
import ExternalLinkCard from '@fincommerce/editor-components/external-link-card';
import { innerBlockAreas } from '@fincommerce/blocks-checkout';
import Noninteractive from '@fincommerce/base-components/noninteractive';
import { GlobalPaymentMethod } from '@fincommerce/types';
import { select } from '@wordpress/data';
import { paymentStore } from '@fincommerce/block-data';
import { blocksConfig } from '@fincommerce/block-settings';
import { trimCharacters, trimWords } from '@fincommerce/utils';

/**
 * Internal dependencies
 */
import {
	FormStepBlock,
	AdditionalFields,
	AdditionalFieldsContent,
} from '@fincommerce/block-library/assets/js/blocks/checkout/form-step';
import Block from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-payment-block/block';
import ConfigurePlaceholder from '@fincommerce/block-library/assets/js/blocks/checkout/configure-placeholder';

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
} ): JSX.Element => {
	const globalPaymentMethods = getSetting< GlobalPaymentMethod[] >(
		'globalPaymentMethods'
	);
	const incompatiblePaymentMethods =
		select( paymentStore ).getIncompatiblePaymentMethods();

	const incompatiblePaymentMethodMessage = __(
		'Incompatible with block-based checkout',
		'fincommerce'
	);
	const wordCountType = blocksConfig.wordCountType;

	return (
		<FormStepBlock
			attributes={ attributes }
			setAttributes={ setAttributes }
			className={ clsx(
				'wc-block-checkout__payment-method',
				attributes?.className
			) }
		>
			<InspectorControls>
				{ globalPaymentMethods.length > 0 && (
					<PanelBody title={ __( 'Methods', 'fincommerce' ) }>
						<p className="wc-block-checkout__controls-text">
							{ __(
								'You currently have the following payment integrations active.',
								'fincommerce'
							) }
						</p>
						{ globalPaymentMethods.map( ( method ) => {
							const isIncompatible =
								!! incompatiblePaymentMethods[ method.id ];

							let trimmedDescription;

							if ( wordCountType === 'words' ) {
								trimmedDescription = trimWords(
									method.description,
									30,
									undefined,
									false
								);
							} else {
								trimmedDescription = trimCharacters(
									method.description,
									30,
									wordCountType ===
										'characters_including_spaces',
									undefined,
									false
								);
							}

							return (
								<ExternalLinkCard
									key={ method.id }
									href={ `${ ADMIN_URL }admin.php?page=wc-settings&tab=checkout&section=${ method.id }` }
									title={ method.title }
									description={ trimmedDescription }
									{ ...( isIncompatible
										? {
												warning:
													incompatiblePaymentMethodMessage,
										  }
										: {} ) }
								/>
							);
						} ) }
						<ExternalLink
							href={ `${ ADMIN_URL }admin.php?page=wc-settings&tab=checkout` }
						>
							{ __( 'Manage payment methods', 'fincommerce' ) }
						</ExternalLink>
					</PanelBody>
				) }
			</InspectorControls>
			<Noninteractive>
				<Block
					noPaymentMethods={
						<ConfigurePlaceholder
							icon={ payment }
							label={ __( 'Payment options', 'fincommerce' ) }
							description={ __(
								'Your store does not have any payment methods that support the Checkout block. Once you have configured a compatible payment method it will be displayed here.',
								'fincommerce'
							) }
							buttonLabel={ __(
								'Configure Payment Options',
								'fincommerce'
							) }
							buttonHref={ `${ ADMIN_URL }admin.php?page=wc-settings&tab=checkout` }
						/>
					}
				/>
			</Noninteractive>
			<AdditionalFields block={ innerBlockAreas.PAYMENT_METHODS } />
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
