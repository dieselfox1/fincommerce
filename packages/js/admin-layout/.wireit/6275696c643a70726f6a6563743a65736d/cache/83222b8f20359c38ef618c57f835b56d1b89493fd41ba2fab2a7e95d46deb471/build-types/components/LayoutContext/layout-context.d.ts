export type LayoutContextType = {
    layoutString: string;
    extendLayout: (item: string) => LayoutContextType;
    layoutParts: string[];
    isDescendantOf: (item: string) => boolean;
};
type LayoutContextProviderProps = {
    children: React.ReactNode;
    value: LayoutContextType;
};
export declare const LayoutContext: import("react").Context<LayoutContextType | undefined>;
export declare const getLayoutContextValue: (layoutParts?: LayoutContextType["layoutParts"]) => LayoutContextType;
export declare const LayoutContextProvider: ({ children, value, }: LayoutContextProviderProps) => JSX.Element;
export declare const useLayoutContext: () => LayoutContextType;
export declare const useExtendLayout: (item: string) => LayoutContextType;
export {};
//# sourceMappingURL=layout-context.d.ts.map