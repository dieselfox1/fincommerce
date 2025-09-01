/**
 * External dependencies
 */
import { ReactNode } from 'react';
export type NoticeProps = {
    title?: string;
    content?: string | ReactNode;
    className?: string;
    type?: 'error-type' | 'success' | 'warning' | 'info';
    children?: ReactNode;
    isDismissible?: boolean;
    handleDismiss?: () => void;
};
export declare function Notice({ title, content, className, type, children, isDismissible, handleDismiss, }: NoticeProps): JSX.Element;
//# sourceMappingURL=notice.d.ts.map