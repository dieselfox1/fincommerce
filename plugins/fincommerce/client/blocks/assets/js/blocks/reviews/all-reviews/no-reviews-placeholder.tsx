/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { Placeholder } from '@finpress/components';
import { Icon, postComments } from '@finpress/icons';

const NoCategoryReviewsPlaceholder = (): JSX.Element => {
	return (
		<Placeholder
			className="wc-block-all-reviews"
			icon={
				<Icon
					icon={ postComments }
					className="block-editor-block-icon"
				/>
			}
			label={ __( 'All Reviews', 'fincommerce' ) }
		>
			{ __(
				'This block shows a list of all product reviews. Your store does not have any reviews yet, but they will show up here when it does.',
				'fincommerce'
			) }
		</Placeholder>
	);
};

export default NoCategoryReviewsPlaceholder;
