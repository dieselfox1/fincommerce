/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { ToggleControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { useHasUnsupportedBlocks } from '@fincommerce/block-library/assets/js/blocks/product-collection/edit/inspector-advanced-controls/utils';
import type { ProductCollectionSetAttributes } from '@fincommerce/block-library/assets/js/blocks/product-collection/types';

type ForcePageReloadControlProps = {
	clientId: string;
	forcePageReload: boolean;
	setAttributes: ProductCollectionSetAttributes;
};

const helpTextClientSideNav = __(
	'Enable to enforce full page reload on certain interactions, like using paginations controls.',
	'fincommerce'
);
const helpTextReloadFullPage = __(
	'Browsing between pages requires a full page reload.',
	'fincommerce'
);

const helpTextIncompatibleBlocks = __(
	"Reload full page can't be disabled because there are incompatible blocks inside the Product Collection block.",
	'fincommerce'
);

const ForcePageReloadControl = ( props: ForcePageReloadControlProps ) => {
	const { clientId, forcePageReload, setAttributes } = props;
	const hasUnsupportedBlocks = useHasUnsupportedBlocks( clientId );

	useEffect( () => {
		if ( ! forcePageReload && hasUnsupportedBlocks ) {
			setAttributes( { forcePageReload: true } );
		}
	}, [ forcePageReload, hasUnsupportedBlocks, setAttributes ] );

	// Client side navigation is on (control is off).
	let helpText = helpTextClientSideNav;

	// Client side navigation is off (control is on).
	if ( forcePageReload ) {
		helpText = helpTextReloadFullPage;
	}

	// Client side navigation is forcefully off (control is on and disabled).
	if ( hasUnsupportedBlocks ) {
		helpText = helpTextIncompatibleBlocks;
	}

	return (
		<ToggleControl
			label={ __( 'Reload full page', 'fincommerce' ) }
			help={ helpText }
			checked={ forcePageReload }
			onChange={ () =>
				setAttributes( { forcePageReload: ! forcePageReload } )
			}
			disabled={ hasUnsupportedBlocks }
		/>
	);
};

export default ForcePageReloadControl;
