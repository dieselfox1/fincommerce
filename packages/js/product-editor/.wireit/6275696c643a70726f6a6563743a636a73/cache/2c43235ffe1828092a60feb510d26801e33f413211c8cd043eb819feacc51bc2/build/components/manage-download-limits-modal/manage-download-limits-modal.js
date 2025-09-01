"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManageDownloadLimitsModal = ManageDownloadLimitsModal;
const clsx_1 = __importDefault(require("clsx"));
const compose_1 = require("@wordpress/compose");
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const components_1 = require("@wordpress/components");
const number_control_1 = require("../number-control");
const DOWNLOAD_LIMIT_MIN = 0;
const DOWNLOAD_LIMIT_MAX = 10_000_000_000;
const DOWNLOAD_EXPIRY_MIN = 0;
const DOWNLOAD_EXPIRY_MAX = 10_000_000_000;
/**
 * Download limit and download expiry currently support
 * `-1`, `0`/`null` and a positive integer.
 * When the value is `-1` downloads can be unlimited.
 * When the value is `0` or `null` downloads are unabled.
 * When the value is greater then `0` downloads are fixed
 * to the amount set as value.
 *
 * @param value The amount of downloads
 * @return A valid number as string or empty
 */
function getInitialValue(value) {
    if (value === null) {
        return '0';
    }
    if (value === -1) {
        return '';
    }
    return String(value);
}
function ManageDownloadLimitsModal({ initialValue, onSubmit, onClose, }) {
    const [downloadLimit, setDownloadLimit] = (0, element_1.useState)(getInitialValue(initialValue.downloadLimit));
    const [downloadExpiry, setDownloadExpiry] = (0, element_1.useState)(getInitialValue(initialValue.downloadExpiry));
    const [errors, setErrors] = (0, element_1.useState)({});
    function validateDownloadLimit() {
        if (downloadLimit && !Number.isInteger(Number(downloadLimit))) {
            setErrors((current) => ({
                ...current,
                downloadLimit: (0, i18n_1.__)('Download limit must be an integer number', 'fincommerce'),
            }));
            return false;
        }
        if (Number.parseInt(downloadLimit, 10) < DOWNLOAD_LIMIT_MIN) {
            setErrors((current) => ({
                ...current,
                downloadLimit: (0, i18n_1.sprintf)(
                // translators: %d is the minimum value of the number input.
                (0, i18n_1.__)('Download limit must be greater than or equal to %d', 'fincommerce'), DOWNLOAD_LIMIT_MIN),
            }));
            return false;
        }
        setErrors(({ downloadLimit: _, ...current }) => current);
        return true;
    }
    function validateDownloadExpiry() {
        if (downloadExpiry &&
            !Number.isInteger(Number(downloadExpiry))) {
            setErrors((current) => ({
                ...current,
                downloadExpiry: (0, i18n_1.__)('Expiry period must be an integer number', 'fincommerce'),
            }));
            return false;
        }
        if (Number.parseInt(downloadExpiry, 10) < DOWNLOAD_EXPIRY_MIN) {
            setErrors((current) => ({
                ...current,
                downloadExpiry: (0, i18n_1.sprintf)(
                // translators: %d is the minimum value of the number input.
                (0, i18n_1.__)('Expiry period must be greater than or equal to %d', 'fincommerce'), DOWNLOAD_EXPIRY_MIN),
            }));
            return false;
        }
        setErrors(({ downloadExpiry: _, ...current }) => current);
        return true;
    }
    const downloadLimitProps = {
        value: downloadLimit,
        onChange: setDownloadLimit,
        id: (0, compose_1.useInstanceId)(components_1.BaseControl, 'product_download_limit_field'),
        min: DOWNLOAD_LIMIT_MIN,
        max: DOWNLOAD_LIMIT_MAX,
        className: (0, clsx_1.default)({
            'has-error': errors.downloadLimit,
        }),
        label: (0, i18n_1.__)('Download limit', 'fincommerce'),
        help: (0, i18n_1.__)('Decide how many times customers can download files after purchasing the product. Leave blank for unlimited re-downloads.', 'fincommerce'),
        error: errors.downloadLimit,
        placeholder: (0, i18n_1.__)('Unlimited', 'fincommerce'),
        suffix: (0, i18n_1.__)('times', 'fincommerce'),
        onBlur() {
            validateDownloadLimit();
        },
    };
    const downloadExpiryProps = {
        value: downloadExpiry,
        onChange: setDownloadExpiry,
        id: (0, compose_1.useInstanceId)(components_1.BaseControl, 'product_download_expiry_field'),
        min: DOWNLOAD_EXPIRY_MIN,
        max: DOWNLOAD_EXPIRY_MAX,
        className: (0, clsx_1.default)({
            'has-error': errors.downloadExpiry,
        }),
        label: (0, i18n_1.__)('Expiry period', 'fincommerce'),
        help: (0, i18n_1.__)('Decide how long customers can access the files after purchasing the product. Leave blank for unlimited access.', 'fincommerce'),
        error: errors.downloadExpiry,
        placeholder: (0, i18n_1.__)('Unlimited', 'fincommerce'),
        suffix: (0, i18n_1.__)('days', 'fincommerce'),
        onBlur() {
            validateDownloadExpiry();
        },
    };
    function handleSubmit(event) {
        event.preventDefault();
        const isDownloadLimitValid = validateDownloadLimit();
        const isDownloadExpiryValid = validateDownloadExpiry();
        if (isDownloadLimitValid && isDownloadExpiryValid) {
            onSubmit({
                downloadLimit: downloadLimit === ''
                    ? -1
                    : Number.parseInt(downloadLimit, 10),
                downloadExpiry: downloadExpiry === ''
                    ? -1
                    : Number.parseInt(downloadExpiry, 10),
            });
        }
    }
    function handleCancelClick() {
        onClose();
    }
    return ((0, element_1.createElement)(components_1.Modal, { title: (0, i18n_1.__)('Manage download limits', 'fincommerce'), className: "fincommerce-manage-download-limits-modal", onRequestClose: onClose },
        (0, element_1.createElement)("form", { noValidate: true, onSubmit: handleSubmit },
            (0, element_1.createElement)("div", { className: "fincommerce-manage-download-limits-modal__content" },
                (0, element_1.createElement)(number_control_1.NumberControl, { ...downloadLimitProps }),
                (0, element_1.createElement)(number_control_1.NumberControl, { ...downloadExpiryProps })),
            (0, element_1.createElement)("div", { className: "fincommerce-manage-download-limits-modal__actions" },
                (0, element_1.createElement)(components_1.Button, { variant: "tertiary", type: "button", onClick: handleCancelClick }, (0, i18n_1.__)('Cancel', 'fincommerce')),
                (0, element_1.createElement)(components_1.Button, { variant: "primary", type: "submit" }, (0, i18n_1.__)('Save', 'fincommerce'))))));
}
