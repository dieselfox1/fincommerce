/**
 * External dependencies
 */
import { Button } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import { resolveSelect } from '@wordpress/data';
import { createElement, useContext, useEffect, useState, } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { external, closeSmall } from '@wordpress/icons';
import { useWooBlockProps } from '@fincommerce/block-templates';
import { CurrencyContext } from '@fincommerce/currency';
import { productsStore } from '@fincommerce/data';
import { getNewPath } from '@fincommerce/navigation';
import clsx from 'clsx';
/**
 * Internal dependencies
 */
import { AddProductsModal, getProductImageStyle, ReorderProductsModal, } from '../../../components/add-products-modal';
import { getProductStockStatus, getProductStockStatusClass, } from '../../../utils';
import { Shirt } from '../../../images/shirt';
import { Pants } from '../../../images/pants';
import { Glasses } from '../../../images/glasses';
import { AdviceCard } from '../../../components/advice-card';
import { SectionActions } from '../../../components/block-slot-fill';
export function ProductListBlockEdit({ attributes, context: { postType }, }) {
    const { property } = attributes;
    const blockProps = useWooBlockProps(attributes);
    const [openAddProductsModal, setOpenAddProductsModal] = useState(false);
    const [openReorderProductsModal, setOpenReorderProductsModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [preventFetch, setPreventFetch] = useState(false);
    const [groupedProductIds, setGroupedProductIds] = useEntityProp('postType', postType, property);
    const [groupedProducts, setGroupedProducts] = useState([]);
    const { formatAmount } = useContext(CurrencyContext);
    useEffect(function loadGroupedProducts() {
        if (preventFetch)
            return;
        if (groupedProductIds.length) {
            setIsLoading(false);
            resolveSelect(productsStore)
                .getProducts({
                include: groupedProductIds,
                orderby: 'include',
            })
                .then(setGroupedProducts)
                .finally(() => setIsLoading(false));
        }
        else {
            setGroupedProducts([]);
        }
    }, [groupedProductIds, preventFetch]);
    function handleAddProductsButtonClick() {
        setOpenAddProductsModal(true);
    }
    function handleReorderProductsButtonClick() {
        setOpenReorderProductsModal(true);
    }
    function handleAddProductsModalSubmit(value) {
        const newGroupedProducts = [...groupedProducts, ...value];
        setPreventFetch(true);
        setGroupedProducts(newGroupedProducts);
        setGroupedProductIds(newGroupedProducts.map((product) => product.id));
        setOpenAddProductsModal(false);
    }
    function handleReorderProductsModalSubmit(value) {
        setGroupedProducts(value);
        setGroupedProductIds(value.map((product) => product.id));
        setOpenReorderProductsModal(false);
    }
    function handleAddProductsModalClose() {
        setOpenAddProductsModal(false);
    }
    function handleReorderProductsModalClose() {
        setOpenReorderProductsModal(false);
    }
    function removeProductHandler(product) {
        return function handleRemoveClick() {
            const newGroupedProducts = groupedProducts.filter((groupedProduct) => groupedProduct.id !== product.id);
            setPreventFetch(true);
            setGroupedProducts(newGroupedProducts);
            setGroupedProductIds(newGroupedProducts.map((groupedProduct) => groupedProduct.id));
        };
    }
    return (createElement("div", { ...blockProps },
        createElement(SectionActions, null,
            !isLoading && groupedProducts.length > 0 && (createElement(Button, { onClick: handleReorderProductsButtonClick, variant: "tertiary" }, __('Reorder', 'fincommerce'))),
            createElement(Button, { onClick: handleAddProductsButtonClick, variant: "secondary" }, __('Add products', 'fincommerce'))),
        createElement("div", { className: "wp-block-fincommerce-product-list-field__body" },
            !isLoading && groupedProducts.length === 0 && (createElement(AdviceCard, { tip: __('Tip: Group together items that have a clear relationship or compliment each other well, e.g., garment bundles, camera kits, or skincare product sets.', 'fincommerce'), isDismissible: false },
                createElement(Shirt, null),
                createElement(Pants, null),
                createElement(Glasses, null))),
            !isLoading && groupedProducts.length > 0 && (createElement("div", { className: "wp-block-fincommerce-product-list-field__table", role: "table" },
                createElement("div", { className: "wp-block-fincommerce-product-list-field__table-header" },
                    createElement("div", { className: "wp-block-fincommerce-product-list-field__table-row", role: "rowheader" },
                        createElement("div", { className: "wp-block-fincommerce-product-list-field__table-header-column", role: "columnheader" }, __('Product', 'fincommerce')),
                        createElement("div", { className: "wp-block-fincommerce-product-list-field__table-header-column", role: "columnheader" }, __('Price', 'fincommerce')),
                        createElement("div", { className: "wp-block-fincommerce-product-list-field__table-header-column", role: "columnheader" }, __('Stock', 'fincommerce')),
                        createElement("div", { className: "wp-block-fincommerce-product-list-field__table-header-column", role: "columnheader" }))),
                createElement("div", { className: "wp-block-fincommerce-product-list-field__table-body", role: "rowgroup" }, groupedProducts.map((product) => (createElement("div", { key: product.id, className: "wp-block-fincommerce-product-list-field__table-row", role: "row" },
                    createElement("div", { className: "wp-block-fincommerce-product-list-field__table-cell", role: "cell" },
                        createElement("div", { className: "wp-block-fincommerce-product-list-field__product-image", style: getProductImageStyle(product) }),
                        createElement("div", { className: "wp-block-fincommerce-product-list-field__product-info" },
                            createElement("div", { className: "wp-block-fincommerce-product-list-field__product-name" },
                                createElement(Button, { variant: "link", href: getNewPath({}, `/product/${product.id}`), target: "_blank" }, product.name)),
                            createElement("div", { className: "wp-block-fincommerce-product-list-field__product-sku" }, product.sku))),
                    createElement("div", { className: "wp-block-fincommerce-product-list-field__table-cell", role: "cell" },
                        product.on_sale && (createElement("span", null, product.sale_price
                            ? formatAmount(product.sale_price)
                            : formatAmount(product.price))),
                        product.regular_price && (createElement("span", { className: clsx({
                                'wp-block-fincommerce-product-list-field__price--on-sale': product.on_sale,
                            }) }, formatAmount(product.regular_price)))),
                    createElement("div", { className: "wp-block-fincommerce-product-list-field__table-cell", role: "cell" },
                        createElement("span", { className: clsx('fincommerce-product-variations__status-dot', getProductStockStatusClass(product)) }, "\u25CF"),
                        createElement("span", null, getProductStockStatus(product))),
                    createElement("div", { className: "wp-block-fincommerce-product-list-field__table-cell", role: "cell" },
                        createElement(Button, { variant: "tertiary", icon: external, "aria-label": __('Preview the product', 'fincommerce'), href: product.permalink, target: "_blank" }),
                        createElement(Button, { type: "button", variant: "tertiary", icon: closeSmall, "aria-label": __('Remove product', 'fincommerce'), onClick: removeProductHandler(product) }))))))))),
        openAddProductsModal && (createElement(AddProductsModal, { initialValue: groupedProducts, onSubmit: handleAddProductsModalSubmit, onClose: handleAddProductsModalClose })),
        openReorderProductsModal && (createElement(ReorderProductsModal, { products: groupedProducts, onSubmit: handleReorderProductsModalSubmit, onClose: handleReorderProductsModalClose }))));
}
