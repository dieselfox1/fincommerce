"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCustomerEffortScoreModal = void 0;
/**
 * External dependencies
 */
const data_1 = require("@wordpress/data");
const data_2 = require("@fincommerce/data");
/**
 * Internal dependencies
 */
const constants_1 = require("../../constants");
const store_1 = require("../../store");
const useCustomerEffortScoreModal = () => {
    const { showCesModal: _showCesModal, showProductMVPFeedbackModal } = (0, data_1.useDispatch)(store_1.STORE_KEY);
    const { updateOptions } = (0, data_1.useDispatch)(data_2.optionsStore);
    const { wasPreviouslyShown, isLoading } = (0, data_1.useSelect)((select) => {
        const { getOption, hasFinishedResolution } = select(data_2.optionsStore);
        const shownForActionsOption = getOption(constants_1.SHOWN_FOR_ACTIONS_OPTION_NAME) || [];
        const resolving = !hasFinishedResolution('getOption', [
            constants_1.SHOWN_FOR_ACTIONS_OPTION_NAME,
        ]);
        return {
            wasPreviouslyShown: (action) => {
                return shownForActionsOption.includes(action);
            },
            isLoading: resolving,
        };
    }, []);
    const markCesAsShown = async (action) => {
        const { getOption } = (0, data_1.resolveSelect)(data_2.optionsStore);
        const shownForActionsOption = (await getOption(constants_1.SHOWN_FOR_ACTIONS_OPTION_NAME)) || [];
        updateOptions({
            [constants_1.SHOWN_FOR_ACTIONS_OPTION_NAME]: [
                action,
                ...shownForActionsOption,
            ],
        });
    };
    const showCesModal = (surveyProps = {}, props = {}, onSubmitNoticeProps = {}, tracksProps = {}) => {
        _showCesModal(surveyProps, props, onSubmitNoticeProps, tracksProps);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore We don't have type definitions for this.
        markCesAsShown(surveyProps.action);
    };
    return {
        wasPreviouslyShown,
        isLoading,
        showCesModal,
        showProductMVPFeedbackModal,
    };
};
exports.useCustomerEffortScoreModal = useCustomerEffortScoreModal;
