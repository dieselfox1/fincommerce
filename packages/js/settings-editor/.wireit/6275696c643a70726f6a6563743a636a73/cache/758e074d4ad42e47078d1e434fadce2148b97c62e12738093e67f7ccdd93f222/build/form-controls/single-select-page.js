"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleSelectPage = void 0;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const data_1 = require("@wordpress/data");
const core_data_1 = require("@wordpress/core-data");
const icons_1 = require("@wordpress/icons");
const utils_1 = require("../utils");
// https://github.com/dieselfox1/fincommerce/blob/83a090f70d1f7b07325d9df9bd03fe2f753d4fd4/plugins/fincommerce/includes/admin/class-wc-admin-settings.php#L626-L636
const PAGE_QUERY_ARGS = {
    orderby: 'menu_order',
    order: 'asc',
    status: ['publish', 'private', 'draft'],
    per_page: -1,
    _fields: ['id', 'title'],
};
const usePages = () => {
    return (0, data_1.useSelect)((select) => {
        const { getEntityRecords, hasFinishedResolution } = select(core_data_1.store);
        const args = [
            'postType',
            'page',
            PAGE_QUERY_ARGS,
        ];
        return {
            pages: getEntityRecords(...args),
            isLoading: !hasFinishedResolution('getEntityRecords', args),
        };
    }, []);
};
const SingleSelectPage = ({ data, field, onChange, hideLabelFromVision, help, className, }) => {
    const { pages, isLoading } = usePages();
    const { id } = field;
    // DataForm will automatically use the id as the label if no label is provided so we conditionally set the label to undefined if it matches the id to avoid displaying it.
    // We should contribute upstream to allow label to be optional.
    const label = field.label === id ? undefined : ((0, element_1.createElement)("div", { dangerouslySetInnerHTML: {
            __html: (0, utils_1.sanitizeHTML)(field.label),
        } }));
    const value = field.getValue({ item: data }) ?? '';
    const onChangeControl = (0, element_1.useCallback)((newValue) => onChange({
        [id]: newValue,
    }), [id, onChange]);
    const options = (0, element_1.useMemo)(() => [
        {
            label: isLoading
                ? (0, i18n_1.__)('Loading…', 'fincommerce')
                : (0, i18n_1.__)('Select a page…', 'fincommerce'),
            value: '',
            disabled: true,
        },
        ...(pages ?? []).map((page) => ({
            value: page.id.toString(),
            label: page.title.rendered,
        })),
    ], [isLoading, pages]);
    const getSuffix = () => {
        if (isLoading) {
            return (0, element_1.createElement)(components_1.Spinner, null);
        }
        if (value) {
            return ((0, element_1.createElement)(components_1.Button, { icon: icons_1.close, iconSize: 16, size: "compact", onClick: () => onChangeControl('') }));
        }
        return null;
    };
    return ((0, element_1.createElement)(components_1.SelectControl, { className: className, suffix: getSuffix(), id: id, label: label, value: value, help: help, options: options, onChange: onChangeControl, __next40pxDefaultSize: true, __nextHasNoMarginBottom: true, hideLabelFromVision: hideLabelFromVision }));
};
exports.SingleSelectPage = SingleSelectPage;
