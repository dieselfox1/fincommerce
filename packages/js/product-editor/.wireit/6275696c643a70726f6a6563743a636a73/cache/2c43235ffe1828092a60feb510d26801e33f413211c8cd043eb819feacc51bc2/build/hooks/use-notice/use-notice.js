"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNotice = useNotice;
/**
 * External dependencies
 */
const data_1 = require("@wordpress/data");
const data_2 = require("@fincommerce/data");
/**
 * Internal dependencies
 */
const constants_1 = require("../../constants");
function useNotice() {
    const { updateOptions } = (0, data_1.useDispatch)(data_2.optionsStore);
    const { dismissedNotices, isResolving } = (0, data_1.useSelect)((select) => {
        const { getOption, hasFinishedResolution } = select(data_2.optionsStore);
        const dismissedNoticesOption = getOption(constants_1.SINGLE_VARIATION_NOTICE_DISMISSED_OPTION);
        const resolving = !hasFinishedResolution('getOption', [
            constants_1.SINGLE_VARIATION_NOTICE_DISMISSED_OPTION,
        ]);
        return {
            dismissedNotices: dismissedNoticesOption || [],
            isResolving: resolving,
        };
    }, []);
    const getOptions = async () => {
        const { getOption } = (0, data_1.resolveSelect)(data_2.optionsStore);
        const dismissedNoticesOption = (await getOption(constants_1.SINGLE_VARIATION_NOTICE_DISMISSED_OPTION));
        return {
            dismissedNoticesOption: dismissedNoticesOption || [],
        };
    };
    const dismissNotice = async (productId) => {
        const { dismissedNoticesOption } = await getOptions();
        updateOptions({
            [constants_1.SINGLE_VARIATION_NOTICE_DISMISSED_OPTION]: [
                ...dismissedNoticesOption,
                productId,
            ],
        });
    };
    return {
        dismissedNotices,
        dismissNotice,
        isResolving,
    };
}
