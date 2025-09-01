/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { createElement, Fragment, useState } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { useInView } from 'react-intersection-observer';
import moment from 'moment';
import clsx from 'clsx';
import { H, Section } from '@fincommerce/components';
import { sanitize } from 'dompurify';

/**
 * Internal dependencies
 */
import { InboxNoteActionButton } from './action';
import { useCallbackOnLinkClick } from './use-callback-on-link-click';

const ALLOWED_TAGS = [ 'a', 'b', 'em', 'i', 'strong', 'p', 'br' ];
const ALLOWED_ATTR = [ 'target', 'href', 'rel', 'name', 'download' ];

const sanitizeHTML = ( html: string ) => {
	return {
		__html: sanitize( html, { ALLOWED_TAGS, ALLOWED_ATTR } ),
	};
};

type InboxNoteAction = {
	id: number;
	url: string;
	label: string;
	primary: boolean;
	actioned_text?: boolean;
};

type InboxNote = {
	id: number;
	status: string;
	title: string;
	name: string;
	content: string;
	date_created: string;
	date_created_gmt: string;
	actions: InboxNoteAction[];
	layout: string;
	image: string;
	is_deleted: boolean;
	type: string;
	is_read: boolean;
};

type InboxNoteProps = {
	note: InboxNote;
	onDismiss?: ( note: InboxNote ) => void;
	onNoteActionClick?: ( note: InboxNote, action: InboxNoteAction ) => void;
	onBodyLinkClick?: ( note: InboxNote, link: string ) => void;
	onNoteVisible?: ( note: InboxNote ) => void;
	className?: string;
};

const InboxNoteCard = ( {
	note,
	onDismiss,
	onNoteActionClick,
	onBodyLinkClick,
	onNoteVisible,
	className,
}: InboxNoteProps ) => {
	const [ clickedActionText, setClickedActionText ] = useState( false );
	const { ref } = useInView( {
		triggerOnce: true,
		// Set the threshold to 1 to ensure the entire note content is visible before the callback is called
		threshold: 1,
		onChange: ( inView: boolean ) => {
			if ( inView && onNoteVisible ) {
				onNoteVisible( note );
			}
		},
	} );

	const linkCallbackRef = useCallbackOnLinkClick( ( innerLink ) => {
		if ( onBodyLinkClick ) {
			onBodyLinkClick( note, innerLink );
		}
	} );

	const renderDismissButton = () => {
		if ( clickedActionText ) {
			return null;
		}

		return (
			<Button
				className="fincommerce-admin-dismiss-notification"
				onClick={ () => onDismiss && onDismiss( note ) }
			>
				{ __( 'Dismiss', 'fincommerce' ) }
			</Button>
		);
	};

	const onActionClicked = ( action: InboxNoteAction ) => {
		if ( onNoteActionClick ) {
			onNoteActionClick( note, action );
		}
		if ( ! action.actioned_text ) {
			return;
		}

		setClickedActionText( action.actioned_text );
	};

	const renderActions = () => {
		const { actions: noteActions } = note;

		if ( !! clickedActionText ) {
			return clickedActionText;
		}

		if ( ! noteActions ) {
			return;
		}

		return (
			<>
				{ noteActions.map( ( action ) => (
					<InboxNoteActionButton
						key={ action.id }
						label={ action.label }
						variant="secondary"
						href={
							action && action.url && action.url.length
								? action.url
								: undefined
						}
						onClick={ () => onActionClicked( action ) }
					/>
				) ) }
			</>
		);
	};

	const {
		content,
		date_created_gmt: dateCreatedGmt,
		image,
		is_deleted: isDeleted,
		layout,
		status,
		title,
		is_read,
	} = note;

	if ( isDeleted ) {
		return null;
	}

	const unread = is_read === false;
	const hasImage = layout === 'thumbnail';
	const cardClassName = clsx(
		'fincommerce-inbox-message',
		className,
		layout,
		{
			'message-is-unread': unread && status === 'unactioned',
		}
	);

	const actionWrapperClassName = clsx( 'fincommerce-inbox-message__actions', {
		'has-multiple-actions': note.actions?.length > 1,
	} );

	return (
		<section ref={ ref } className={ cardClassName }>
			{ hasImage && (
				<div className="fincommerce-inbox-message__image">
					<img src={ image } alt="" />
				</div>
			) }
			<div className="fincommerce-inbox-message__wrapper">
				<div className="fincommerce-inbox-message__content">
					{ unread && (
						<div className="fincommerce-inbox-message__unread-indicator" />
					) }
					{ dateCreatedGmt && (
						<span className="fincommerce-inbox-message__date">
							{ moment.utc( dateCreatedGmt ).fromNow() }
						</span>
					) }
					<H className="fincommerce-inbox-message__title">
						{ note.actions && note.actions.length === 1 && (
							<InboxNoteActionButton
								key={ note.actions[ 0 ].id }
								label={ title }
								preventBusyState={ true }
								variant="link"
								href={
									note.actions[ 0 ].url &&
									note.actions[ 0 ].url.length
										? note.actions[ 0 ].url
										: undefined
								}
								onClick={ () =>
									onActionClicked( note.actions[ 0 ] )
								}
							/>
						) }

						{ note.actions && note.actions.length > 1 && title }
					</H>
					<Section className="fincommerce-inbox-message__text">
						<span
							dangerouslySetInnerHTML={ sanitizeHTML( content ) }
							ref={ linkCallbackRef }
						/>
					</Section>
				</div>
				<div className={ actionWrapperClassName }>
					{ renderActions() }
					{ renderDismissButton() }
				</div>
			</div>
		</section>
	);
};

export { InboxNoteCard, InboxNote, InboxNoteAction };
