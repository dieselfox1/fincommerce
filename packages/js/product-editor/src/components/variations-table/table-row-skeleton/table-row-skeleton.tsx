/**
 * External dependencies
 */
import { createElement } from '@finpress/element';

export function TableRowSkeleton() {
	return (
		<div
			className="fincommerce-table-row-skeleton fincommerce-product-variations__table-row"
			aria-hidden="true"
		>
			<div className="fincommerce-sortable__handle" />

			<div className="fincommerce-product-variations__selection">
				<div className="fincommerce-table-row-skeleton__checkbox" />
			</div>

			<div className="fincommerce-product-variations__attributes">
				{ Array( 2 )
					.fill( 0 )
					.map( ( _, index ) => (
						<div
							key={ index }
							className="fincommerce-tag fincommerce-product-variations__attribute"
						>
							<div className="fincommerce-table-row-skeleton__attribute-option" />
						</div>
					) ) }
			</div>

			<div className="fincommerce-product-variations__price">
				<div className="fincommerce-table-row-skeleton__regular-price" />
			</div>

			<div className="fincommerce-product-variations__quantity">
				<div className="fincommerce-table-row-skeleton__quantity" />
			</div>

			<div className="fincommerce-product-variations__actions">
				<div className="fincommerce-table-row-skeleton__visibility-icon" />

				<div className="fincommerce-table-row-skeleton__edit-link" />

				<div className="fincommerce-table-row-skeleton__menu-toggle" />
			</div>
		</div>
	);
}
