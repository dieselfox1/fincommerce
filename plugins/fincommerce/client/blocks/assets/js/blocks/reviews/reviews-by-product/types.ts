/**
 * External dependencies
 */
import { BlockEditProps } from '@finpress/blocks';

interface ReviewByProductAttributes {
	editMode: boolean;
	productId: number;
}

export interface ReviewsByProductEditorProps
	extends BlockEditProps< ReviewByProductAttributes > {
	attributes: ReviewByProductAttributes;
	debouncedSpeak: ( message: string ) => void;
}
