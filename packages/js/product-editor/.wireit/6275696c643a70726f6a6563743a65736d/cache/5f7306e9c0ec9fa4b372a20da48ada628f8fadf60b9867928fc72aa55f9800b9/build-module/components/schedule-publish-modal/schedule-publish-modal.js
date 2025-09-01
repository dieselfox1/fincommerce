/**
 * External dependencies
 */
import { Button, DateTimePicker, Modal } from '@wordpress/components';
import { createElement, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import clsx from 'clsx';
/**
 * Internal dependencies
 */
import { getSiteDatetime, isSiteSettingsTime12HourFormatted, } from '../../utils';
export function SchedulePublishModal({ postType, title = __('Schedule product', 'fincommerce'), description = __('Decide when this product should become visible to customers.', 'fincommerce'), value, className, onCancel, onSchedule, isScheduling, ...props }) {
    const [date, setDate] = useState(() => value ?? getSiteDatetime());
    function handleDateTimePickerChange(newDate) {
        setDate(newDate ?? '');
    }
    return (createElement(Modal, { ...props, title: title, className: clsx(className, 'fincommerce-schedule-publish-modal'), onRequestClose: () => onCancel?.() },
        createElement("p", { className: "fincommerce-schedule-publish-modal__description" }, description),
        createElement("div", { className: "fincommerce-schedule-publish-modal__content" },
            createElement("div", { className: "fincommerce-schedule-publish-modal__button-now" },
                createElement("strong", null, __('Publish', 'fincommerce')),
                createElement(Button, { variant: "link", onClick: () => handleDateTimePickerChange(getSiteDatetime()) }, __('Now', 'fincommerce'))),
            createElement(DateTimePicker, { currentDate: date, onChange: handleDateTimePickerChange, is12Hour: isSiteSettingsTime12HourFormatted() })),
        createElement("div", { className: "fincommerce-schedule-publish-modal__buttons" },
            createElement(Button, { variant: "tertiary", onClick: onCancel }, __('Cancel', 'fincommerce')),
            createElement(Button, { variant: "primary", isBusy: isScheduling, disabled: isScheduling, onClick: () => onSchedule?.(date) }, __('Schedule', 'fincommerce')))));
}
