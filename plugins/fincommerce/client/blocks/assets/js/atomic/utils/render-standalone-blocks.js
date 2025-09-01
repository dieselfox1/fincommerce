/**
 * External dependencies
 */
import { renderFrontend } from '@fincommerce/base-utils';

/**
 * Internal dependencies
 */
import { getBlockMap } from '@fincommerce/block-library/assets/js/atomic/utils/get-block-map';

export const renderStandaloneBlocks = () => {
	const blockMap = getBlockMap( '' );

	Object.keys( blockMap ).forEach( ( blockName ) => {
		const selector = '.wp-block-' + blockName.replace( '/', '-' );

		const getProps = ( el ) => {
			return el.dataset;
		};

		renderFrontend( {
			Block: blockMap[ blockName ],
			selector,
			getProps,
		} );
	} );
};
