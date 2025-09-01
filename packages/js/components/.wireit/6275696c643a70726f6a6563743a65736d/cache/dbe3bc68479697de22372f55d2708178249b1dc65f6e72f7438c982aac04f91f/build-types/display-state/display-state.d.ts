/**
 * Internal dependencies
 */
export type DisplayStateProps = {
    state?: 'visible' | 'visually-hidden' | 'hidden';
    children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;
export declare const DisplayState: ({ state, children, ...props }: DisplayStateProps) => JSX.Element | null;
//# sourceMappingURL=display-state.d.ts.map