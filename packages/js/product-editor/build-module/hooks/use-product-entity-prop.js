/**
 * External dependencies
 */
import { useEntityProp } from '@wordpress/core-data';
import { useCallback, useMemo } from '@wordpress/element';
function useProductEntityProp(property, config) {
    const isMeta = property.startsWith('meta_data.');
    const metaKey = property.replace('meta_data.', '');
    const [entityPropValue, setEntityPropValue] = useEntityProp('postType', config?.postType || 'product', property);
    const [metadata, setMetadata] = useEntityProp('postType', config?.postType || 'product', 'meta_data');
    const metadataItem = useMemo(() => metadata ? metadata.find((item) => item.key === metaKey) : null, [metadata, metaKey]);
    const setMetaValue = useCallback((newValue) => {
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
export default useProductEntityProp;
