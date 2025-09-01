"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFeedbackBar = void 0;
/**
 * External dependencies
 */
const data_1 = require("@wordpress/data");
const data_2 = require("@fincommerce/data");
/**
 * Internal dependencies
 */
const constants_1 = require("../../constants");
const useFeedbackBar = () => {
    const { updateOptions } = (0, data_1.useDispatch)(data_2.optionsStore);
    const { shouldShowFeedbackBar } = (0, data_1.useSelect)((select) => {
        const { getOption, hasFinishedResolution } = select(data_2.optionsStore);
        const showFeedbackBarOption = getOption(constants_1.PRODUCT_EDITOR_SHOW_FEEDBACK_BAR_OPTION_NAME);
        const resolving = !hasFinishedResolution('getOption', [
            constants_1.PRODUCT_EDITOR_SHOW_FEEDBACK_BAR_OPTION_NAME,
        ]);
        return {
            shouldShowFeedbackBar: !resolving &&
                window.wcTracks?.isEnabled &&
                showFeedbackBarOption === 'yes',
        };
    }, []);
    const showFeedbackBar = () => {
        updateOptions({
            [constants_1.PRODUCT_EDITOR_SHOW_FEEDBACK_BAR_OPTION_NAME]: 'yes',
        });
    };
    const getOptions = async () => {
        const { getOption } = (0, data_1.resolveSelect)(data_2.optionsStore);
        const showFeedbackBarOption = (await getOption(constants_1.PRODUCT_EDITOR_SHOW_FEEDBACK_BAR_OPTION_NAME));
        return {
            showFeedbackBarOption,
        };
    };
    const maybeShowFeedbackBar = async () => {
        const { showFeedbackBarOption } = await getOptions();
        if (window.wcTracks?.isEnabled && showFeedbackBarOption !== 'no') {
            showFeedbackBar();
        }
    };
    const hideFeedbackBar = () => {
        updateOptions({
            [constants_1.PRODUCT_EDITOR_SHOW_FEEDBACK_BAR_OPTION_NAME]: 'no',
        });
    };
    return {
        shouldShowFeedbackBar,
        maybeShowFeedbackBar,
        hideFeedbackBar,
    };
};
exports.useFeedbackBar = useFeedbackBar;
