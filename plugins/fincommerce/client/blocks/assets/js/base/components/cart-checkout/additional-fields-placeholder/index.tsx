/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import type { CheckoutField } from '@fincommerce/block-settings';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/base/components/cart-checkout/additional-fields-placeholder/style.scss';

interface AdditionalFieldsPlaceholderProps {
	additionalFields: CheckoutField[];
}

const AdditionalFieldsPlaceholder = ( {
	additionalFields = [],
}: AdditionalFieldsPlaceholderProps ) => {
	return (
		<dl className="wc-block-components-additional-fields-list">
			{ Object.entries( additionalFields ).map( ( [ , field ] ) => {
				const { label, type, options } = field;
				let sampleValue = __( 'Placeholder', 'fincommerce' );

				if ( type === 'checkbox' ) {
					sampleValue = __( 'Yes', 'fincommerce' );
				}

				if ( type === 'select' ) {
					sampleValue = options[ 0 ].label;
				}

				return (
					<>
						<dt>{ label }</dt>
						<dd>{ sampleValue }</dd>
					</>
				);
			} ) }
		</dl>
	);
};

export default AdditionalFieldsPlaceholder;
