/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { Button, Icon } from '@finpress/components';
import { closeSmall } from '@finpress/icons';

/**
 * Internal dependencies
 */
import Illustration from '../illustrations/intro-devices-desktop.png';

export const ModalIllustrationLayout = ( {
	body,
	onDismiss,
}: {
	body: React.ReactNode;
	onDismiss: () => void;
} ) => {
	return (
		<div className="mobile-app-modal-layout">
			<div className="mobile-app-modal-content">{ body }</div>
			<div className="mobile-app-modal-illustration">
				<img
					src={ Illustration }
					alt={ __(
						'Screen captures of the FinCommerce mobile app',
						'fincommerce'
					) }
				/>
			</div>
			<Button
				variant="tertiary"
				className="fincommerce__mobile-app-welcome-modal__close-button"
				label={ __( 'Close', 'fincommerce' ) }
				icon={ <Icon icon={ closeSmall } viewBox="6 4 12 14" /> }
				iconSize={ 16 }
				onClick={ onDismiss }
			></Button>
		</div>
	);
};
