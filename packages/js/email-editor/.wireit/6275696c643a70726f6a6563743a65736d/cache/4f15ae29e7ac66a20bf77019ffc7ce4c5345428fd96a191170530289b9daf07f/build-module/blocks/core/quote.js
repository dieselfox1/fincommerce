/**
 * External dependencies
 */
import { addFilter } from '@wordpress/hooks';
/**
 * Remove the styles and alignment control support for the Quote block.
 */
function enhanceQuoteBlock() {
    addFilter('blocks.registerBlockType', 'fincommerce-email-editor/change-quote', (settings, name) => {
        if (name === 'core/quote') {
            return {
                ...settings,
                styles: [],
                supports: {
                    ...settings.supports,
                    align: [],
                },
            };
        }
        return settings;
    });
}
export { enhanceQuoteBlock };
