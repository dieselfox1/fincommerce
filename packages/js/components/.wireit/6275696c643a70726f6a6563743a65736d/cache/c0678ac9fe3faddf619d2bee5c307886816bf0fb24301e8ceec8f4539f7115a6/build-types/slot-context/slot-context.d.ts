type FillConfigType = {
    visible: boolean;
};
type FillType = Record<string, FillConfigType>;
type FillCollection = readonly (readonly JSX.Element[])[];
export type SlotContextHelpersType = {
    hideFill: (id: string) => void;
    showFill: (id: string) => void;
    getFills: () => FillType;
};
export type SlotContextType = {
    fills: FillType;
    getFillHelpers: () => SlotContextHelpersType;
    registerFill: (id: string) => void;
    filterRegisteredFills: (fillsArrays: FillCollection) => FillCollection;
};
export declare const SlotContextProvider: ({ children, }: React.PropsWithChildren) => JSX.Element;
export declare const useSlotContext: () => SlotContextType;
export {};
//# sourceMappingURL=slot-context.d.ts.map