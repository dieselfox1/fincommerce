/**
 * Internal dependencies
 */
import { WPDataSelector, WPDataSelectors } from '../types';
import { PluginsState, RecommendedTypes, SelectorKeysWithActions } from './types';
export declare const getActivePlugins: (state: PluginsState) => string[];
export declare const getInstalledPlugins: (state: PluginsState) => string[];
export declare const isPluginsRequesting: (state: PluginsState, selector: SelectorKeysWithActions) => boolean;
export declare const getPluginsError: (state: PluginsState, selector: SelectorKeysWithActions) => {};
export declare const isJetpackConnected: (state: PluginsState) => boolean | undefined;
export declare const getJetpackConnectionData: (state: PluginsState) => import("./types").JetpackConnectionDataResponse | undefined;
export declare const getJetpackConnectUrl: (state: PluginsState, query: {
    redirect_url: string;
}) => unknown;
export declare const getPluginInstallState: (state: PluginsState, plugin: string) => "activated" | "installed" | "unavailable";
export declare const getPaypalOnboardingStatus: (state: PluginsState) => Partial<import("./types").PaypalOnboardingStatus> | undefined;
export declare const getRecommendedPlugins: (state: PluginsState, type: RecommendedTypes) => import("./types").Plugin[] | undefined;
export type PluginSelectors = {
    getActivePlugins: WPDataSelector<typeof getActivePlugins>;
    getInstalledPlugins: WPDataSelector<typeof getInstalledPlugins>;
    getPluginInstallState: WPDataSelector<typeof getPluginInstallState>;
    getRecommendedPlugins: WPDataSelector<typeof getRecommendedPlugins>;
    getJetpackConnectionData: WPDataSelector<typeof getJetpackConnectionData>;
    isJetpackConnected: WPDataSelector<typeof isJetpackConnected>;
    isPluginsRequesting: WPDataSelector<typeof isPluginsRequesting>;
} & WPDataSelectors;
//# sourceMappingURL=selectors.d.ts.map