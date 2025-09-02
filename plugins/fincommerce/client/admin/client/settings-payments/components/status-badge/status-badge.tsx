/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { Pill } from '@fincommerce/components';
import { Popover } from '@finpress/components';
import { useState, useRef } from '@finpress/element';
import { Icon, info } from '@finpress/icons';

/**
 * Internal dependencies
 */
import './status-badge.scss';

interface StatusBadgeProps {
	/**
	 * Status of the badge. This decides which class to apply, and what the
	 * status message should be.
	 */
	status:
		| 'active'
		| 'inactive'
		| 'needs_setup'
		| 'test_mode'
		| 'test_account'
		| 'recommended'
		| 'has_incentive';
	/**
	 * Override the default status message to display a custom one. Optional.
	 */
	message?: string;
	/**
	 * Optionally pass in popover content (as a React element). If this is passed in,
	 * an info icon will be displayed which will show the popover content on hover.
	 */
	popoverContent?: React.ReactElement;
}

/**
 * A component that displays a status badge with a customizable appearance and message.
 * The appearance and default message are determined by the `status` prop,
 * but a custom message can be provided via the `message` prop.
 *
 * @example
 * // Render a status badge with the default message for "active" status.
 * <StatusBadge status="active" />
 *
 * @example
 * // Render a status badge with a custom message.
 * <StatusBadge status="inactive" message="Not in use" />
 *
 * @example
 * // Render a status badge which displays a popover.
 * <StatusBadge status="active" message="Active" popoverContent={ <p>This is an active status badge</p> } />
 */
export const StatusBadge = ( {
	status,
	message,
	popoverContent,
}: StatusBadgeProps ) => {
	const [ isPopoverVisible, setPopoverVisible ] = useState( false );
	const buttonRef = useRef< HTMLSpanElement >( null );

	const handleClick = ( event: React.MouseEvent | React.KeyboardEvent ) => {
		const clickedElement = event.target as HTMLElement;
		const parentSpan = clickedElement.closest(
			'.fincommerce-status-badge__icon-container'
		);

		if ( buttonRef.current && parentSpan !== buttonRef.current ) {
			return;
		}

		setPopoverVisible( ( prev ) => ! prev );
	};

	const handleFocusOutside = () => {
		setPopoverVisible( false );
	};

	/**
	 * Get the appropriate CSS class for the badge based on the status.
	 */
	const getStatusClass = () => {
		switch ( status ) {
			case 'active':
			case 'has_incentive':
				return 'fincommerce-status-badge--success';
			case 'needs_setup':
			case 'test_mode':
			case 'test_account':
				return 'fincommerce-status-badge--warning';
			case 'recommended':
			case 'inactive':
				return 'fincommerce-status-badge--info';
			default:
				return '';
		}
	};

	/**
	 * Get the default message for the badge based on the status.
	 */
	const getStatusMessage = () => {
		switch ( status ) {
			case 'active':
				return __( 'Active', 'fincommerce' );
			case 'inactive':
				return __( 'Inactive', 'fincommerce' );
			case 'needs_setup':
				return __( 'Action needed', 'fincommerce' );
			case 'test_mode':
				return __( 'Test mode', 'fincommerce' );
			case 'test_account':
				return __( 'Test account', 'fincommerce' );
			case 'recommended':
				return __( 'Recommended', 'fincommerce' );
			default:
				return '';
		}
	};

	return (
		<Pill className={ `fincommerce-status-badge ${ getStatusClass() }` }>
			{ message || getStatusMessage() }
			{ popoverContent && (
				<span
					className="fincommerce-status-badge__icon-container"
					tabIndex={ 0 }
					role="button"
					ref={ buttonRef }
					onClick={ handleClick }
					onKeyDown={ ( event: React.KeyboardEvent ) => {
						if ( event.key === 'Enter' || event.key === ' ' ) {
							handleClick( event );
						}
					} }
				>
					<Icon
						className="fincommerce-status-badge-icon"
						size={ 16 }
						icon={ info }
					/>
					{ isPopoverVisible && (
						<Popover
							className="fincommerce-status-badge-popover"
							placement="top-start"
							offset={ 4 }
							variant="unstyled"
							focusOnMount={ true }
							noArrow={ true }
							shift={ true }
							onFocusOutside={ handleFocusOutside }
						>
							<div className="components-popover__content-container">
								{ popoverContent }
							</div>
						</Popover>
					) }
				</span>
			) }
		</Pill>
	);
};
