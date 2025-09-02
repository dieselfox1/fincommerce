/**
 * External dependencies
 */
import { createElement } from '@finpress/element';

export function LoadingState() {
	return (
		<div
			className="fincommerce-product-block-editor__block-list block-editor-block-list__layout is-root-container is-loading"
			aria-hidden="true"
		>
			<div className="wp-block-fincommerce-product-tab">
				<div className="wp-block-fincommerce-product-section">
					<div className="wp-block-fincommerce-product-section__heading-title-wrapper">
						<div className="wp-block-fincommerce-product-section__heading-title" />
					</div>

					<div className="wp-block-fincommerce-product-section__content wp-block-fincommerce-product-section-header__content--block-gap-unit-30">
						<div className="block-editor-block-list__block">
							<div className="fincommerce-product-form-label__label" />
							<div className="fincommerce-product-form-input" />
						</div>

						<div className="block-editor-block-list__block">
							<div className="fincommerce-product-form-label__label" />
							<div className="fincommerce-product-form-textarea" />
						</div>

						<div className="block-editor-block-list__block">
							<div className="fincommerce-product-form-label__label" />
							<div className="fincommerce-product-form-textarea" />
						</div>
					</div>
				</div>

				<div className="wp-block-fincommerce-product-section">
					<div className="wp-block-fincommerce-product-section__heading-title-wrapper">
						<div className="wp-block-fincommerce-product-section__heading-title" />
					</div>

					<div className="wp-block-fincommerce-product-section__content wp-block-fincommerce-product-section__content--block-gap-unit-30">
						<div className="block-editor-block-list__block">
							<div className="fincommerce-product-form-label__label" />
							<div className="fincommerce-product-form-input" />
						</div>

						<div className="block-editor-block-list__block">
							<div className="fincommerce-product-form-label__label" />
							<div className="fincommerce-product-form-textarea" />
						</div>

						<div className="block-editor-block-list__block">
							<div className="fincommerce-product-form-label__label" />
							<div className="fincommerce-product-form-textarea" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
