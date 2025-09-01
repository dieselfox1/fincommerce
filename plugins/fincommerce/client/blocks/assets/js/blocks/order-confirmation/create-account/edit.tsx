/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import clsx from 'clsx';
import type { TemplateArray, BlockAttributes } from '@wordpress/blocks';
import {
	Disabled,
	PanelBody,
	ToggleControl,
	ExternalLink,
} from '@wordpress/components';
import {
	InnerBlocks,
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';
import { getSetting, ADMIN_URL } from '@fincommerce/settings';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/blocks/order-confirmation/create-account/style.scss';
import { SITE_TITLE } from '@fincommerce/block-library/assets/js/settings/shared/default-constants';
import Form from '@fincommerce/block-library/assets/js/blocks/order-confirmation/create-account/form';

const defaultTemplate = [
	[
		'core/heading',
		{
			level: 3,
			content: sprintf(
				/* translators: %s: site name */
				__( 'Create an account with %s', 'fincommerce' ),
				SITE_TITLE
			),
		},
	],
	[
		'core/list',
		{
			className: 'is-style-checkmark-list',
		},
		[
			[
				'core/list-item',
				{
					content: __( 'Faster future purchases', 'fincommerce' ),
				},
			],
			[
				'core/list-item',
				{
					content: __( 'Securely save payment info', 'fincommerce' ),
				},
			],
			[
				'core/list-item',
				{
					content: __(
						'Track orders & view shopping history',
						'fincommerce'
					),
				},
			],
		],
	],
] as TemplateArray;

type EditProps = {
	attributes: {
		hasDarkControls: boolean;
	};
	setAttributes: ( attrs: BlockAttributes ) => void;
};

export const Edit = ( {
	attributes,
	setAttributes,
}: EditProps ): JSX.Element | null => {
	const className = clsx( 'wc-block-order-confirmation-create-account', {
		'has-dark-controls': attributes.hasDarkControls,
	} );
	const blockProps = useBlockProps( {
		className,
	} );
	const isEnabled = getSetting( 'delayedAccountCreationEnabled', true );

	if ( ! isEnabled ) {
		return null;
	}

	const generatePassword = getSetting( 'registrationGeneratePassword', true );

	return (
		<div { ...blockProps }>
			<InnerBlocks
				allowedBlocks={ [
					'core/heading',
					'core/paragraph',
					'core/list',
					'core/list-item',
					'core/image',
				] }
				template={ defaultTemplate }
				templateLock={ false }
			/>
			<Disabled>
				<Form isEditor={ true } />
			</Disabled>
			{ ! generatePassword && (
				<InspectorControls>
					<PanelBody title={ __( 'Style', 'fincommerce' ) }>
						<ToggleControl
							label={ __( 'Dark mode inputs', 'fincommerce' ) }
							help={ __(
								'Inputs styled specifically for use on dark background colors.',
								'fincommerce'
							) }
							checked={ attributes.hasDarkControls }
							onChange={ () =>
								setAttributes( {
									hasDarkControls:
										! attributes.hasDarkControls,
								} )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }
			<InspectorControls>
				<PanelBody>
					<p>
						{ __(
							'Configure this feature in your store settings.',
							'fincommerce'
						) }
					</p>
					<ExternalLink
						href={ `${ ADMIN_URL }admin.php?page=wc-settings&tab=account` }
					>
						{ __( 'Manage account settings', 'fincommerce' ) }
					</ExternalLink>
				</PanelBody>
			</InspectorControls>
		</div>
	);
};

export const Save = (): JSX.Element => {
	return (
		<div { ...useBlockProps.save() }>
			<InnerBlocks.Content />
		</div>
	);
};

export default Edit;
