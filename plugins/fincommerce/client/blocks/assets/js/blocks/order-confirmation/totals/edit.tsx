/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { Disabled } from '@wordpress/components';
import { __, _x } from '@wordpress/i18n';
import { formatPrice } from '@fincommerce/price-format';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/blocks/order-confirmation/totals/style.scss';

const Edit = (): JSX.Element => {
	const blockProps = useBlockProps( {
		className: 'wc-block-order-confirmation-totals',
	} );

	const {
		borderBottomColor,
		borderLeftColor,
		borderRightColor,
		borderTopColor,
		borderWidth,
	} = blockProps.style;

	const borderStyles = {
		borderBottomColor,
		borderLeftColor,
		borderRightColor,
		borderTopColor,
		borderWidth,
	} as React.CSSProperties;

	return (
		<div { ...blockProps }>
			<Disabled>
				<table
					style={ borderStyles }
					cellSpacing="0"
					className="wc-block-order-confirmation-totals__table"
				>
					<thead>
						<tr>
							<th className="wc-block-order-confirmation-totals__product">
								{ __( 'Product', 'fincommerce' ) }
							</th>
							<th className="wc-block-order-confirmation-totals__total">
								{ __( 'Total', 'fincommerce' ) }
							</th>
						</tr>
					</thead>
					<tbody>
						<tr className="fincommerce-table__line-item order_item">
							<th
								scope="row"
								className="wc-block-order-confirmation-totals__product"
							>
								<a href="#link">
									{ _x(
										'Test Product',
										'sample product name',
										'fincommerce'
									) }
								</a>
								&nbsp;
								<strong className="product-quantity">
									&times;&nbsp;2
								</strong>
							</th>
							<td className="wc-block-order-confirmation-totals__total">
								{ formatPrice( 2000 ) }
							</td>
						</tr>
						<tr className="fincommerce-table__line-item order_item">
							<th
								scope="row"
								className="wc-block-order-confirmation-totals__product"
							>
								<a href="#link">
									{ _x(
										'Test Product',
										'sample product name',
										'fincommerce'
									) }
								</a>
								&nbsp;
								<strong className="product-quantity">
									&times;&nbsp;2
								</strong>
							</th>
							<td className="wc-block-order-confirmation-totals__total">
								{ formatPrice( 2000 ) }
							</td>
						</tr>
					</tbody>
					<tfoot>
						<tr>
							<th
								className="wc-block-order-confirmation-totals__label"
								scope="row"
							>
								{ __( 'Total', 'fincommerce' ) }
							</th>
							<td className="wc-block-order-confirmation-totals__total">
								{ formatPrice( 4000 ) }
							</td>
						</tr>
					</tfoot>
				</table>
			</Disabled>
		</div>
	);
};

export default Edit;
