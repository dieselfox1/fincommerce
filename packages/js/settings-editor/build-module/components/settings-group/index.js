/**
 * External dependencies
 */
import { __experimentalHeading as Heading } from '@wordpress/components';
import { createElement } from '@wordpress/element';
import { DataForm } from '@wordpress/dataviews';
/**
 * Internal dependencies
 */
import { useSettingsForm } from '../../hooks/use-settings-form';
import { sanitizeHTML } from '../../utils';
export const SettingsGroup = ({ title, desc, settings, }) => {
    const { data, fields, form, updateField } = useSettingsForm(settings);
    return (createElement("fieldset", { className: "fincommerce-settings-group" },
        createElement("div", { className: "fincommerce-settings-group-title" },
            createElement(Heading, { level: 4 }, title),
            desc && (createElement("legend", { dangerouslySetInnerHTML: {
                    __html: sanitizeHTML(desc),
                } }))),
        createElement("div", { className: "fincommerce-settings-group-content" },
            createElement(DataForm, { data: data, fields: fields, form: form, onChange: updateField }))));
};
