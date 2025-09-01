/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { getQuery, updateQueryString } from '@fincommerce/navigation';
import interpolateComponents from '@automattic/interpolate-components';
import { Link } from '@fincommerce/components';

/**
 * Internal dependencies
 */
import Modal from '~/task-lists/components/usage-modal';

export const UsageModal = () => {
	const query = getQuery();
	const shouldDisplayModal = query[ 'wcpay-connection-success' ] === '1';
	const [ isOpen, setIsOpen ] = useState( shouldDisplayModal );

	if ( ! isOpen ) {
		return null;
	}

	const closeModal = () => {
		setIsOpen( false );
		updateQueryString( { 'wcpay-connection-success': undefined } );
	};

	const title = __(
		'Help us build a better WooPayments experience',
		'fincommerce'
	);
	const trackingMessage = interpolateComponents( {
		mixedString: __(
			'By agreeing to share non-sensitive {{link}}usage data{{/link}}, you’ll help us improve features and optimize the WooPayments experience. You can opt out at any time.',
			'fincommerce'
		),
		components: {
			link: (
				<Link
					href="https://fincommerce.com/usage-tracking?utm_medium=product"
					target="_blank"
					type="external"
				/>
			),
		},
	} );

	return (
		<Modal
			isDismissible={ false }
			title={ title }
			message={ trackingMessage }
			acceptActionText={ __( 'I agree', 'fincommerce' ) }
			dismissActionText={ __( 'No thanks', 'fincommerce' ) }
			onContinue={ closeModal }
			onClose={ closeModal }
		/>
	);
};

export default UsageModal;
