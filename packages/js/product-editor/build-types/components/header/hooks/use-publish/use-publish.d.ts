/**
 * External dependencies
 */
import { MouseEvent } from 'react';
import type { Product } from '@fincommerce/data';
import type { WPError } from '../../../../hooks/use-error-handler';
import type { PublishButtonProps } from '../../publish-button';
export declare function usePublish<T = Product>({ productType, disabled, onClick, onPublishSuccess, onPublishError, ...props }: PublishButtonProps & {
    onPublishSuccess?(product: T): void;
    onPublishError?(error: WPError): void;
}): {
    isBusy: boolean;
    'aria-disabled': boolean;
    variant: "primary";
    onClick: (event: MouseEvent<HTMLElement>) => void;
    isMenuButton?: boolean;
    isPrePublishPanelVisible?: boolean;
    visibleTab?: string | null;
    children: string;
};
//# sourceMappingURL=use-publish.d.ts.map