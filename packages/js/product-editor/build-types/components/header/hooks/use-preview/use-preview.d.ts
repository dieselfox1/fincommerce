/**
 * External dependencies
 */
import { Product } from '@fincommerce/data';
import { MouseEvent } from 'react';
import { WPError } from '../../../../hooks/use-error-handler';
import { PreviewButtonProps } from '../../preview-button';
export declare function usePreview({ productStatus, productType, disabled, onClick, onSaveSuccess, onSaveError, ...props }: PreviewButtonProps & {
    onSaveSuccess?(product: Product): void;
    onSaveError?(error: WPError): void;
}): {
    ref(element: HTMLAnchorElement): void;
    'aria-disabled': any;
    href: string | undefined;
    variant: "tertiary";
    onClick: (event: MouseEvent<HTMLElement>) => Promise<void>;
    visibleTab?: string | null;
    'aria-label': string;
    children: string;
    target: string;
};
//# sourceMappingURL=use-preview.d.ts.map