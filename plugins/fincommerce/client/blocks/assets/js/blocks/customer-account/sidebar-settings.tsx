/**
 * External dependencies
 */
import clsx from 'clsx';
import { Icon } from '@finpress/icons';
import {
	customerAccountStyle,
	customerAccountStyleAlt,
	customerAccountStyleLine,
} from '@fincommerce/icons';
import { InspectorControls } from '@finpress/block-editor';
import { __ } from '@finpress/i18n';
import type { BlockAttributes } from '@finpress/blocks';
import { getSetting } from '@fincommerce/settings';
import { createInterpolateElement } from '@finpress/element';
import {
	PanelBody,
	SelectControl,
	// eslint-disable-next-line @finpress/no-unsafe-wp-apis
	__experimentalToggleGroupControl as ToggleGroupControl,
	// eslint-disable-next-line @finpress/no-unsafe-wp-apis
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	ExternalLink,
} from '@finpress/components';

/**
 * Internal dependencies
 */
import { DisplayStyle, IconStyle } from '@fincommerce/block-library/assets/js/blocks/customer-account/types';

interface BlockSettingsProps {
	attributes: BlockAttributes;
	setAttributes: ( attrs: BlockAttributes ) => void;
}

const AccountSettingsLink = () => {
	const accountSettingsUrl = `${ getSetting(
		'adminUrl'
	) }admin.php?page=wc-settings&tab=account`;

	const linkText = createInterpolateElement(
		`<a>${ __( 'Manage account settings', 'fincommerce' ) }</a>`,
		{
			a: <ExternalLink href={ accountSettingsUrl } />,
		}
	);

	return (
		<div className="wc-block-editor-customer-account__link">
			{ linkText }
		</div>
	);
};

export const BlockSettings = ( {
	attributes,
	setAttributes,
}: BlockSettingsProps ) => {
	const { displayStyle, iconStyle } = attributes;
	const displayIconStyleSelector = [
		DisplayStyle.ICON_ONLY,
		DisplayStyle.ICON_AND_TEXT,
	].includes( displayStyle );

	return (
		<InspectorControls key="inspector">
			<PanelBody>
				<AccountSettingsLink />
			</PanelBody>
			<PanelBody title={ __( 'Display settings', 'fincommerce' ) }>
				<SelectControl
					className="customer-account-display-style"
					label={ __( 'Icon options', 'fincommerce' ) }
					value={ displayStyle }
					onChange={ ( value: DisplayStyle ) => {
						setAttributes( { displayStyle: value } );
					} }
					help={ __(
						'Choose if you want to include an icon with the customer account link.',
						'fincommerce'
					) }
					options={ [
						{
							value: DisplayStyle.ICON_AND_TEXT,
							label: __( 'Icon and text', 'fincommerce' ),
						},
						{
							value: DisplayStyle.TEXT_ONLY,
							label: __( 'Text-only', 'fincommerce' ),
						},
						{
							value: DisplayStyle.ICON_ONLY,
							label: __( 'Icon-only', 'fincommerce' ),
						},
					] }
				/>
				{ displayIconStyleSelector ? (
					<ToggleGroupControl
						label={ __( 'Display Style', 'fincommerce' ) }
						isBlock
						value={ iconStyle }
						onChange={ ( value: IconStyle ) =>
							setAttributes( {
								iconStyle: value,
							} )
						}
						className="wc-block-editor-customer-account__icon-style-toggle"
					>
						<ToggleGroupControlOption
							value={ IconStyle.LINE }
							label={
								<Icon
									icon={ customerAccountStyleLine }
									size={ 32 }
									className={ clsx(
										'wc-block-editor-customer-account__icon-option',
										{
											active:
												iconStyle === IconStyle.LINE,
										}
									) }
								/>
							}
						/>
						<ToggleGroupControlOption
							value={ IconStyle.DEFAULT }
							label={
								<Icon
									icon={ customerAccountStyle }
									size={ 32 }
									className={ clsx(
										'wc-block-editor-customer-account__icon-option',
										{
											active:
												iconStyle === IconStyle.DEFAULT,
										}
									) }
								/>
							}
						/>
						<ToggleGroupControlOption
							value={ IconStyle.ALT }
							label={
								<Icon
									icon={ customerAccountStyleAlt }
									size={ 32 }
									className={ clsx(
										'wc-block-editor-customer-account__icon-option',
										{
											active: iconStyle === IconStyle.ALT,
										}
									) }
								/>
							}
						/>
					</ToggleGroupControl>
				) : null }
			</PanelBody>
		</InspectorControls>
	);
};
