import type { BlockAttributes } from '@wordpress/blocks';
import { ProductEditorBlockEditProps } from '../../../types';
export interface NoticeBlockAttributes extends BlockAttributes {
    buttonText: string;
    content: string;
    title: string;
    type: 'error-type' | 'success' | 'warning' | 'info';
}
export declare function Edit({ attributes, }: ProductEditorBlockEditProps<NoticeBlockAttributes>): JSX.Element;
//# sourceMappingURL=edit.d.ts.map