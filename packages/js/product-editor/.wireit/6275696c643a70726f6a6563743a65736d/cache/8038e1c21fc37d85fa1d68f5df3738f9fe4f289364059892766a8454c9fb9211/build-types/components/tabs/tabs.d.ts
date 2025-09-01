type TabsProps = {
    selected: string | null;
    onChange: (tabId: string) => void;
};
export type TabsFillProps = {
    onClick: (tabId: string) => void;
};
export declare function Tabs({ selected, onChange }: TabsProps): JSX.Element;
export {};
//# sourceMappingURL=tabs.d.ts.map