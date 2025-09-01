/**
 * External dependencies
 */
import { withCategory } from '@fincommerce/block-hocs';
import { withSpokenMessages } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { folderStarred } from '@fincommerce/icons';

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
	icon: folderStarred,
	label: __( 'Featured Category', 'fincommerce' ),
};

const BLOCK_CONTROL_CONFIG = {
	...GENERIC_CONFIG,
	cropLabel: __( 'Edit category image', 'fincommerce' ),
	editLabel: __( 'Edit selected category', 'fincommerce' ),
};

const CONTENT_CONFIG = {
	...GENERIC_CONFIG,
	emptyMessage: __( 'No product category is selected.', 'fincommerce' ),
	noSelectionButtonLabel: __( 'Select a category', 'fincommerce' ),
};

const EDIT_MODE_CONFIG = {
	...GENERIC_CONFIG,
	description: __(
		'Visually highlight a product category and encourage prompt action.',
		'fincommerce'
	),
	editLabel: __( 'Showing Featured Product block preview.', 'fincommerce' ),
};

export default compose( [
	withCategory,
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
