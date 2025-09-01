/**
 * External dependencies
 */
import { Guide, Button, Icon } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { closeSmall } from '@wordpress/icons';
import { updateQueryString } from '@fincommerce/navigation';
import { useSearchParams } from 'react-router-dom';

/**
 * Internal dependencies
 */
import './style.scss';
import Illustration from './email-improvements.png';

interface EmailImprovementsModalProps {
	type: 'enabled' | 'try';
}

export const EmailImprovementsModal = ( {
	type,
}: EmailImprovementsModalProps ) => {
	const [ guideIsOpen, setGuideIsOpen ] = useState( false );
	const [ searchParams ] = useSearchParams();

	let title = __( 'Your store emails have had an upgrade!', 'fincommerce' );
	let description = __(
		'We’ve made some exciting improvements to your email templates, including modern, shopper-friendly designs and new customization options. Head to your email settings to explore the new changes.',
		'fincommerce'
	);

	if ( type === 'try' ) {
		title = __( 'Store emails have had an upgrade!', 'fincommerce' );
		description = __(
			'We’ve made some exciting improvements to our email templates, including modern, shopper-friendly designs and new customization options. Head to your email settings to explore the new features.',
			'fincommerce'
		);
	}

	useEffect( () => {
		if ( searchParams.get( 'emailImprovementsModal' ) ) {
			setGuideIsOpen( true );
		} else {
			setGuideIsOpen( false );
		}
	}, [ searchParams ] );

	const clearQueryString = () => {
		updateQueryString(
			{
				emailImprovementsModal: undefined,
			},
			undefined,
			Object.fromEntries( searchParams.entries() )
		);
	};

	const onFinish = () => {
		clearQueryString();
		setGuideIsOpen( false );
	};

	return (
		<>
			{ guideIsOpen && (
				<Guide
					onFinish={ onFinish }
					contentLabel=""
					className="fincommerce__email-improvements-modal"
					pages={ [
						{
							content: (
								<div className="email-improvements-modal-layout">
									<div className="email-improvements-modal-content">
										<div className="email-improvements-modal-content-image">
											<img
												src={ Illustration }
												alt=""
												width={ 250 }
												height={ 240 }
											/>
										</div>
										<div>
											<h1>{ title }</h1>
											<p>{ description }</p>
										</div>
										<div className="email-improvements-modal-footer">
											<Button
												variant="tertiary"
												href="https://developer.fincommerce.com/2025/04/09/fincommerce-9-8-modernized-designs-and-email-previews/"
												target="_blank"
											>
												{ __(
													'Learn more',
													'fincommerce'
												) }
											</Button>
											{ type === 'try' ? (
												<Button
													variant="primary"
													href="?page=wc-settings&tab=email&try-new-templates"
												>
													{ __(
														'Try the new templates',
														'fincommerce'
													) }
												</Button>
											) : (
												<Button
													variant="primary"
													href="?page=wc-settings&tab=email"
												>
													{ __(
														'Customize your emails',
														'fincommerce'
													) }
												</Button>
											) }
										</div>
									</div>
									<Button
										variant="tertiary"
										className="email-improvements-modal-close-button"
										label={ __( 'Close', 'fincommerce' ) }
										icon={
											<Icon
												icon={ closeSmall }
												viewBox="6 4 12 14"
											/>
										}
										iconSize={ 24 }
										onClick={ onFinish }
									></Button>
								</div>
							),
						},
					] }
				/>
			) }
		</>
	);
};
