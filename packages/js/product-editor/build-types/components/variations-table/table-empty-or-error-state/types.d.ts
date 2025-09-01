/**
 * External dependencies
 */
import { MouseEvent } from 'react';
export type TableEmptyOrErrorStateProps = {
    message?: string;
    actionText?: string;
    isError: boolean;
    onActionClick(event: MouseEvent<HTMLButtonElement>): void;
};
//# sourceMappingURL=types.d.ts.map