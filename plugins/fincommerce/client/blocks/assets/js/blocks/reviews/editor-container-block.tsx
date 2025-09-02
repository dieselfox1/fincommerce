/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { debounce } from '@fincommerce/base-utils';
import { Placeholder } from '@finpress/components';
import { EditorContainerBlockProps } from '@fincommerce/blocks/reviews/types';

/**
 * Internal dependencies
 */
import EditorBlock from '@fincommerce/block-library/assets/js/blocks/reviews/editor-block';
import { getSortArgs } from '@fincommerce/block-library/assets/js/blocks/reviews/utils';

const EditorContainerBlock = ( {
	attributes,
	icon,
	name,
	noReviewsPlaceholder,
}: EditorContainerBlockProps ) => {
	const {
		categoryIds,
		productId,
		reviewsOnPageLoad,
		showProductName,
		showReviewDate,
		showReviewerName,
		showReviewContent,
		showReviewImage,
		showReviewRating,
	} = attributes;
	const { order, orderby } = getSortArgs( attributes.orderby );
	const isAllContentHidden =
		! showReviewContent &&
		! showReviewRating &&
		! showReviewDate &&
		! showReviewerName &&
		! showReviewImage &&
		! showProductName;

	if ( isAllContentHidden ) {
		return (
			<Placeholder icon={ icon } label={ name }>
				{ __(
					'The content for this block is hidden due to block settings.',
					'fincommerce'
				) }
			</Placeholder>
		);
	}

	return (
		<>
			<EditorBlock
				attributes={ attributes }
				categoryIds={ categoryIds }
				delayFunction={ ( callback: () => void ) =>
					debounce( callback, 400 )
				}
				noReviewsPlaceholder={ noReviewsPlaceholder }
				orderby={ orderby }
				order={ order }
				productId={ productId }
				reviewsToDisplay={ reviewsOnPageLoad }
			/>
		</>
	);
};

export default EditorContainerBlock;
