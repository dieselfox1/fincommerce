/**
 * Internal dependencies
 */
import { TaskType, TaskListType, OnboardingState, ExtensionList, ProfileItems, GetJetpackAuthUrlResponse, CoreProfilerCompletedSteps } from './types';
import { WPDataSelectors } from '../types';
import { Plugin } from '../plugins/types';
export declare const getFreeExtensions: (state: OnboardingState) => ExtensionList[];
export declare const getProfileItems: (state: OnboardingState) => ProfileItems | Record<string, never>;
export declare const getProfileProgress: (state: OnboardingState) => Partial<CoreProfilerCompletedSteps>;
export declare const getTaskLists: ((state: OnboardingState) => TaskListType[]) & import("rememo").EnhancedSelector;
export declare const getTaskListsByIds: ((state: OnboardingState, ids: string[]) => TaskListType[]) & import("rememo").EnhancedSelector;
export declare const getTaskList: (state: OnboardingState, selector: string) => TaskListType | undefined;
export declare const getTask: (state: OnboardingState, selector: string) => TaskType | undefined;
export declare const getPaymentGatewaySuggestions: (state: OnboardingState) => Plugin[];
export declare const getOnboardingError: (state: OnboardingState, selector: string) => unknown | false;
export declare const isOnboardingRequesting: (state: OnboardingState, selector: string) => boolean;
export declare const getEmailPrefill: (state: OnboardingState) => string;
export declare const getProductTypes: (state: OnboardingState) => import("./types").OnboardingProductTypes;
export declare const getJetpackAuthUrl: (state: OnboardingState, query: {
    redirectUrl: string;
    from?: string;
}) => GetJetpackAuthUrlResponse;
export declare const getCoreProfilerCompletedSteps: ((state: OnboardingState) => Partial<CoreProfilerCompletedSteps>) & import("rememo").EnhancedSelector;
export declare const getMostRecentCoreProfilerStep: ((state: OnboardingState) => string | null) & import("rememo").EnhancedSelector;
export type OnboardingSelectors = {
    getProfileItems: () => ReturnType<typeof getProfileItems>;
    getProfileProgress: () => ReturnType<typeof getProfileProgress>;
    getPaymentGatewaySuggestions: () => ReturnType<typeof getPaymentGatewaySuggestions>;
    getOnboardingError: () => ReturnType<typeof getOnboardingError>;
    isOnboardingRequesting: () => ReturnType<typeof isOnboardingRequesting>;
    getTaskListsByIds: (ids: string[]) => ReturnType<typeof getTaskListsByIds>;
    getTaskLists: () => ReturnType<typeof getTaskLists>;
    getTaskList: (id: string) => ReturnType<typeof getTaskList>;
    getTask: (id: string) => ReturnType<typeof getTask>;
    getFreeExtensions: () => ReturnType<typeof getFreeExtensions>;
    getCoreProfilerCompletedSteps: () => ReturnType<typeof getCoreProfilerCompletedSteps>;
    getMostRecentCoreProfilerStep: () => ReturnType<typeof getMostRecentCoreProfilerStep>;
} & WPDataSelectors;
//# sourceMappingURL=selectors.d.ts.map