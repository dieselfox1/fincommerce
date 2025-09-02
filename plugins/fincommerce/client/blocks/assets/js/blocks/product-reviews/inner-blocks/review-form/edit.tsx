/**
 * External dependencies
 */
import clsx from 'clsx';
import {
	AlignmentControl,
	BlockControls,
	useBlockProps,
} from '@finpress/block-editor';
import { VisuallyHidden } from '@finpress/components';
import { useInstanceId } from '@finpress/compose';
import { __, sprintf } from '@finpress/i18n';
import type { BlockEditProps } from '@finpress/blocks';

/**
 * Internal dependencies
 */
import CommentsForm from '@fincommerce/block-library/assets/js/blocks/product-reviews/inner-blocks/review-form/form';

export default function PostCommentsFormEdit( {
	attributes,
	context,
	setAttributes,
}: BlockEditProps< {
	textAlign: string;
} > & {
	context: { postId: string; postType: string };
} ) {
	const { textAlign } = attributes;
	const { postId, postType } = context;

	const instanceId = useInstanceId( PostCommentsFormEdit );
	const instanceIdDesc = sprintf( 'comments-form-edit-%d-desc', instanceId );

	const blockProps = useBlockProps( {
		className: clsx( 'comment-respond', {
			[ `has-text-align-${ textAlign }` ]: textAlign,
		} ),
		'aria-describedby': instanceIdDesc,
	} );

	return (
		<>
			<BlockControls group="block">
				<AlignmentControl
					value={ textAlign }
					onChange={ ( nextAlign: string ) => {
						setAttributes( { textAlign: nextAlign } );
					} }
				/>
			</BlockControls>
			<div { ...blockProps }>
				<CommentsForm postId={ postId } postType={ postType } />
				<VisuallyHidden id={ instanceIdDesc }>
					{ __( 'Reviews form disabled in editor.', 'fincommerce' ) }
				</VisuallyHidden>
			</div>
		</>
	);
}
