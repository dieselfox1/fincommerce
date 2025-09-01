"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLayoutTemplate = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const core_data_1 = require("@wordpress/core-data");
const data_1 = require("@wordpress/data");
const useLayoutTemplate = (layoutTemplateId) => {
    const [isEntityRegistered, setIsEntityRegistered] = (0, element_1.useState)(false);
    (0, element_1.useEffect)(() => {
        if (!layoutTemplateId)
            return;
        const layoutTemplateEntity = (0, data_1.select)(core_data_1.store).getEntityConfig('root', 'wcLayoutTemplate');
        if (!layoutTemplateEntity) {
            (0, data_1.dispatch)(core_data_1.store).addEntities([
                {
                    kind: 'root',
                    name: 'wcLayoutTemplate',
                    baseURL: '/wc/v3/layout-templates',
                    label: 'Layout Templates',
                },
            ]);
        }
        setIsEntityRegistered(true);
    }, [layoutTemplateId]);
    const { record: layoutTemplate, isResolving } = (0, core_data_1.useEntityRecord)('root', 'wcLayoutTemplate', 
    // Because of the regression mentioned below, REST API requests will still be triggered
    // even when the query is disabled. This means that if we pass `undefined`/`null` as the ID,
    // the query will be triggered with no ID, which will return all layout templates.
    // To prevent this, we pass `__invalid-template-id` as the ID when there is no layout template ID.
    // A request will still be triggered, but it will return no results.
    layoutTemplateId || '__invalid-template-id', 
    // Only perform the query if the layout template entity is registered and we have a layout template ID; otherwise, just return null.
    // Note: Until we are using @fincommerce/core-data 6.24.0 (Gutenberg 17.2),
    // the REST API requests will still be triggered even when the query is disabled due to a regression.
    // See: https://github.com/WordPress/gutenberg/pull/56108
    { enabled: isEntityRegistered && !!layoutTemplateId });
    return { layoutTemplate, isResolving };
};
exports.useLayoutTemplate = useLayoutTemplate;
