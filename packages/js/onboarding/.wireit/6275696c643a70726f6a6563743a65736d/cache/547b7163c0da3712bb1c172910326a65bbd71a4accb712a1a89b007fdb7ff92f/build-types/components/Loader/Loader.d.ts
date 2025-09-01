import type { ReactNode } from 'react';
export declare const Loader: {
    ({ children, className, }: {
        children: ReactNode;
        className?: string;
    }): JSX.Element;
    Layout({ children, className, }: withClassName & withReactChildren): JSX.Element;
    Illustration({ children }: withReactChildren): JSX.Element;
    Title({ children, className, }: withClassName & withReactChildren): JSX.Element;
    ProgressBar({ progress, className, }: {
        progress: number;
    } & withClassName): JSX.Element;
    Subtext({ children, className, }: withReactChildren & withClassName): JSX.Element;
    Sequence: ({ interval, shouldLoop, children, onChange, }: {
        interval: number;
        shouldLoop?: boolean;
        onChange?: (index: number) => void;
    } & withReactChildren) => JSX.Element;
};
type withClassName = {
    className?: string;
};
type withReactChildren = {
    children: ReactNode;
};
export {};
//# sourceMappingURL=Loader.d.ts.map