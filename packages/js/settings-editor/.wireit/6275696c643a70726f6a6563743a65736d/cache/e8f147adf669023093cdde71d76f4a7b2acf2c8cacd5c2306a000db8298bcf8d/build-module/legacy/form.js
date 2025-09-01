/**
 * External dependencies
 */
import { createElement, useRef, useContext, useState, } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { DataForm } from '@wordpress/dataviews';
import { getNewPath } from '@fincommerce/navigation';
import { useDispatch } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
/**
 * Internal dependencies
 */
import { useSettingsForm } from '../hooks/use-settings-form';
import { CustomView } from '../components/custom-view';
import { SettingsDataContext } from '../data';
export const Form = ({ settings, settingsData, settingsPage, activeSection, }) => {
    const { data, fields, form, updateField } = useSettingsForm(settings);
    const formRef = useRef(null);
    const { setSettingsData } = useContext(SettingsDataContext);
    const [isBusy, setIsBusy] = useState(false);
    const { createNotice } = useDispatch('core/notices');
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
        updatedData._w_http_referer = '/wp-admin/' + getNewPath(query);
        const payload = new FormData();
        for (const [key, value] of Object.entries(updatedData)) {
            payload.append(key, value);
        }
        apiFetch({
            path: addQueryArgs('/wc-admin/legacy-settings', query),
            method: 'POST',
            body: payload,
        })
            .then((response) => {
            const { data: { settingsData: responseSettingsData }, status, } = response;
            if (status === 'success') {
                setSettingsData(responseSettingsData);
                createNotice('success', __('Settings saved successfully', 'fincommerce'));
            }
            else {
                createNotice('error', __('Failed to save settings', 'fincommerce'));
            }
        })
            .catch((error) => {
            createNotice('error', __('Failed to save settings: ', 'fincommerce') +
                error.message);
        })
            .finally(() => {
            setIsBusy(false);
        });
    };
    return (createElement("form", { ref: formRef, id: "mainform", onSubmit: handleSubmit },
        settingsData.start && (createElement(CustomView, { html: settingsData.start.content })),
        settingsPage.start && (createElement(CustomView, { html: settingsPage.start.content })),
        createElement("div", { className: "fincommerce-settings-content" },
            createElement(DataForm, { fields: fields, form: form, data: data, onChange: updateField })),
        createElement("div", { className: "fincommerce-settings-content-footer" },
            createElement(Button, { variant: "primary", type: "submit", isBusy: isBusy, disabled: isBusy }, __('Save', 'fincommerce'))),
        settingsPage.end && (createElement(CustomView, { html: settingsPage.end.content }))));
};
