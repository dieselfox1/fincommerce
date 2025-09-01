import { EnhancedProductAttribute } from '../../hooks/use-product-attributes';
type EditAttributeModalProps = {
    title?: string;
    nameLabel?: string;
    globalAttributeHelperMessage?: JSX.Element;
    customAttributeHelperMessage?: string;
    termsLabel?: string;
    termsPlaceholder?: string;
    isDefaultLabel?: string;
    isDefaultTooltip?: string;
    useAsFilterLabel?: string;
    useAsFilterTooltip?: string;
    visibleLabel?: string;
    visibleTooltip?: string;
    cancelAccessibleLabel?: string;
    cancelLabel?: string;
    updateAccessibleLabel?: string;
    updateLabel?: string;
    onCancel: () => void;
    onEdit: (alteredAttribute: EnhancedProductAttribute) => void;
    attribute: EnhancedProductAttribute;
    attributes: EnhancedProductAttribute[];
};
export declare const EditAttributeModal: ({ title, nameLabel, globalAttributeHelperMessage, customAttributeHelperMessage, termsLabel, termsPlaceholder, isDefaultLabel, isDefaultTooltip, useAsFilterLabel, useAsFilterTooltip, visibleLabel, visibleTooltip, cancelAccessibleLabel, cancelLabel, updateAccessibleLabel, updateLabel, onCancel, onEdit, attribute, attributes, }: EditAttributeModalProps) => JSX.Element;
export {};
//# sourceMappingURL=edit-attribute-modal.d.ts.map