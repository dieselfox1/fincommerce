/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { Tooltip } from '@finpress/components';
import { Icon, chevronLeft } from '@finpress/icons';
import { getHistory, updateQueryString } from '@fincommerce/navigation';
import { ENTER, SPACE } from '@finpress/keycodes';
import { recordEvent } from '@fincommerce/tracks';

/**
 * Internal dependencies
 */
import './back-button.scss';

export type BackButtonProps = {
	title: string;
};

export const BackButton = ( { title }: BackButtonProps ) => {
	const homeText = __( 'FinCommerce Home', 'fincommerce' );

	const navigateHome = () => {
		recordEvent( 'topbar_back_button', {
			page_name: title,
		} );
		updateQueryString( {}, getHistory().location.pathname, {} );
	};

	// if it's a task list page, render a back button to the homescreen
	return (
		<Tooltip text={ homeText }>
			<div
				tabIndex={ 0 }
				role="button"
				data-testid="header-back-button"
				className="fincommerce-layout__header-back-button"
				onKeyDown={ ( { keyCode } ) => {
					if ( keyCode === ENTER || keyCode === SPACE ) {
						navigateHome();
					}
				} }
			>
				<Icon icon={ chevronLeft } onClick={ navigateHome } />
			</div>
		</Tooltip>
	);
};
