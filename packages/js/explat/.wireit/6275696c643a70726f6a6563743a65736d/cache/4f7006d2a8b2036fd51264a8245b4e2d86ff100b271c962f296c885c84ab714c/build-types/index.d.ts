declare global {
    interface Window {
        wcTracks: {
            isEnabled: boolean;
            enable?: (cb: () => void) => void;
        };
        _wca: {
            push?: (cb: () => void) => void;
        };
    }
}
export declare const initializeExPlat: () => void;
export declare const loadExperimentAssignment: (experimentName: string) => Promise<import("@automattic/explat-client").ExperimentAssignment>, dangerouslyGetExperimentAssignment: (experimentName: string) => import("@automattic/explat-client").ExperimentAssignment;
export declare const useExperiment: (experimentName: string, options?: import("@automattic/explat-client-react-helpers").ExperimentOptions) => [boolean, import("@automattic/explat-client").ExperimentAssignment | null], Experiment: (props: {
    name: string;
    defaultExperience: React.ReactNode;
    treatmentExperience: React.ReactNode;
    loadingExperience: React.ReactNode;
    options?: import("@automattic/explat-client-react-helpers").ExperimentOptions;
}) => JSX.Element, ProvideExperimentData: (props: {
    children: (isLoading: boolean, experimentAssignment: import("@automattic/explat-client").ExperimentAssignment | null) => JSX.Element;
    name: string;
    options?: import("@automattic/explat-client-react-helpers").ExperimentOptions;
}) => JSX.Element;
export declare const loadExperimentAssignmentWithAuth: (experimentName: string) => Promise<import("@automattic/explat-client").ExperimentAssignment>, dangerouslyGetExperimentAssignmentWithAuth: (experimentName: string) => import("@automattic/explat-client").ExperimentAssignment;
export declare const useExperimentWithAuth: (experimentName: string, options?: import("@automattic/explat-client-react-helpers").ExperimentOptions) => [boolean, import("@automattic/explat-client").ExperimentAssignment | null], ExperimentWithAuth: (props: {
    name: string;
    defaultExperience: React.ReactNode;
    treatmentExperience: React.ReactNode;
    loadingExperience: React.ReactNode;
    options?: import("@automattic/explat-client-react-helpers").ExperimentOptions;
}) => JSX.Element, ProvideExperimentDataWithAuth: (props: {
    children: (isLoading: boolean, experimentAssignment: import("@automattic/explat-client").ExperimentAssignment | null) => JSX.Element;
    name: string;
    options?: import("@automattic/explat-client-react-helpers").ExperimentOptions;
}) => JSX.Element;
//# sourceMappingURL=index.d.ts.map