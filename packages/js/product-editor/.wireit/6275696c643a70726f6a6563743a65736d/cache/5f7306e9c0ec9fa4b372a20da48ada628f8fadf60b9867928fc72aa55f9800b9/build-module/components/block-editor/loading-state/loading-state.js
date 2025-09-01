/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
export function LoadingState() {
    return (createElement("div", { className: "fincommerce-product-block-editor__block-list block-editor-block-list__layout is-root-container is-loading", "aria-hidden": "true" },
        createElement("div", { className: "wp-block-fincommerce-product-tab" },
            createElement("div", { className: "wp-block-fincommerce-product-section" },
                createElement("div", { className: "wp-block-fincommerce-product-section__heading-title-wrapper" },
                    createElement("div", { className: "wp-block-fincommerce-product-section__heading-title" })),
                createElement("div", { className: "wp-block-fincommerce-product-section__content wp-block-fincommerce-product-section-header__content--block-gap-unit-30" },
                    createElement("div", { className: "block-editor-block-list__block" },
                        createElement("div", { className: "fincommerce-product-form-label__label" }),
                        createElement("div", { className: "fincommerce-product-form-input" })),
                    createElement("div", { className: "block-editor-block-list__block" },
                        createElement("div", { className: "fincommerce-product-form-label__label" }),
                        createElement("div", { className: "fincommerce-product-form-textarea" })),
                    createElement("div", { className: "block-editor-block-list__block" },
                        createElement("div", { className: "fincommerce-product-form-label__label" }),
                        createElement("div", { className: "fincommerce-product-form-textarea" })))),
            createElement("div", { className: "wp-block-fincommerce-product-section" },
                createElement("div", { className: "wp-block-fincommerce-product-section__heading-title-wrapper" },
                    createElement("div", { className: "wp-block-fincommerce-product-section__heading-title" })),
                createElement("div", { className: "wp-block-fincommerce-product-section__content wp-block-fincommerce-product-section__content--block-gap-unit-30" },
                    createElement("div", { className: "block-editor-block-list__block" },
                        createElement("div", { className: "fincommerce-product-form-label__label" }),
                        createElement("div", { className: "fincommerce-product-form-input" })),
                    createElement("div", { className: "block-editor-block-list__block" },
                        createElement("div", { className: "fincommerce-product-form-label__label" }),
                        createElement("div", { className: "fincommerce-product-form-textarea" })),
                    createElement("div", { className: "block-editor-block-list__block" },
                        createElement("div", { className: "fincommerce-product-form-label__label" }),
                        createElement("div", { className: "fincommerce-product-form-textarea" })))))));
}
