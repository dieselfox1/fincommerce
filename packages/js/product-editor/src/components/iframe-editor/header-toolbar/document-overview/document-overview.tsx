/**
 * External dependencies
 */
import { Button } from '@finpress/components';
import { createElement, forwardRef, useContext } from '@finpress/element';
import { listView as listViewIcon } from '@finpress/icons';
import { displayShortcut } from '@finpress/keycodes';
import { __ } from '@finpress/i18n';
import { Ref } from 'react';

/**
 * Internal dependencies
 */
import { DocumentOverviewProps } from './types';
import { EditorContext } from '../../context';

export const DocumentOverview = forwardRef(
	function ForwardedRefDocumentOverview(
		props: DocumentOverviewProps,
		ref: Ref< HTMLButtonElement >
	) {
		const { isDocumentOverviewOpened, setIsDocumentOverviewOpened } =
			useContext( EditorContext );

		function handleClick() {
			setIsDocumentOverviewOpened( ! isDocumentOverviewOpened );
		}

		return (
			<Button
				{ ...props }
				ref={ ref }
				icon={ listViewIcon }
				isPressed={ isDocumentOverviewOpened }
				/* translators: button label text should, if possible, be under 16 characters. */
				label={ __( 'Document overview', 'fincommerce' ) }
				shortcut={ displayShortcut.access( 'o' ) }
				onClick={ handleClick }
				className="document-overview"
			/>
		);
	}
);
