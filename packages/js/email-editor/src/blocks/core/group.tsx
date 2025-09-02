/**
 * External dependencies
 */
import { addFilter } from '@finpress/hooks';

/**
 * Disables layout support for group blocks because the default layout `flex` add gaps between columns that it is not possible to support in emails.
 */
function disableGroupVariations() {
	addFilter(
		'blocks.registerBlockType',
		'fincommerce-email-editor/disable-group-variations',
		( settings, name ) => {
			if ( name === 'core/group' ) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-return
				return {
					...settings,
					variations: settings.variations.filter(
						( variation ) => variation.name === 'group'
					),
					supports: {
						...settings.supports,
						layout: false,
					},
				};
			}
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return
			return settings;
		}
	);
}

export { disableGroupVariations };
