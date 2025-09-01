export type ConditionalWrapperProps<T = JSX.Element> = {
    children: T;
    condition: boolean;
    wrapper: (children: T) => JSX.Element;
};
export declare const ConditionalWrapper: <T>({ condition, wrapper, children, }: ConditionalWrapperProps<T>) => JSX.Element | T;
//# sourceMappingURL=conditional-wrapper.d.ts.map