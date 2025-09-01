"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
const i18n_1 = require("@wordpress/i18n");
const dataviews_1 = require("@wordpress/dataviews");
const navigation_1 = require("@fincommerce/navigation");
const data_1 = require("@wordpress/data");
const api_fetch_1 = __importDefault(require("@wordpress/api-fetch"));
const url_1 = require("@wordpress/url");
/**
 * Internal dependencies
 */
const use_settings_form_1 = require("../hooks/use-settings-form");
const custom_view_1 = require("../components/custom-view");
const data_2 = require("../data");
const Form = ({ settings, settingsData, settingsPage, activeSection, }) => {
    const { data, fields, form, updateField } = (0, use_settings_form_1.useSettingsForm)(settings);
    const formRef = (0, element_1.useRef)(null);
    const { setSettingsData } = (0, element_1.useContext)(data_2.SettingsDataContext);
    const [isBusy, setIsBusy] = (0, element_1.useState)(false);
    const { createNotice } = (0, data_1.useDispatch)('core/notices');
    const getFormData = () => {
        if (!formRef.current) {
            return {};
        }
        const formElements = formRef.current.querySelectorAll('input, select, textarea');
        const formData = {};
        formElements.forEach((input) => {
            const key = input.name || input.id;
            // Avoid generic Gutenberg input ids. This will require upstream fixes.
            if (!key || input.id?.startsWith('inspector-')) {
                return;
            }
            formData[key] = input.value;
        });
        return formData;
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsBusy(true);
        const query = {
            page: 'wc-settings',
        };
        if (settingsPage.slug !== 'general') {
            query.tab = settingsPage.slug;
        }
        if (activeSection !== 'default') {
            query.section = activeSection;
        }
        const updatedData = getFormData();
        updatedData.save = 'Save changes';
        updatedData._wpnonce = settingsData._wpnonce;
        updatedData._w_http_referer = '/wp-admin/' + (0, navigation_1.getNewPath)(query);
        const payload = new FormData();
        for (const [key, value] of Object.entries(updatedData)) {
            payload.append(key, value);
        }
        (0, api_fetch_1.default)({
            path: (0, url_1.addQueryArgs)('/wc-admin/legacy-settings', query),
            method: 'POST',
            body: payload,
        })
            .then((response) => {
            const { data: { settingsData: responseSettingsData }, status, } = response;
            if (status === 'success') {
                setSettingsData(responseSettingsData);
                createNotice('success', (0, i18n_1.__)('Settings saved successfully', 'fincommerce'));
            }
            else {
                createNotice('error', (0, i18n_1.__)('Failed to save settings', 'fincommerce'));
            }
        })
            .catch((error) => {
            createNotice('error', (0, i18n_1.__)('Failed to save settings: ', 'fincommerce') +
                error.message);
        })
            .finally(() => {
            setIsBusy(false);
        });
    };
    return ((0, element_1.createElement)("form", { ref: formRef, id: "mainform", onSubmit: handleSubmit },
        settingsData.start && ((0, element_1.createElement)(custom_view_1.CustomView, { html: settingsData.start.content })),
        settingsPage.start && ((0, element_1.createElement)(custom_view_1.CustomView, { html: settingsPage.start.content })),
        (0, element_1.createElement)("div", { className: "fincommerce-settings-content" },
            (0, element_1.createElement)(dataviews_1.DataForm, { fields: fields, form: form, data: data, onChange: updateField })),
        (0, element_1.createElement)("div", { className: "fincommerce-settings-content-footer" },
            (0, element_1.createElement)(components_1.Button, { variant: "primary", type: "submit", isBusy: isBusy, disabled: isBusy }, (0, i18n_1.__)('Save', 'fincommerce'))),
        settingsPage.end && ((0, element_1.createElement)(custom_view_1.CustomView, { html: settingsPage.end.content }))));
};
exports.Form = Form;
