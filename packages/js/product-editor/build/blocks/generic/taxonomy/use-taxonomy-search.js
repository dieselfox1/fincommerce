"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const data_1 = require("@wordpress/data");
const components_1 = require("@fincommerce/components");
async function getTaxonomiesMissingParents(taxonomies, taxonomyName) {
    // Retrieve the missing parent objects incase not all of them were included.
    const missingParentIds = [];
    const taxonomiesLookup = {};
    taxonomies.forEach((taxonomy) => {
        taxonomiesLookup[taxonomy.id] = taxonomy;
    });
    taxonomies.forEach((taxonomy) => {
        if (taxonomy.parent > 0 && !taxonomiesLookup[taxonomy.parent]) {
            missingParentIds.push(taxonomy.parent);
        }
    });
    if (missingParentIds.length > 0) {
        return ((0, data_1.resolveSelect)('core')
            .getEntityRecords('taxonomy', taxonomyName, {
            include: missingParentIds,
        })
            // @ts-expect-error TODO react-18-upgrade: getEntityRecords type is not correctly typed yet
            .then((parentTaxonomies) => {
            return getTaxonomiesMissingParents([...parentTaxonomies, ...taxonomies], taxonomyName);
        }));
    }
    return taxonomies;
}
const PAGINATION_SIZE = 30;
const useTaxonomySearch = (taxonomyName, options = { fetchParents: true }) => {
    const [isSearching, setIsSearching] = (0, element_1.useState)(false);
    async function searchEntity(search) {
        setIsSearching(true);
        let taxonomies = [];
        try {
            // @ts-expect-error TODO react-18-upgrade: getEntityRecords type is not correctly typed yet
            taxonomies = await (0, data_1.resolveSelect)('core').getEntityRecords('taxonomy', taxonomyName, {
                per_page: PAGINATION_SIZE,
                search: (0, components_1.escapeHTML)(search),
            });
            if (options?.fetchParents) {
                taxonomies = await getTaxonomiesMissingParents(taxonomies, taxonomyName);
            }
        }
        finally {
            setIsSearching(false);
        }
        return taxonomies;
    }
    return {
        searchEntity,
        isResolving: isSearching,
    };
};
exports.default = useTaxonomySearch;
