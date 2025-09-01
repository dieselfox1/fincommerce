/**
 * Internal dependencies
 */
import { WPDataSelector, WPDataSelectors } from '../types';
import { ProductFormState } from './types';
export declare const getFields: (state: ProductFormState) => import("./types").ProductFormField[];
export declare const getField: (state: ProductFormState, id: string) => import("./types").ProductFormField | undefined;
export declare const getProductForm: (state: ProductFormState) => {
    fields: import("./types").ProductFormField[];
    sections: import("./types").ProductFormSection[];
    subsections: import("./types").Subsection[];
    tabs: import("./types").Tabs[];
};
export type ProductFormSelectors = {
    getFields: WPDataSelector<typeof getFields>;
    getField: WPDataSelector<typeof getField>;
    getProductForm: WPDataSelector<typeof getProductForm>;
} & WPDataSelectors;
//# sourceMappingURL=selectors.d.ts.map