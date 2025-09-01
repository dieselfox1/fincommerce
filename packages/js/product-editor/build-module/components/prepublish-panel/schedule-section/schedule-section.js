/**
 * External dependencies
 */
import { PanelBody } from '@wordpress/components';
import { createElement } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { 
// @ts-expect-error __experimentalPublishDateTimePicker does not exist
__experimentalPublishDateTimePicker as PublishDateTimePicker, } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */
import { useProductScheduled } from '../../../hooks/use-product-scheduled';
import { isSiteSettingsTime12HourFormatted } from '../../../utils';
export function ScheduleSection({ postType }) {
    const { setDate, date, formattedDate } = useProductScheduled(postType);
    async function handlePublishDateTimePickerChange(value) {
        await setDate(value ?? undefined);
    }
    return (createElement(PanelBody, { initialOpen: false, 
        // @ts-expect-error title does currently support this value
        title: [
            __('Publish:', 'fincommerce'),
            createElement("span", { className: "editor-post-publish-panel__link", key: "label" }, formattedDate),
        ] },
        createElement(PublishDateTimePicker, { currentDate: date, onChange: handlePublishDateTimePickerChange, is12Hour: isSiteSettingsTime12HourFormatted() })));
}
