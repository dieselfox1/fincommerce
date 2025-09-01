"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useProductAttributes = useProductAttributes;
/**
 * External dependencies
 */
const data_1 = require("@fincommerce/data");
const data_2 = require("@wordpress/data");
const element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
const utils_1 = require("../utils");
const getFilteredAttributes = (attr, isVariationAttributes) => {
    return isVariationAttributes
        ? attr.filter((attribute) => !!attribute.variation)
        : attr.filter((attribute) => !attribute.variation);
};
function manageDefaultAttributes(values) {
    return values.reduce((prevDefaultAttributes, currentAttribute) => {
        if (
        // defaults to true.
        currentAttribute.isDefault === undefined ||
            currentAttribute.isDefault === true) {
            return [
                ...prevDefaultAttributes,
                {
                    id: currentAttribute.id,
                    name: currentAttribute.name,
                    option: currentAttribute.options[0],
                },
            ];
        }
        return prevDefaultAttributes;
    }, []);
}
function useProductAttributes({ allAttributes = [], isVariationAttributes = false, onChange, productId, }) {
    const [attributes, setAttributes] = (0, element_1.useState)(getFilteredAttributes(allAttributes, isVariationAttributes));
    const fetchTerms = (0, element_1.useCallback)((attributeId) => {
        return (0, data_2.resolveSelect)(data_1.experimentalProductAttributeTermsStore)
            .getProductAttributeTerms({
            attribute_id: attributeId,
        })
            .then((attributeTerms) => {
            return attributeTerms;
        }, (error) => {
            return error;
        });
    }, [productId]);
    const enhanceAttribute = (globalAttribute, allTerms) => {
        return {
            ...globalAttribute,
            terms: (allTerms || []).filter((term) => globalAttribute.options.includes(term.name)),
        };
    };
    const getAugmentedAttributes = (atts, variation, startPosition) => {
        return atts.map(({ isDefault, terms, ...attribute }, index) => ({
            ...attribute,
            variation,
            position: startPosition + index,
        }));
    };
    const handleChange = (newAttributes) => {
        const defaultAttributes = manageDefaultAttributes(newAttributes);
        let otherAttributes = isVariationAttributes
            ? allAttributes.filter((attribute) => !attribute.variation)
            : allAttributes.filter((attribute) => !!attribute.variation);
        // Remove duplicate global attributes.
        otherAttributes = otherAttributes.filter((attr) => {
            if (attr.id > 0 &&
                newAttributes.some((a) => a.id === attr.id)) {
                return false;
            }
            // Local attributes we check by name.
            if (attr.id === 0 &&
                newAttributes.some((a) => a.name.toLowerCase() === attr.name.toLowerCase())) {
                return false;
            }
            return true;
        });
        const newAugmentedAttributes = getAugmentedAttributes(newAttributes, isVariationAttributes, isVariationAttributes ? otherAttributes.length : 0);
        const otherAugmentedAttributes = getAugmentedAttributes(otherAttributes, !isVariationAttributes, isVariationAttributes ? 0 : newAttributes.length);
        if (isVariationAttributes) {
            onChange([...otherAugmentedAttributes, ...newAugmentedAttributes], defaultAttributes);
        }
        else {
            onChange([...newAugmentedAttributes, ...otherAugmentedAttributes], defaultAttributes);
        }
    };
    const fetchAttributes = (0, element_1.useCallback)(() => {
        const [localAttributes, globalAttributes,] = (0, utils_1.sift)(getFilteredAttributes(allAttributes, isVariationAttributes), (attr) => attr.id === 0);
        Promise.all(globalAttributes.map((attr) => fetchTerms(attr.id))).then((termData) => {
            setAttributes([
                ...globalAttributes.map((attr, index) => 
                // @ts-expect-error: termData definition is different from the expected type.
                enhanceAttribute(attr, termData[index])),
                ...localAttributes,
            ]);
        });
    }, [allAttributes, isVariationAttributes, fetchTerms]);
    return {
        attributes,
        fetchAttributes,
        handleChange,
        setAttributes,
    };
}
