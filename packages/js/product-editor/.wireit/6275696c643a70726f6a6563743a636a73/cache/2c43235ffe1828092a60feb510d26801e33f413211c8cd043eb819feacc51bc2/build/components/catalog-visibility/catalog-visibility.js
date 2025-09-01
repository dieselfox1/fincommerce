"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogVisibility = CatalogVisibility;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const tracks_1 = require("@fincommerce/tracks");
const components_1 = require("@wordpress/components");
const constants_1 = require("../../constants");
function CatalogVisibility({ catalogVisibility, label, visibility, onCheckboxChange, }) {
    function handleVisibilityChange(selected) {
        if (selected) {
            if (catalogVisibility === 'visible') {
                onCheckboxChange(visibility);
                (0, tracks_1.recordEvent)('product_catalog_visibility', {
                    source: constants_1.TRACKS_SOURCE,
                    visibility: catalogVisibility,
                });
                return;
            }
            onCheckboxChange('hidden');
        }
        else {
            if (catalogVisibility === 'hidden') {
                if (visibility === 'catalog') {
                    onCheckboxChange('search');
                    (0, tracks_1.recordEvent)('product_catalog_visibility', {
                        source: constants_1.TRACKS_SOURCE,
                        visibility: catalogVisibility,
                    });
                    return;
                }
                if (visibility === 'search') {
                    onCheckboxChange('catalog');
                    (0, tracks_1.recordEvent)('product_catalog_visibility', {
                        source: constants_1.TRACKS_SOURCE,
                        visibility: catalogVisibility,
                    });
                    return;
                }
                return;
            }
            onCheckboxChange('visible');
            (0, tracks_1.recordEvent)('product_catalog_visibility', {
                source: constants_1.TRACKS_SOURCE,
                visibility: catalogVisibility,
            });
        }
    }
    return ((0, element_1.createElement)(element_1.Fragment, null,
        (0, element_1.createElement)(components_1.CheckboxControl, { label: label, checked: catalogVisibility === visibility ||
                catalogVisibility === 'hidden', onChange: (selected) => handleVisibilityChange(selected) })));
}
