/**
 * Inspired by https://github.com/finpress/gutenberg/blob/ee3406972d4688cf90efecb49cb0b158f49652a4/packages/fields/src/fields/status/index.tsx
 * The statusField provided by @finpress/fields is not used because it doesn't allow custom statuses.
 */

/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { scheduled, published, cancelCircleFilled } from '@finpress/icons';
import { __experimentalHStack as HStack, Icon } from '@finpress/components';

export const EMAIL_STATUSES = [
	{
		value: 'enabled',
		label: __( 'Enabled', 'fincommerce' ),
		icon: published,
		description: __(
			'Email would be sent if trigger is met',
			'fincommerce'
		),
	},
	{
		value: 'disabled',
		label: __( 'Inactive', 'fincommerce' ),
		icon: cancelCircleFilled,
		description: __( 'Email would not be sent', 'fincommerce' ),
	},
	{
		value: 'manual',
		label: __( 'Manually sent', 'fincommerce' ),
		icon: scheduled,
		description: __(
			'Email can only be sent manually from the order screen',
			'fincommerce'
		),
	},
];

export const Status = ( { slug }: { slug: string | undefined } ) => {
	const status = slug
		? EMAIL_STATUSES.find( ( s ) => s.value === slug )
		: undefined;
	if ( ! status ) {
		return slug;
	}
	return (
		<HStack
			alignment="left"
			spacing={ 0 }
			className="fincommerce-email-listing-status"
		>
			<Icon icon={ status.icon } size={ 24 } />
			<span className="fincommerce-email-listing-status-label">
				{ status.label }
			</span>
		</HStack>
	);
};
