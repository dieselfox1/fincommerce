/**
 * External dependencies
 */
import { BlockEditProps } from '@finpress/blocks';

type Context = {
	context: { postId: string; postType: string };
};

export type Attributes = {
	align?: 'wide' | 'full';
	hideTabTitle: boolean;
};

export type ProductDetailsEditProps = BlockEditProps< Attributes > & Context;
