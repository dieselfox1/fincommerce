/**
 * External dependencies
 */
import { useMemo } from '@finpress/element';
import { SnackbarList } from '@finpress/components';
import { __ } from '@finpress/i18n';
import { useSelect, useDispatch } from '@finpress/data';
import { store as noticesStore } from '@finpress/notices';

// See: https://github.com/finpress/gutenberg/blob/2788a9cf8b8149be3ee52dd15ce91fa55815f36a/packages/editor/src/components/editor-snackbars/index.js

export function EditorSnackbars( { context = 'email-editor' } ) {
	const { notices } = useSelect(
		( select ) => ( {
			notices: select( noticesStore ).getNotices( context ),
		} ),
		[ context ]
	);

	// Some global notices are not suitable for the email editor context
	// This map allows us to change the content of the notice
	const globalNoticeChangeMap = useMemo( () => {
		return {
			'site-editor-save-success': {
				content: __( 'Email design updated.', 'fincommerce' ),
				removeActions: true,
			},
			'editor-save': {
				content: __( 'Email saved.', 'fincommerce' ),
				removeActions: false,
				contentCheck: ( notice ) => {
					// eslint-disable-next-line @finpress/i18n-text-domain
					return notice.content.includes( __( 'Post updated.' ) ); // It is intentionally without domain to match core translation
				},
			},
		};
	}, [] );

	const { removeNotice } = useDispatch( noticesStore );

	const snackbarNotices = notices
		.filter( ( { type } ) => type === 'snackbar' )
		.map( ( notice ) => {
			if ( ! globalNoticeChangeMap[ notice.id ] ) {
				return notice;
			}
			if (
				globalNoticeChangeMap[ notice.id ].contentCheck &&
				! globalNoticeChangeMap[ notice.id ].contentCheck( notice )
			) {
				return notice;
			}
			return {
				...notice,
				content: globalNoticeChangeMap[ notice.id ].content,
				spokenMessage: globalNoticeChangeMap[ notice.id ].content,
				actions: globalNoticeChangeMap[ notice.id ].removeActions
					? []
					: notice.actions,
			};
		} );

	return (
		<SnackbarList
			notices={ snackbarNotices }
			className="components-editor-notices__snackbar"
			onRemove={ ( id ) => removeNotice( id, context ) }
		/>
	);
}
