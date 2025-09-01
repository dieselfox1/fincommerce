"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const core_data_1 = require("@wordpress/core-data");
const element_1 = require("@wordpress/element");
function useProductEntityProp(property, config) {
    const isMeta = property.startsWith('meta_data.');
    const metaKey = property.replace('meta_data.', '');
    const [entityPropValue, setEntityPropValue] = (0, core_data_1.useEntityProp)('postType', config?.postType || 'product', property);
    const [metadata, setMetadata] = (0, core_data_1.useEntityProp)('postType', config?.postType || 'product', 'meta_data');
    const metadataItem = (0, element_1.useMemo)(() => metadata ? metadata.find((item) => item.key === metaKey) : null, [metadata, metaKey]);
    const setMetaValue = (0, element_1.useCallback)((newValue) => {
        if (!metadataItem) {
            setMetadata([
                ...metadata,
                {
                    key: metaKey,
                    value: newValue,
                },
            ]);
            return;
        }
        setMetadata(metadata.map((item) => {
            if (item.key === metaKey) {
                return { ...item, value: newValue };
            }
            return item;
        }));
    }, [metadata, metaKey, metadataItem]);
    if (isMeta) {
        const metaValue = metadataItem?.value ?? config?.fallbackValue;
        return [metaValue, setMetaValue];
    }
    return [entityPropValue, setEntityPropValue];
}
exports.default = useProductEntityProp;
