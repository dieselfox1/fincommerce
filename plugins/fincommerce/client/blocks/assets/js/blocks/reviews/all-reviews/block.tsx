/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { Icon, postComments } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import EditorContainerBlock from '@fincommerce/block-library/assets/js/blocks/reviews/editor-container-block';
import NoReviewsPlaceholder from '@fincommerce/block-library/assets/js/blocks/reviews/all-reviews/no-reviews-placeholder';
import {
	getSharedReviewContentControls,
	getSharedReviewListControls,
} from '@fincommerce/block-library/assets/js/blocks/reviews/edit-utils';
import type { AllReviewsEditorProps } from '@fincommerce/block-library/assets/js/blocks/reviews/all-reviews/types';

/**
 * Component to handle edit mode of "All Reviews".
 *
 * @param {Object}            props               Incoming props for the component.
 * @param {Object}            props.attributes    Incoming block attributes.
 * @param {function(any):any} props.setAttributes Setter for block attributes.
 */
const AllReviewsEditor = ( {
	attributes,
	setAttributes,
}: AllReviewsEditorProps ) => {
	const getInspectorControls = () => {
		return (
			<InspectorControls key="inspector">
				<PanelBody title={ __( 'Content', 'fincommerce' ) }>
					<ToggleControl
						label={ __( 'Product name', 'fincommerce' ) }
						checked={ attributes.showProductName }
						onChange={ () =>
							setAttributes( {
								showProductName: ! attributes.showProductName,
							} )
						}
					/>
					{ getSharedReviewContentControls(
						attributes,
						setAttributes
					) }
				</PanelBody>
				<PanelBody title={ __( 'List Settings', 'fincommerce' ) }>
					{ getSharedReviewListControls( attributes, setAttributes ) }
				</PanelBody>
			</InspectorControls>
		);
	};

	return (
		<>
			{ getInspectorControls() }
			<EditorContainerBlock
				attributes={ attributes }
				icon={
					<Icon
						icon={ postComments }
						className="block-editor-block-icon"
					/>
				}
				name={ __( 'All Reviews', 'fincommerce' ) }
				noReviewsPlaceholder={ NoReviewsPlaceholder }
			/>
		</>
	);
};

export default AllReviewsEditor;
