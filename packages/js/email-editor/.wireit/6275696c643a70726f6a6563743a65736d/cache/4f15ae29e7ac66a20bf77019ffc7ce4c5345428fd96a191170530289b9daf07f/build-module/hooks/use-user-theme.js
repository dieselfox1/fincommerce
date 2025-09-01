/**
 * External dependencies
 */
import { useCallback } from '@wordpress/element';
import { useSelect, dispatch } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
/**
 * Internal dependencies
 */
import { storeName } from '../store';
export function useUserTheme() {
    const { globalStylePost } = useSelect((select) => {
        const post = select(storeName).getGlobalEmailStylesPost() || null;
        return {
            globalStylePost: post,
        };
    }, []);
    const updateGlobalStylesPost = useCallback((newTheme) => {
        if (!globalStylePost) {
            return;
        }
        void dispatch(coreStore).editEntityRecord('postType', 'wp_global_styles', globalStylePost.id, {
            styles: newTheme.styles,
            settings: newTheme.settings,
        });
    }, [globalStylePost]);
    return {
        userTheme: {
            settings: globalStylePost?.settings,
            styles: globalStylePost?.styles,
        },
        updateUserTheme: updateGlobalStylesPost,
    };
}
