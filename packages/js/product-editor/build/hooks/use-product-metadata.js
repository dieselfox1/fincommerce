"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore No types for this exist yet.
// eslint-disable-next-line @fincommerce/dependency-group
const core_data_1 = require("@wordpress/core-data");
/**
 * External dependencies
 */
const data_1 = require("@wordpress/data");
function useProductMetadata(options) {
    const postType = options?.postType || 'product';
    const thisId = (0, core_data_1.useEntityId)('postType', postType);
    const id = options?.id || thisId;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { editEntityRecord } = (0, data_1.useDispatch)('core');
    const { isLoading, meta_data } = (0, data_1.useSelect)((select) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { getEditedEntityRecord, hasFinishedResolution } = select('core');
        // @ts-expect-error Selector is not typed
        const { meta_data: metadata } = getEditedEntityRecord('postType', postType, id);
        // @ts-expect-error Selector is not typed
        const isResolutionFinished = hasFinishedResolution('getEditedEntityRecord', ['postType', postType, id]);
        return {
            meta_data: metadata || [],
            isLoading: !isResolutionFinished,
        };
    }, [id]);
    return {
        metadata: meta_data.reduce(function (acc, cur) {
            acc[cur.key] = cur.value;
            return acc;
        }, {}),
        update: (entries) => editEntityRecord('postType', postType, id, {
            meta_data: [
                ...meta_data.filter((item) => entries.findIndex((e) => e.key === item.key) ===
                    -1),
                ...entries,
            ],
        }),
        isLoading,
    };
}
exports.default = useProductMetadata;
