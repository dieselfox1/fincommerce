/**
 * External dependencies
 */
import { useSelect } from '@finpress/data';

/**
 * Internal dependencies
 */
import { store as marketingStore } from '~/marketing/data';
import { Post } from './types';

export const useBlogPosts = ( category: string ) => {
	return useSelect(
		( select ) => {
			const { getBlogPosts, getBlogPostsError, isResolving } =
				select( marketingStore );

			return {
				isLoading: isResolving( 'getBlogPosts', [ category ] ),
				error: getBlogPostsError( category ),
				posts: getBlogPosts( category ) as Post[],
			};
		},
		[ category ]
	);
};
