/**
 * Internal dependencies
 */
import { ShippingClassBlockAttributes } from './types';
import { ProductEditorBlockEditProps } from '../../../types';
type Select = {
    label: string;
    value: string;
};
export declare const DEFAULT_SHIPPING_CLASS_OPTIONS: Array<Select>;
export declare function Edit({ attributes, context: { postType, isInSelectedTab }, }: ProductEditorBlockEditProps<ShippingClassBlockAttributes>): JSX.Element;
export {};
//# sourceMappingURL=edit.d.ts.map