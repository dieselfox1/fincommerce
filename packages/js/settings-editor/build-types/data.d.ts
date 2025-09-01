declare const SettingsDataContext: import("react").Context<{
    settingsData: SettingsData;
    setSettingsData: (settingsData: SettingsData) => void;
    settingsScripts: Record<string, string[]>;
    setSettingsScripts: (settingsScripts: Record<string, string[]>) => void;
}>;
declare const SettingsDataProvider: ({ children, }: {
    children: React.ReactNode;
}) => JSX.Element;
export { SettingsDataContext, SettingsDataProvider };
//# sourceMappingURL=data.d.ts.map