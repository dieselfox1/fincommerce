/**
 * External dependencies
 */
import type { ProductAttribute } from '@fincommerce/data';
export type AttributesComboboxControlItem = Pick<ProductAttribute, 'id' | 'name'> & {
    isDisabled?: boolean;
    takenBy?: number;
};
export type AttributesComboboxControlComponent = {
    label?: string;
    help?: JSX.Element | string | null;
    isLoading: boolean;
    placeholder?: string;
    disabled?: boolean;
    instanceNumber?: number;
    current: AttributesComboboxControlItem | null;
    items: AttributesComboboxControlItem[];
    disabledAttributeMessage?: string;
    createNewAttributesAsGlobal?: boolean;
    onAddNew?: (value: string) => void;
    onChange: (value: AttributesComboboxControlItem) => void;
};
export type ComboboxControlOption = {
    label: string;
    value: string;
    state?: 'draft' | 'creating' | 'justCreated';
    disabled?: boolean;
};
//# sourceMappingURL=types.d.ts.map