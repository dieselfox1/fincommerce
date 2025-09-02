/**
 * External dependencies
 */
import { BlockEditProps } from '@finpress/blocks';

type Attributes = {
	tagName: 'div' | 'section' | 'aside';
};

type Context = {
	context: { postId: string; postType: string };
};

export type ProductReviewsEditProps = BlockEditProps< Attributes > & Context;
