/**
 * External dependencies
 */
import { _n, sprintf } from '@finpress/i18n';
import { decodeEntities } from '@finpress/html-entities';
import { Label } from '@fincommerce/blocks-components';

/**
 * Internal dependencies
 */
import type { PackageData, PackageItem } from '@fincommerce/block-library/assets/js/base/components/cart-checkout/shipping-rates-control-package/types';

export const PackageItems = ( {
	packageData,
}: {
	packageData: PackageData;
} ): JSX.Element => {
	return (
		<ul className="wc-block-components-shipping-rates-control__package-items">
			{ Object.values( packageData.items ).map( ( v: PackageItem ) => {
				const name = decodeEntities( v.name );
				const quantity = v.quantity;
				return (
					<li
						key={ v.key }
						className="wc-block-components-shipping-rates-control__package-item"
					>
						<Label
							label={
								quantity > 1
									? `${ name } × ${ quantity }`
									: `${ name }`
							}
							allowHTML
							screenReaderLabel={ sprintf(
								/* translators: %1$s name of the product (ie: Sunglasses), %2$d number of units in the current cart package */
								_n(
									'%1$s (%2$d unit)',
									'%1$s (%2$d units)',
									quantity,
									'fincommerce'
								),
								name,
								quantity
							) }
						/>
					</li>
				);
			} ) }
		</ul>
	);
};

export default PackageItems;
