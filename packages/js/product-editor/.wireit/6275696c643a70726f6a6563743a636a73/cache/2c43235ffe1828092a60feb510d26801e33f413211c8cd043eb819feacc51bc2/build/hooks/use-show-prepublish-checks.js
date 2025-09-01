"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useShowPrepublishChecks = useShowPrepublishChecks;
/**
 * External dependencies
 */
const data_1 = require("@wordpress/data");
const data_2 = require("@fincommerce/data");
/**
 * Internal dependencies
 */
const constants_1 = require("../constants");
function useShowPrepublishChecks() {
    const { updateOptions } = (0, data_1.useDispatch)(data_2.optionsStore);
    const { isResolving, showPrepublishChecks } = (0, data_1.useSelect)((select) => {
        const { getOption, hasFinishedResolution } = select(data_2.optionsStore);
        const showPrepublishChecksOption = getOption(constants_1.SHOW_PREPUBLISH_CHECKS_ENABLED_OPTION_NAME) || 'yes';
        const resolving = !hasFinishedResolution('getOption', [
            constants_1.SHOW_PREPUBLISH_CHECKS_ENABLED_OPTION_NAME,
        ]);
        return {
            isResolving: resolving,
            showPrepublishChecks: showPrepublishChecksOption === 'yes',
        };
    }, []);
    const togglePrepublishChecks = () => {
        updateOptions({
            [constants_1.SHOW_PREPUBLISH_CHECKS_ENABLED_OPTION_NAME]: showPrepublishChecks
                ? 'no'
                : 'yes',
        });
    };
    return {
        isResolving,
        showPrepublishChecks,
        togglePrepublishChecks,
    };
}
