/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { Placeholder } from '@finpress/components';
import { Icon, commentContent } from '@finpress/icons';
const NoReviewsPlaceholder = (): JSX.Element => {
	return (
		<Placeholder
			className="wc-block-reviews-by-category"
			icon={
				<Icon
					icon={ commentContent }
					className="block-editor-block-icon"
				/>
			}
			label={ __( 'Reviews by Category', 'fincommerce' ) }
		>
			{ __(
				'This block lists reviews for products from selected categories. The selected categories do not have any reviews yet, but they will show up here when they do.',
				'fincommerce'
			) }
		</Placeholder>
	);
};

export default NoReviewsPlaceholder;
