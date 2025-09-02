/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import clsx from 'clsx';
import { Button, Popover } from '@finpress/components';
import { createElement, Fragment, useState } from '@finpress/element';
import { KeyboardEvent } from 'react';
import { Icon, help } from '@finpress/icons';
import { useInstanceId } from '@finpress/compose';

type Position =
	| 'top left'
	| 'top right'
	| 'top center'
	| 'middle left'
	| 'middle right'
	| 'middle center'
	| 'bottom left'
	| 'bottom right'
	| 'bottom center';

type TooltipProps = {
	children?: JSX.Element | string;
	helperText?: string;
	position?: Position;
	text: JSX.Element | string;
	className?: string;
};

export const Tooltip = ( {
	children = <Icon icon={ help } />,
	className = '',
	helperText = __( 'Help', 'fincommerce' ),
	position = 'top center',
	text,
}: TooltipProps ) => {
	const [ isPopoverVisible, setIsPopoverVisible ] = useState( false );

	const uniqueIdentifier = useInstanceId(
		Tooltip,
		'product_tooltip'
	) as string;

	return (
		<>
			<div className={ clsx( 'fincommerce-tooltip', uniqueIdentifier ) }>
				<Button
					className={ clsx(
						'fincommerce-tooltip__button',
						className
					) }
					onKeyDown={ (
						event: KeyboardEvent< HTMLButtonElement >
					) => {
						if ( event.key !== 'Enter' ) {
							return;
						}
						setIsPopoverVisible( true );
					} }
					onClick={ () => setIsPopoverVisible( ! isPopoverVisible ) }
					label={ helperText }
				>
					{ children }
				</Button>

				{ isPopoverVisible && (
					<Popover
						focusOnMount={ true }
						position={ position }
						inline
						className="fincommerce-tooltip__text"
						onFocusOutside={ ( event ) => {
							if (
								event.currentTarget?.classList.contains(
									uniqueIdentifier
								)
							) {
								return;
							}
							setIsPopoverVisible( false );
						} }
						onKeyDown={ (
							event: KeyboardEvent< HTMLDivElement >
						) => {
							if ( event.key !== 'Escape' ) {
								return;
							}
							setIsPopoverVisible( false );
						} }
					>
						{ text }
					</Popover>
				) }
			</div>
		</>
	);
};
