import { BlockAttributes } from '@wordpress/blocks';
/**
 * Internal dependencies
 */
import { ProductEditorBlockEditProps } from '../../../types';
export interface Image {
    id: number;
    src: string;
    name: string;
    alt: string;
}
export declare function ImageBlockEdit({ attributes, context, }: ProductEditorBlockEditProps<BlockAttributes>): JSX.Element;
//# sourceMappingURL=edit.d.ts.map