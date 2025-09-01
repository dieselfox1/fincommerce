/**
 * External dependencies
 */
import { Product } from '@fincommerce/data';
import { MouseEvent, ReactNode } from 'react';
import { WPError } from '../../../../hooks/use-error-handler';
import { SaveDraftButtonProps } from '../../save-draft-button';
export declare function useSaveDraft({ productStatus, productType, disabled, onClick, onSaveSuccess, onSaveError, ...props }: SaveDraftButtonProps & {
    onSaveSuccess?(product: Product): void;
    onSaveError?(error: WPError): void;
}): {
    'aria-disabled': any;
    variant: "tertiary";
    onClick: (event: MouseEvent<HTMLElement>) => Promise<void>;
    visibleTab?: string | null;
    href?: string;
    children: string | import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | Iterable<ReactNode>;
};
//# sourceMappingURL=use-save-draft.d.ts.map