"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleSection = ScheduleSection;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const block_editor_1 = require("@wordpress/block-editor");
/**
 * Internal dependencies
 */
const use_product_scheduled_1 = require("../../../hooks/use-product-scheduled");
const utils_1 = require("../../../utils");
function ScheduleSection({ postType }) {
    const { setDate, date, formattedDate } = (0, use_product_scheduled_1.useProductScheduled)(postType);
    async function handlePublishDateTimePickerChange(value) {
        await setDate(value ?? undefined);
    }
    return ((0, element_1.createElement)(components_1.PanelBody, { initialOpen: false, 
        // @ts-expect-error title does currently support this value
        title: [
            (0, i18n_1.__)('Publish:', 'fincommerce'),
            (0, element_1.createElement)("span", { className: "editor-post-publish-panel__link", key: "label" }, formattedDate),
        ] },
        (0, element_1.createElement)(block_editor_1.__experimentalPublishDateTimePicker, { currentDate: date, onChange: handlePublishDateTimePickerChange, is12Hour: (0, utils_1.isSiteSettingsTime12HourFormatted)() })));
}
