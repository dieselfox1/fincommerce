import type { BlockAttributes } from '@wordpress/blocks';
import { ProductEditorBlockEditProps } from '../../../types';
export interface TabBlockAttributes extends BlockAttributes {
    id: string;
    title: string;
    isSelected?: boolean;
}
export declare function TabBlockEdit({ setAttributes, attributes, context, }: ProductEditorBlockEditProps<TabBlockAttributes>): JSX.Element;
//# sourceMappingURL=edit.d.ts.map