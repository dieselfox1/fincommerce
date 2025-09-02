/**
 * External dependencies
 */
import { BlockEditProps } from '@finpress/blocks';

type Context = {
	context: { postId: string; postType: string };
};

interface ProductSpecificationsAttributes {
	showWeight: boolean;
	showDimensions: boolean;
	showAttributes: boolean;
}

export type ProductSpecificationsEditProps =
	BlockEditProps< ProductSpecificationsAttributes > & Context;
