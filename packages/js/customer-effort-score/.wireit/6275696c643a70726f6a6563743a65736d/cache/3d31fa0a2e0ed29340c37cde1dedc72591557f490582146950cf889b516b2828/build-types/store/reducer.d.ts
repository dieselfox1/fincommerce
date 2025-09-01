export default reducer;
declare function reducer(state: {
    queue: never[];
    cesModalData: undefined;
    showCESModal: boolean;
    showProductMVPFeedbackModal: boolean;
} | undefined, action: any): {
    queue: any[];
    cesModalData: undefined;
    showCESModal: boolean;
    showProductMVPFeedbackModal: boolean;
} | {
    showCESModal: boolean;
    cesModalData: {
        action: any;
        description: any;
        showDescription: any;
        title: any;
        onSubmitLabel: any;
        firstQuestion: any;
        secondQuestion: any;
        onSubmitNoticeProps: any;
        props: any;
        tracksProps: any;
        getExtraFieldsToBeShown: any;
        validateExtraFields: any;
    };
    queue: never[];
    showProductMVPFeedbackModal: boolean;
};
//# sourceMappingURL=reducer.d.ts.map