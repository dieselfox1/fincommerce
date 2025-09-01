import { Component, ReactNode, ErrorInfo } from 'react';
export type ErrorBoundaryProps = {
    /**
     * The content to be rendered inside the ErrorBoundary component.
     */
    children: ReactNode;
    /**
     * The custom error message to be displayed. Defaults to a generic message.
     */
    errorMessage?: ReactNode;
    /**
     * Determines whether to show an action button. Defaults to true.
     */
    showActionButton?: boolean;
    /**
     * The label to be used for the action button. Defaults to 'Reload'.
     */
    actionLabel?: string;
    /**
     * The callback function to be executed when the action button is clicked. Defaults to window.location.reload.
     *
     * @param error - The error that was caught.
     */
    actionCallback?: (error: Error) => void;
    /**
     * Determines whether to reset the error boundary state after the action is performed. Defaults to true.
     */
    resetErrorAfterAction?: boolean;
    /**
     * Callback function to be executed when an error is caught.
     *
     * @param error     - The error that was caught.
     * @param errorInfo - The error info object.
     */
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
};
type ErrorBoundaryState = {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
};
export declare class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    static defaultProps: Partial<ErrorBoundaryProps>;
    constructor(props: ErrorBoundaryProps);
    static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState>;
    componentDidCatch(_error: Error, errorInfo: ErrorInfo): void;
    handleReload: () => void;
    handleAction: () => void;
    render(): string | number | boolean | Iterable<ReactNode> | JSX.Element | null | undefined;
}
export {};
//# sourceMappingURL=index.d.ts.map