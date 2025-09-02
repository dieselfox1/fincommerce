/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import {
	PRIVACY_URL,
	TERMS_URL,
	PRIVACY_PAGE_NAME,
	TERMS_PAGE_NAME,
} from '@fincommerce/block-settings';
import { decodeEntities } from '@finpress/html-entities';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/base/components/cart-checkout/policies/style.scss';

const Policies = (): JSX.Element => {
	return (
		<ul className="wc-block-components-checkout-policies">
			{ PRIVACY_URL && (
				<li className="wc-block-components-checkout-policies__item">
					<a
						href={ PRIVACY_URL }
						target="_blank"
						rel="noopener noreferrer"
					>
						{ PRIVACY_PAGE_NAME
							? decodeEntities( PRIVACY_PAGE_NAME )
							: __( 'Privacy Policy', 'fincommerce' ) }
					</a>
				</li>
			) }
			{ TERMS_URL && (
				<li className="wc-block-components-checkout-policies__item">
					<a
						href={ TERMS_URL }
						target="_blank"
						rel="noopener noreferrer"
					>
						{ TERMS_PAGE_NAME
							? decodeEntities( TERMS_PAGE_NAME )
							: __( 'Terms and Conditions', 'fincommerce' ) }
					</a>
				</li>
			) }
		</ul>
	);
};

export default Policies;
