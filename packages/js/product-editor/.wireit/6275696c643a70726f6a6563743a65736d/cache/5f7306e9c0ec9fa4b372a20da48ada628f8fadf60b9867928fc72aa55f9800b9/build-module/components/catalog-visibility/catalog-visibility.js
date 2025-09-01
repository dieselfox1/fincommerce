/**
 * External dependencies
 */
import { createElement, Fragment } from '@wordpress/element';
import { recordEvent } from '@fincommerce/tracks';
import { CheckboxControl } from '@wordpress/components';
import { TRACKS_SOURCE } from '../../constants';
export function CatalogVisibility({ catalogVisibility, label, visibility, onCheckboxChange, }) {
    function handleVisibilityChange(selected) {
        if (selected) {
            if (catalogVisibility === 'visible') {
                onCheckboxChange(visibility);
                recordEvent('product_catalog_visibility', {
                    source: TRACKS_SOURCE,
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
                    recordEvent('product_catalog_visibility', {
                        source: TRACKS_SOURCE,
                        visibility: catalogVisibility,
                    });
                    return;
                }
                if (visibility === 'search') {
                    onCheckboxChange('catalog');
                    recordEvent('product_catalog_visibility', {
                        source: TRACKS_SOURCE,
                        visibility: catalogVisibility,
                    });
                    return;
                }
                return;
            }
            onCheckboxChange('visible');
            recordEvent('product_catalog_visibility', {
                source: TRACKS_SOURCE,
                visibility: catalogVisibility,
            });
        }
    }
    return (createElement(Fragment, null,
        createElement(CheckboxControl, { label: label, checked: catalogVisibility === visibility ||
                catalogVisibility === 'hidden', onChange: (selected) => handleVisibilityChange(selected) })));
}
