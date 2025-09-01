/**
 * External dependencies
 */
import { resolveSelect, useDispatch, useSelect } from '@wordpress/data';
import { optionsStore } from '@fincommerce/data';
/**
 * Internal dependencies
 */
import { SINGLE_VARIATION_NOTICE_DISMISSED_OPTION } from '../../constants';
export function useNotice() {
    const { updateOptions } = useDispatch(optionsStore);
    const { dismissedNotices, isResolving } = useSelect((select) => {
        const { getOption, hasFinishedResolution } = select(optionsStore);
        const dismissedNoticesOption = getOption(SINGLE_VARIATION_NOTICE_DISMISSED_OPTION);
        const resolving = !hasFinishedResolution('getOption', [
            SINGLE_VARIATION_NOTICE_DISMISSED_OPTION,
        ]);
        return {
            dismissedNotices: dismissedNoticesOption || [],
            isResolving: resolving,
        };
    }, []);
    const getOptions = async () => {
        const { getOption } = resolveSelect(optionsStore);
        const dismissedNoticesOption = (await getOption(SINGLE_VARIATION_NOTICE_DISMISSED_OPTION));
        return {
            dismissedNoticesOption: dismissedNoticesOption || [],
        };
    };
    const dismissNotice = async (productId) => {
        const { dismissedNoticesOption } = await getOptions();
        updateOptions({
            [SINGLE_VARIATION_NOTICE_DISMISSED_OPTION]: [
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
