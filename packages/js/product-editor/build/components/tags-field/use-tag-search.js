"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTagSearch = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const data_1 = require("@wordpress/data");
const data_2 = require("@fincommerce/data");
/**
 * A hook used to handle all the search logic for the tag search component.
 */
const useTagSearch = () => {
    const [fetchedTags, setFetchedTags] = (0, element_1.useState)([]);
    const [isSearching, setIsSearching] = (0, element_1.useState)(true);
    const fetchProductTags = (search) => {
        setIsSearching(true);
        const query = search !== undefined ? { search } : undefined;
        (0, data_1.resolveSelect)(data_2.experimentalProductTagsStore)
            .getProductTags({ ...query })
            .then((tags) => {
            setFetchedTags(tags ?? []);
        })
            .finally(() => {
            setIsSearching(false);
        });
    };
    return {
        searchTags: fetchProductTags,
        tagsSelectList: fetchedTags,
        isSearching,
    };
};
exports.useTagSearch = useTagSearch;
