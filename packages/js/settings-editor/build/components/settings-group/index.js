"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsGroup = void 0;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const dataviews_1 = require("@wordpress/dataviews");
/**
 * Internal dependencies
 */
const use_settings_form_1 = require("../../hooks/use-settings-form");
const utils_1 = require("../../utils");
const SettingsGroup = ({ title, desc, settings, }) => {
    const { data, fields, form, updateField } = (0, use_settings_form_1.useSettingsForm)(settings);
    return ((0, element_1.createElement)("fieldset", { className: "fincommerce-settings-group" },
        (0, element_1.createElement)("div", { className: "fincommerce-settings-group-title" },
            (0, element_1.createElement)(components_1.__experimentalHeading, { level: 4 }, title),
            desc && ((0, element_1.createElement)("legend", { dangerouslySetInnerHTML: {
                    __html: (0, utils_1.sanitizeHTML)(desc),
                } }))),
        (0, element_1.createElement)("div", { className: "fincommerce-settings-group-content" },
            (0, element_1.createElement)(dataviews_1.DataForm, { data: data, fields: fields, form: form, onChange: updateField }))));
};
exports.SettingsGroup = SettingsGroup;
