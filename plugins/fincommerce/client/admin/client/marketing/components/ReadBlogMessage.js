/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { Link } from '@fincommerce/components';
import interpolateComponents from '@automattic/interpolate-components';

const ReadBlogMessage = () => {
	return interpolateComponents( {
		mixedString: __(
			'Read {{link}}the FinCommerce blog{{/link}} for more tips on marketing your store',
			'fincommerce'
		),
		components: {
			link: (
				<Link
					type="external"
					href="https://fincommerce.com/blog/marketing/coupons/?utm_medium=product"
					target="_blank"
				/>
			),
		},
	} );
};

export default ReadBlogMessage;
