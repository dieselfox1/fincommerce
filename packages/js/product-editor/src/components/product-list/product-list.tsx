/**
 * External dependencies
 */
import { Button } from '@finpress/components';
import { createElement } from '@finpress/element';
import { __ } from '@finpress/i18n';
import { closeSmall, external } from '@finpress/icons';
import { getNewPath } from '@fincommerce/navigation';
import { Product } from '@fincommerce/data';
import clsx from 'clsx';

/**
 * Internal dependencies
 */
import { FormattedPrice } from '../formatted-price';
import { ProductImage } from '../product-image';
import { ProductListProps } from './types';

export function ProductList( {
	products,
	onRemove,
	onEdit,
	onPreview,
	className,
	...props
}: ProductListProps ) {
	function nameLinkClickHandler( product: Product ) {
		return function handleNameLinkClick() {
			if ( onEdit ) {
				onEdit( product );
			}
		};
	}

	function previewLinkClickHandler( product: Product ) {
		return function handlePreviewLinkClick() {
			if ( onPreview ) {
				onPreview( product );
			}
		};
	}

	function removeClickHandler( product: Product ) {
		return function handleRemoveClick() {
			if ( onRemove ) {
				onRemove( product );
			}
		};
	}

	return (
		<div
			{ ...props }
			className={ clsx( 'fincommerce-product-list', className ) }
		>
			<div role="table">
				<div role="rowgroup">
					<div role="rowheader">
						<div role="columnheader">
							{ __( 'Product', 'fincommerce' ) }
						</div>
						<div
							role="columnheader"
							aria-label={ __( 'Actions', 'fincommerce' ) }
						/>
					</div>
				</div>

				<div role="rowgroup">
					{ products.map( ( product ) => (
						<div role="row" key={ product.id }>
							<div role="cell">
								<ProductImage
									product={ product }
									className="fincommerce-product-list__product-image"
								/>
								<div className="fincommerce-product-list__product-info">
									<a
										className="fincommerce-product-list__product-name"
										href={ getNewPath(
											{},
											`/product/${ product.id }`,
											{}
										) }
										target="_blank"
										rel="noreferrer"
										onClick={ nameLinkClickHandler(
											product
										) }
									>
										{ product.name }
									</a>
									<FormattedPrice
										product={ product }
										className="fincommerce-product-list__product-price"
									/>
								</div>
							</div>
							<div
								role="cell"
								className="fincommerce-product-list__actions"
							>
								<Button
									icon={ external }
									aria-label={ __(
										'See product page',
										'fincommerce'
									) }
									href={ product.permalink }
									target="_blank"
									rel="noreferrer"
									onClick={ previewLinkClickHandler(
										product
									) }
								/>
								<Button
									icon={ closeSmall }
									aria-label={ __(
										'Remove product',
										'fincommerce'
									) }
									onClick={ removeClickHandler( product ) }
								/>
							</div>
						</div>
					) ) }
				</div>
			</div>
		</div>
	);
}
