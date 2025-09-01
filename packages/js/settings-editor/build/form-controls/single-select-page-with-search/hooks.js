"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSelectedItem = exports.useItems = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const core_data_1 = require("@wordpress/core-data");
const data_1 = require("@wordpress/data");
/**
 * Internal dependencies
 */
const utils_1 = require("./utils");
/**
 * The useItems hook is used to get all page items.
 *
 * @param exclude - The items to exclude from the search results.
 * @return The page items and a boolean indicating if the items are loading.
 */
const useItems = (exclude) => {
    return (0, data_1.useSelect)((select) => {
        const query = {
            status: ['publish', 'private', 'draft'],
            ...(exclude ? { exclude } : {}),
        };
        const args = [
            'postType',
            'page',
            query,
        ];
        const allPages = select(core_data_1.store).getEntityRecords(...args) || null;
        return {
            items: allPages?.map(utils_1.formatPageToItem) || [],
            isFetching: !select(core_data_1.store).hasFinishedResolution('getEntityRecords', args),
        };
    }, [exclude]);
};
exports.useItems = useItems;
/**
 * The useSelectedItem hook is used to get the selected page item.
 *
 * @param value - The value of the selected page item.
 * @return The selected page item and a boolean indicating if the page is loading.
 */
const useSelectedItem = (value) => {
    const { selectedPage, isLoading } = (0, data_1.useSelect)((select) => {
        if (!value) {
            return { selectedPage: null, isLoading: false };
        }
        const { getEntityRecord, hasFinishedResolution } = select(core_data_1.store);
        const args = [
            'postType',
            'page',
            value,
        ];
        return {
            selectedPage: getEntityRecord(...args),
            isLoading: !hasFinishedResolution('getEntityRecord', args),
        };
    }, [value]);
    const selectedItem = (0, element_1.useMemo)(() => (selectedPage ? (0, utils_1.formatPageToItem)(selectedPage) : null), [selectedPage]);
    return {
        selectedItem,
        isLoading,
    };
};
exports.useSelectedItem = useSelectedItem;
