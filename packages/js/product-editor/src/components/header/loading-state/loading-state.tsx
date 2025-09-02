/**
 * External dependencies
 */
import { createElement } from '@finpress/element';

export function LoadingState() {
	return (
		<div
			className="fincommerce-product-header is-loading"
			aria-hidden="true"
		>
			<div className="fincommerce-product-header__inner">
				<div />

				<div className="fincommerce-product-header__title" />

				<div className="fincommerce-product-header__actions">
					<div className="fincommerce-product-header__action" />
					<div className="fincommerce-product-header__action" />
					<div className="fincommerce-product-header__action" />
					<div className="fincommerce-product-header__action" />
				</div>
			</div>

			<div className="fincommerce-product-tabs">
				{ Array( 7 )
					.fill( 0 )
					.map( ( _, index ) => (
						<div key={ index } className="components-button" />
					) ) }
			</div>
		</div>
	);
}
