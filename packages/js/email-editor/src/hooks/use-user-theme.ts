/**
 * External dependencies
 */
import { useCallback } from '@finpress/element';
import { useSelect, dispatch } from '@finpress/data';
import { store as coreStore } from '@finpress/core-data';

/**
 * Internal dependencies
 */
import { EmailTheme, storeName } from '../store';

export function useUserTheme() {
	const { globalStylePost } = useSelect( ( select ) => {
		const post =
			( select( storeName ).getGlobalEmailStylesPost() as EmailTheme & {
				id: number;
			} ) || null;
		return {
			globalStylePost: post,
		};
	}, [] );

	const updateGlobalStylesPost = useCallback(
		( newTheme: EmailTheme ) => {
			if ( ! globalStylePost ) {
				return;
			}
			void dispatch( coreStore ).editEntityRecord(
				'postType',
				'wp_global_styles',
				globalStylePost.id,
				{
					styles: newTheme.styles,
					settings: newTheme.settings,
				}
			);
		},
		[ globalStylePost ]
	);

	return {
		userTheme: {
			settings: globalStylePost?.settings,
			styles: globalStylePost?.styles,
		},
		updateUserTheme: updateGlobalStylesPost,
	};
}
