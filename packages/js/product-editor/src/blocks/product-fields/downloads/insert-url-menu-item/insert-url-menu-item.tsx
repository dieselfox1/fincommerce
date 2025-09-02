/**
 * External dependencies
 */
import { FocusEvent, FormEvent } from 'react';
import { createElement } from '@finpress/element';
import { __ } from '@finpress/i18n';
import { customLink, keyboardReturn } from '@finpress/icons';
import { MediaItem } from '@finpress/media-utils';
import {
	Button,
	Dropdown,
	MenuItem,
	__experimentalInputControl as InputControl,
} from '@finpress/components';

/**
 * Internal dependencies
 */
import { InsertUrlMenuItemProps } from './types';

function validateInput( input: HTMLInputElement ) {
	input.required = true;
	input.setCustomValidity( '' );

	if ( input.validity.valueMissing ) {
		input.setCustomValidity( __( 'The URL is required', 'fincommerce' ) );
	}

	if ( input.validity.typeMismatch ) {
		input.setCustomValidity( __( 'Insert a valid URL', 'fincommerce' ) );
	}
}

export function InsertUrlMenuItem( {
	onLinkSuccess,
	onLinkError,
}: InsertUrlMenuItemProps ) {
	function handleSubmit( event: FormEvent< HTMLFormElement > ) {
		event.preventDefault();

		const form = event.currentTarget;

		const urlInput: HTMLInputElement = form.url;
		validateInput( urlInput );

		if ( form.checkValidity() ) {
			const url = form.url.value;
			const mediaItem = {
				url,
			} as MediaItem;

			onLinkSuccess( [ mediaItem ] );
		} else {
			onLinkError( urlInput.validationMessage );
		}
	}

	function handleInput( event: FormEvent< HTMLInputElement > ) {
		const urlInput = event.target as HTMLInputElement;

		validateInput( urlInput );
	}

	function handleBlur( event: FocusEvent< HTMLInputElement > ) {
		const urlInput = event.target;

		validateInput( urlInput );
	}

	return (
		<Dropdown
			popoverProps={ {
				placement: 'left',
			} }
			renderToggle={ ( { isOpen, onToggle } ) => (
				<MenuItem
					aria-expanded={ isOpen }
					icon={ customLink }
					iconPosition="left"
					onClick={ onToggle }
					info={ __(
						'Link to a file hosted elsewhere',
						'fincommerce'
					) }
				>
					{ __( 'Insert from URL', 'fincommerce' ) }
				</MenuItem>
			) }
			renderContent={ () => (
				<form
					className="components-dropdown-menu__menu"
					noValidate
					onSubmit={ handleSubmit }
				>
					<InputControl
						name="url"
						type="url"
						placeholder={ __( 'Insert URL', 'fincommerce' ) }
						suffix={
							<Button icon={ keyboardReturn } type="submit" />
						}
						className="fincommerce-inert-url-menu-item__input"
						aria-label={ __( 'Insert URL', 'fincommerce' ) }
						onInput={ handleInput }
						onBlur={ handleBlur }
					/>
				</form>
			) }
		/>
	);
}
