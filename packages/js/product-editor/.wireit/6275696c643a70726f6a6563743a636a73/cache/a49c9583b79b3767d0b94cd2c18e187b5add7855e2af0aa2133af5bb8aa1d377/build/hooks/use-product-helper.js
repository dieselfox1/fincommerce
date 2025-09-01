"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.useProductHelper = useProductHelper;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const data_1 = require("@wordpress/data");
const element_1 = require("@wordpress/element");
const WooNumber = __importStar(require("@fincommerce/number"));
const data_2 = require("@fincommerce/data");
const tracks_1 = require("@fincommerce/tracks");
const currency_1 = require("@fincommerce/currency");
/**
 * Internal dependencies
 */
const index_1 = require("../index");
const constants_1 = require("../constants");
// TODO: Having to add TS ignore comments here, should be able to address with TS config but running into issues.
function removeReadonlyProperties(product) {
    data_2.productReadOnlyProperties.forEach((key) => delete product[key]);
    return product;
}
function getNoticePreviewActions(status, permalink) {
    return status === 'publish' && permalink
        ? [
            {
                label: (0, i18n_1.__)('View in store', 'fincommerce'),
                onClick: () => {
                    (0, tracks_1.recordEvent)('product_preview_changes', {
                        source: constants_1.TRACKS_SOURCE,
                    });
                    window.open(permalink, '_blank');
                },
            },
        ]
        : [];
}
function useProductHelper() {
    const { createProduct, updateProduct, deleteProduct } = (0, data_1.useDispatch)(data_2.productsStore);
    const { batchUpdateProductVariations, invalidateResolutionForStoreSelector, } = (0, data_1.useDispatch)(data_2.experimentalProductVariationsStore);
    const { createNotice } = (0, data_1.useDispatch)('core/notices');
    const [isDeleting, setIsDeleting] = (0, element_1.useState)(false);
    const [updating, setUpdating] = (0, element_1.useState)({
        draft: false,
        publish: false,
    });
    const context = (0, element_1.useContext)(currency_1.CurrencyContext);
    /**
     * Create product with status.
     *
     * @param {Product} product    the product to be created.
     * @param {string}  status     the product status.
     * @param {boolean} skipNotice if the notice should be skipped (default: false).
     * @return {Promise<Product>} Returns a promise with the created product.
     */
    const createProductWithStatus = (0, element_1.useCallback)(async (product, status, skipNotice = false) => {
        setUpdating({
            ...updating,
            [status]: true,
        });
        return createProduct({
            ...product,
            status,
            type: (0, index_1.getDerivedProductType)(product),
        }).then((newProduct) => {
            if (!skipNotice) {
                const noticeContent = newProduct.status === 'publish'
                    ? (0, i18n_1.__)('Product published.', 'fincommerce')
                    : (0, i18n_1.__)('Product successfully created.', 'fincommerce');
                createNotice('success', `🎉‎ ${noticeContent}`, {
                    actions: getNoticePreviewActions(newProduct.status, newProduct.permalink),
                });
            }
            setUpdating({
                ...updating,
                [status]: false,
            });
            return newProduct;
        }, (error) => {
            if (!skipNotice) {
                createNotice('error', status === 'publish'
                    ? (0, i18n_1.__)('Failed to publish product.', 'fincommerce')
                    : (0, i18n_1.__)('Failed to create product.', 'fincommerce'));
            }
            setUpdating({
                ...updating,
                [status]: false,
            });
            return error;
        });
    }, [updating]);
    async function updateVariationsOrder(productId, variationsOrder) {
        if (!variationsOrder)
            return undefined;
        return batchUpdateProductVariations({
            product_id: productId,
        }, {
            update: Object.values(variationsOrder)
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                .flatMap(Object.entries)
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                .map(([id, menu_order]) => ({
                id,
                menu_order,
            })),
        });
    }
    /**
     * Update product with status.
     *
     * @param {number}  productId  the product id to be updated.
     * @param {Product} product    the product to be updated.
     * @param {string}  status     the product status.
     * @param {boolean} skipNotice if the notice should be skipped (default: false).
     * @return {Promise<Product>} Returns a promise with the updated product.
     */
    const updateProductWithStatus = (0, element_1.useCallback)(async (productId, product, status, skipNotice = false) => {
        setUpdating({
            ...updating,
            [status]: true,
        });
        return updateProduct(productId, {
            ...product,
            status,
            type: (0, index_1.getDerivedProductType)(product),
        })
            .then(async (updatedProduct) => updateVariationsOrder(updatedProduct.id, product.variationsOrder)
            .then(() => invalidateResolutionForStoreSelector('getProductVariations'))
            .then(() => updatedProduct))
            .then((updatedProduct) => {
            if (!skipNotice) {
                const noticeContent = product.status === 'draft' &&
                    updatedProduct.status === 'publish'
                    ? (0, i18n_1.__)('Product published.', 'fincommerce')
                    : (0, i18n_1.__)('Product successfully updated.', 'fincommerce');
                createNotice('success', `🎉‎ ${noticeContent}`, {
                    actions: getNoticePreviewActions(updatedProduct.status, updatedProduct.permalink),
                });
            }
            setUpdating({
                ...updating,
                [status]: false,
            });
            return updatedProduct;
        }, (error) => {
            if (!skipNotice) {
                createNotice('error', (0, i18n_1.__)('Failed to update product.', 'fincommerce'));
            }
            setUpdating({
                ...updating,
                [status]: false,
            });
            return error;
        });
    }, [updating]);
    /**
     * Creates a copy of the given product with the given status.
     *
     * @param {Product} product the product to be copied.
     * @param {string}  status  the product status.
     * @return {Promise<Product>} promise with the newly created and copied product.
     */
    const copyProductWithStatus = (0, element_1.useCallback)(async (product, status = 'draft') => {
        return createProductWithStatus(removeReadonlyProperties({
            ...product,
            name: (product.name || index_1.AUTO_DRAFT_NAME) + ' - Copy',
        }), status);
    }, []);
    /**
     * Deletes a product by given id and redirects to the product list page.
     *
     * @param {number} id the product id to be deleted.
     * @return {Promise<Product>} promise with the deleted product.
     */
    const deleteProductAndRedirect = (0, element_1.useCallback)(async (id) => {
        setIsDeleting(true);
        return deleteProduct(id).then((product) => {
            const noticeContent = (0, i18n_1.__)('Successfully moved product to Trash.', 'fincommerce');
            createNotice('success', `🎉‎ ${noticeContent}`);
            setIsDeleting(false);
            return product;
        }, (error) => {
            createNotice('error', (0, i18n_1.__)('Failed to move product to Trash.', 'fincommerce'));
            setIsDeleting(false);
            return error;
        });
    }, []);
    /**
     * Sanitizes a price.
     *
     * @param {string} price the price that will be sanitized.
     * @return {string} sanitized price.
     */
    const sanitizePrice = (0, element_1.useCallback)((price) => {
        if (!price.length) {
            return '';
        }
        const { getCurrencyConfig } = context;
        const { decimalSeparator } = getCurrencyConfig();
        // Build regex to strip out everything except digits, decimal point and minus sign.
        const regex = new RegExp(constants_1.NUMBERS_AND_DECIMAL_SEPARATOR.replace('%s', decimalSeparator), 'g');
        const decimalRegex = new RegExp(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        constants_1.ONLY_ONE_DECIMAL_SEPARATOR.replaceAll('%s', decimalSeparator), 'g');
        const cleanValue = price
            .replace(regex, '')
            .replace(decimalRegex, '')
            .replace(decimalSeparator, '.');
        return cleanValue;
    }, [context]);
    /**
     * Format a value using the Woo General Currency Settings.
     *
     * @param {string} value the value that will be formatted.
     * @return {string} the formatted number.
     */
    const formatNumber = (0, element_1.useCallback)((value) => {
        const { getCurrencyConfig } = context;
        const { decimalSeparator, thousandSeparator } = getCurrencyConfig();
        return WooNumber.numberFormat({ decimalSeparator, thousandSeparator }, value);
    }, [context]);
    /**
     * Parse a value using the Woo General Currency Settings.
     *
     * @param {string} value the value that will be parsed.
     * @return {string} the parsed number.
     */
    const parseNumber = (0, element_1.useCallback)((value) => {
        const { getCurrencyConfig } = context;
        const { decimalSeparator, thousandSeparator } = getCurrencyConfig();
        return WooNumber.parseNumber({ decimalSeparator, thousandSeparator }, value);
    }, [context]);
    return {
        createProductWithStatus,
        updateProductWithStatus,
        copyProductWithStatus,
        deleteProductAndRedirect,
        sanitizePrice,
        formatNumber,
        parseNumber,
        isUpdatingDraft: updating.draft,
        isUpdatingPublished: updating.publish,
        isDeleting,
    };
}
