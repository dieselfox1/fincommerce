/**
 * External dependencies
 */
import { createBlock, type BlockInstance } from '@finpress/blocks';
import { __ } from '@finpress/i18n';

/**
 * Internal dependencies
 */
import type { OnClickCallbackParameter, InheritedAttributes } from '@fincommerce/block-library/assets/js/blocks/classic-template/types';

const getButtonLabel = () => __( 'Transform into blocks', 'fincommerce' );

const getBlockifiedTemplate = ( inheritedAttributes: InheritedAttributes ) =>
	[
		createBlock( 'fincommerce/order-confirmation-status', {
			...inheritedAttributes,
			fontSize: 'large',
		} ),
		createBlock(
			'fincommerce/order-confirmation-summary',
			inheritedAttributes
		),
		createBlock(
			'fincommerce/order-confirmation-totals-wrapper',
			inheritedAttributes
		),
		createBlock(
			'fincommerce/order-confirmation-downloads-wrapper',
			inheritedAttributes
		),
		createBlock(
			'core/columns',
			{
				...inheritedAttributes,
				className: 'wc-block-order-confirmation-address-wrapper',
			},
			[
				createBlock( 'core/column', inheritedAttributes, [
					createBlock(
						'fincommerce/order-confirmation-shipping-wrapper',
						inheritedAttributes
					),
				] ),
				createBlock( 'core/column', inheritedAttributes, [
					createBlock(
						'fincommerce/order-confirmation-billing-wrapper',
						inheritedAttributes
					),
				] ),
			]
		),
		createBlock(
			'fincommerce/order-confirmation-additional-fields-wrapper',
			inheritedAttributes
		),
		createBlock(
			'fincommerce/order-confirmation-additional-information',
			inheritedAttributes
		),
	].filter( Boolean ) as BlockInstance[];

const onClickCallback = ( {
	clientId,
	attributes,
	getBlocks,
	replaceBlock,
	selectBlock,
}: OnClickCallbackParameter ) => {
	replaceBlock( clientId, getBlockifiedTemplate( attributes ) );

	const blocks = getBlocks();

	const groupBlock = blocks.find(
		( block ) =>
			block.name === 'core/group' &&
			block.innerBlocks.some(
				( innerBlock ) =>
					innerBlock.name === 'fincommerce/store-notices'
			)
	);

	if ( groupBlock ) {
		selectBlock( groupBlock.clientId );
	}
};

const getDescription = () => {
	return __(
		'This block represents the classic template used to display the order confirmation. The actual rendered template may appear different from this placeholder.',
		'fincommerce'
	);
};

const getSkeleton = () => {
	return (
		<div className="fincommerce-page">
			<div className="fincommerce-order">
				<h1>{ __( 'Order received', 'fincommerce' ) }</h1>
				<p className="fincommerce-notice fincommerce-notice--success fincommerce-thankyou-order-confirmation">
					{ __(
						'Thank you. Your order has been received.',
						'fincommerce'
					) }
				</p>
				<ul className="fincommerce-order-overview fincommerce-thankyou-order-details order_details">
					<li className="fincommerce-order-overview__order order">
						{ __( 'Order number', 'fincommerce' ) }:{ ' ' }
						<strong>123</strong>
					</li>
					<li className="fincommerce-order-overview__date date">
						{ __( 'Date', 'fincommerce' ) }:{ ' ' }
						<strong>May 25, 2023</strong>
					</li>
					<li className="fincommerce-order-overview__email email">
						{ __( 'Email', 'fincommerce' ) }:{ ' ' }
						<strong>shopper@fincommerce.com</strong>
					</li>
					<li className="fincommerce-order-overview__total total">
						{ __( 'Total', 'fincommerce' ) }:{ ' ' }
						<strong>$20.00</strong>
					</li>
				</ul>

				<section className="fincommerce-order-details">
					<h2 className="fincommerce-order-details__title">
						{ __( 'Order details', 'fincommerce' ) }
					</h2>
					<table className="fincommerce-table fincommerce-table--order-details shop_table order_details">
						<thead>
							<tr>
								<th className="fincommerce-table__product-name product-name">
									{ __( 'Product', 'fincommerce' ) }
								</th>
								<th className="fincommerce-table__product-table product-total">
									{ __( 'Total', 'fincommerce' ) }
								</th>
							</tr>
						</thead>
						<tbody>
							<tr className="fincommerce-table__line-item order_item">
								<td className="fincommerce-table__product-name product-name">
									Sample Product{ ' ' }
									<strong className="product-quantity">
										×&nbsp;2
									</strong>{ ' ' }
								</td>

								<td className="fincommerce-table__product-total product-total">
									$20.00
								</td>
							</tr>
						</tbody>
						<tfoot>
							<tr>
								<th scope="row">
									{ __( 'Subtotal', 'fincommerce' ) }:
								</th>
								<td>$20.00</td>
							</tr>
							<tr>
								<th scope="row">
									{ __( 'Total', 'fincommerce' ) }:
								</th>
								<td>$20.00</td>
							</tr>
						</tfoot>
					</table>
				</section>

				<section className="fincommerce-customer-details">
					<section className="fincommerce-columns fincommerce-columns--2 fincommerce-columns--addresses col2-set addresses">
						<div className="fincommerce-column fincommerce-column--1 fincommerce-column--billing-address col-1">
							<h2 className="fincommerce-column__title">
								{ __( 'Billing address', 'fincommerce' ) }
							</h2>
							<address>
								123 Main St
								<br />
								New York, NY 10001
								<br />
								United States (US)
							</address>
						</div>

						<div className="fincommerce-column fincommerce-column--2 fincommerce-column--shipping-address col-2">
							<h2 className="fincommerce-column__title">
								{ __( 'Shipping address', 'fincommerce' ) }
							</h2>
							<address>
								123 Main St
								<br />
								New York, NY 10001
								<br />
								United States (US)
							</address>
						</div>
					</section>
				</section>
			</div>
		</div>
	);
};

const blockifyConfig = {
	getButtonLabel,
	onClickCallback,
	getBlockifiedTemplate,
};

export { blockifyConfig, getDescription, getSkeleton };
