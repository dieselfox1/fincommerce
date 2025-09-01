/**
 * External dependencies
 */
import { withProduct } from '@fincommerce/block-hocs';
import { withSpokenMessages } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { starEmpty } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { withBlockControls } from '@fincommerce/block-library/assets/js/blocks/featured-items/block-controls';
import { withImageEditor } from '@fincommerce/block-library/assets/js/blocks/featured-items/image-editor';
import { withInspectorControls } from '@fincommerce/block-library/assets/js/blocks/featured-items/inspector-controls';
import { withApiError } from '@fincommerce/block-library/assets/js/blocks/featured-items/with-api-error';
import { withEditMode } from '@fincommerce/block-library/assets/js/blocks/featured-items/with-edit-mode';
import { withEditingImage } from '@fincommerce/block-library/assets/js/blocks/featured-items/with-editing-image';
import { withFeaturedItem } from '@fincommerce/block-library/assets/js/blocks/featured-items/with-featured-item';
import { withUpdateButtonAttributes } from '@fincommerce/block-library/assets/js/blocks/featured-items/with-update-button-attributes';

const GENERIC_CONFIG = {
	icon: starEmpty,
	label: __( 'Featured Product', 'fincommerce' ),
};

const BLOCK_CONTROL_CONFIG = {
	...GENERIC_CONFIG,
	cropLabel: __( 'Edit product image', 'fincommerce' ),
	editLabel: __( 'Edit selected product', 'fincommerce' ),
};

const CONTENT_CONFIG = {
	...GENERIC_CONFIG,
	emptyMessage: __( 'No product is selected.', 'fincommerce' ),
	noSelectionButtonLabel: __( 'Select a product', 'fincommerce' ),
};

const EDIT_MODE_CONFIG = {
	...GENERIC_CONFIG,
	description: __( 'Highlight a product or variation.', 'fincommerce' ),
	editLabel: __( 'Showing Featured Product block preview.', 'fincommerce' ),
};

export default compose( [
	withProduct,
	withSpokenMessages,
	withUpdateButtonAttributes,
	withEditingImage,
	withEditMode( EDIT_MODE_CONFIG ),
	withFeaturedItem( CONTENT_CONFIG ),
	withApiError,
	withImageEditor,
	withInspectorControls,
	withBlockControls( BLOCK_CONTROL_CONFIG ),
] )( () => <></> );
