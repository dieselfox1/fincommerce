import { PartialProductVariation, ProductVariation } from '@fincommerce/data';
type VariationsTableProps = {
    isVisible?: boolean;
    noticeText?: string;
    noticeStatus?: 'error' | 'warning' | 'success' | 'info';
    onNoticeDismiss?: () => void;
    noticeActions?: {
        label: string;
        onClick: (handleUpdateAll: (values: PartialProductVariation[]) => void, handleDeleteAll: (values: PartialProductVariation[]) => void) => void;
        className?: string;
        variant?: 'link' | 'primary' | 'secondary';
    }[];
    onVariationTableChange?: (type: 'update' | 'delete', updates?: Partial<ProductVariation>[]) => void;
};
export declare const VariationsTable: import("react").ForwardRefExoticComponent<VariationsTableProps & import("react").RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=variations-table.d.ts.map