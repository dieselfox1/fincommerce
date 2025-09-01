/**
 * External dependencies
 */
import { useState } from '@wordpress/element';
import { resolveSelect } from '@wordpress/data';
import { escapeHTML } from '@fincommerce/components';
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
        return (resolveSelect('core')
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
    const [isSearching, setIsSearching] = useState(false);
    async function searchEntity(search) {
        setIsSearching(true);
        let taxonomies = [];
        try {
            // @ts-expect-error TODO react-18-upgrade: getEntityRecords type is not correctly typed yet
            taxonomies = await resolveSelect('core').getEntityRecords('taxonomy', taxonomyName, {
                per_page: PAGINATION_SIZE,
                search: escapeHTML(search),
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
export default useTaxonomySearch;
