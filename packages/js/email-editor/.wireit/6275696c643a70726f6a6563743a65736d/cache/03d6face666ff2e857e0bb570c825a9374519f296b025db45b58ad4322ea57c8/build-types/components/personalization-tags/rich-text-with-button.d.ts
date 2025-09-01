/**
 * External dependencies
 */
import type { ReactNode } from 'react';
type Props = {
    label: string;
    labelSuffix?: ReactNode;
    help?: ReactNode;
    placeholder: string;
    attributeName: string;
    attributeValue?: string;
    updateProperty: (theAttributeName: string, theUpdatedValue: string) => void;
};
export declare function RichTextWithButton({ label, labelSuffix, help, placeholder, attributeName, attributeValue, updateProperty, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
