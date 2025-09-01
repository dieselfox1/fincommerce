type PluginHydrationData = {
    installedPlugins: string[];
    activePlugins: string[];
    jetpackStatus?: {
        isActive: boolean;
    };
};
export declare const withPluginsHydration: (data: PluginHydrationData) => (Inner: import("react").ComponentType<Record<string, unknown>>) => import("react").ComponentType<Record<string, unknown>>;
export {};
//# sourceMappingURL=with-plugins-hydration.d.ts.map