"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulePublishModal = SchedulePublishModal;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const clsx_1 = __importDefault(require("clsx"));
/**
 * Internal dependencies
 */
const utils_1 = require("../../utils");
function SchedulePublishModal({ postType, title = (0, i18n_1.__)('Schedule product', 'fincommerce'), description = (0, i18n_1.__)('Decide when this product should become visible to customers.', 'fincommerce'), value, className, onCancel, onSchedule, isScheduling, ...props }) {
    const [date, setDate] = (0, element_1.useState)(() => value ?? (0, utils_1.getSiteDatetime)());
    function handleDateTimePickerChange(newDate) {
        setDate(newDate ?? '');
    }
    return ((0, element_1.createElement)(components_1.Modal, { ...props, title: title, className: (0, clsx_1.default)(className, 'fincommerce-schedule-publish-modal'), onRequestClose: () => onCancel?.() },
        (0, element_1.createElement)("p", { className: "fincommerce-schedule-publish-modal__description" }, description),
        (0, element_1.createElement)("div", { className: "fincommerce-schedule-publish-modal__content" },
            (0, element_1.createElement)("div", { className: "fincommerce-schedule-publish-modal__button-now" },
                (0, element_1.createElement)("strong", null, (0, i18n_1.__)('Publish', 'fincommerce')),
                (0, element_1.createElement)(components_1.Button, { variant: "link", onClick: () => handleDateTimePickerChange((0, utils_1.getSiteDatetime)()) }, (0, i18n_1.__)('Now', 'fincommerce'))),
            (0, element_1.createElement)(components_1.DateTimePicker, { currentDate: date, onChange: handleDateTimePickerChange, is12Hour: (0, utils_1.isSiteSettingsTime12HourFormatted)() })),
        (0, element_1.createElement)("div", { className: "fincommerce-schedule-publish-modal__buttons" },
            (0, element_1.createElement)(components_1.Button, { variant: "tertiary", onClick: onCancel }, (0, i18n_1.__)('Cancel', 'fincommerce')),
            (0, element_1.createElement)(components_1.Button, { variant: "primary", isBusy: isScheduling, disabled: isScheduling, onClick: () => onSchedule?.(date) }, (0, i18n_1.__)('Schedule', 'fincommerce')))));
}
