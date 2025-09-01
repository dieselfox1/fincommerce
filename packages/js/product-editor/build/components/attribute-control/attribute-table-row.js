"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeTableRow = void 0;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const element_1 = require("@wordpress/element");
const icons_1 = require("@wordpress/icons");
const components_1 = require("@wordpress/components");
const data_1 = require("@wordpress/data");
const url_1 = require("@wordpress/url");
const data_2 = require("@fincommerce/data");
/**
 * Internal dependencies
 */
const attribute_combobox_field_1 = __importDefault(require("../attribute-combobox-field"));
const FormTokenField = components_1.FormTokenField;
/**
 * Convert a string or a TokenItem to a TokenItem.
 *
 * @param {string | TokenItem} v - The value to convert.
 * @return {TokenItem} The TokenItem.
 */
const stringToTokenItem = (v) => ({
    value: typeof v === 'string' ? v : v.value,
    slug: typeof v === 'string' ? (0, url_1.cleanForSlug)(v) : (0, url_1.cleanForSlug)(v.value),
});
/**
 * Convert a string or a TokenItem to a string.
 *
 * @param {string | TokenItem} item - The item to convert.
 * @return {string} The string.
 */
const tokenItemToString = (item) => (typeof item === 'string' ? item : item.value);
const INITIAL_MAX_TOKENS_TO_SHOW = 20;
const MAX_TERMS_TO_LOAD = 100;
const AttributeTableRow = ({ index, attribute, attributePlaceholder, disabledAttributeMessage, isLoadingAttributes, attributes, onNewAttributeAdd, onAttributeSelect, termPlaceholder, onTermsSelect, termsAutoSelection, clearButtonDisabled, removeLabel, onRemove, }) => {
    const attributeId = attribute ? attribute.id : undefined;
    const { createProductAttributeTerm } = (0, data_1.useDispatch)(data_2.experimentalProductAttributeTermsStore);
    const selectItemsQuery = (0, element_1.useMemo)(() => ({
        search: '',
        attribute_id: attributeId,
        per_page: MAX_TERMS_TO_LOAD, // @todo: handle this by using `search` arg
    }), [attributeId]);
    /*
     * Get the global terms from the current attribute,
     * used in the token field suggestions and values.
     */
    const globalAttributeTerms = (0, data_1.useSelect)(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (select) => {
        const { getProductAttributeTerms } = select(data_2.experimentalProductAttributeTermsStore);
        return attributeId
            ? getProductAttributeTerms(selectItemsQuery)
            : [];
    }, [attributeId, selectItemsQuery]);
    /*
     * Local terms to handle not global (local) attributes.
     * Set initially with the attribute options.
     */
    const [localTerms, setLocalTerms] = (0, element_1.useState)(attribute?.options?.map(stringToTokenItem) || []);
    /**
     * Use the temporary terms to store and show
     * the new terms on the fly,
     * before they are created by hitting the API.
     */
    const [temporaryTerms, setTemporaryTerms] = (0, element_1.useState)([]);
    /*
     * By convention, it's a local attribute when the id is 0.
     * Local attributes are store as part of the product data.
     */
    const isLocalAttribute = attribute?.id === 0;
    /*
     * When isLocalAttribute is true, allTerms is the localTerms,
     * otherwise, it is the attribute terms (mapped to their names)
     */
    const allTerms = (isLocalAttribute
        ? localTerms.map(tokenItemToString)
        : globalAttributeTerms?.map((term) => term.name)) || [];
    /*
     * For `suggestions` (the values of the FormTokenField component),
     * combine the temporary terms with the attribute options or terms,
     * removing duplicates.
     */
    const tokenFieldSuggestions = [
        ...(allTerms || []),
        ...temporaryTerms.map(tokenItemToString),
    ].filter((value, i, self) => self.indexOf(value) === i);
    /*
     * Build attribute terms object from the attribute,
     * used to populate the token field.
     * When the attribute is global, uses straight the attribute options.
     * Otherwise, uses the (mapped) attribute terms.
     */
    const attributeTerms = (isLocalAttribute
        ? attribute.options?.map(stringToTokenItem)
        : attribute?.terms?.map(({ name }) => stringToTokenItem(name))) || [];
    // Combine the temporary terms with the selected values.
    const tokenFieldValues = [
        ...(attributeTerms || []),
        ...temporaryTerms,
    ];
    // Flag to track if the terms are initially populated.
    const [initiallyPopulated, setInitiallyPopulated] = (0, element_1.useState)(false);
    // Auto select terms based on the termsAutoSelection prop.
    (0, element_1.useEffect)(() => {
        // If the terms are not set, bail early.
        if (!termsAutoSelection) {
            return;
        }
        // If the terms are already populated, bail early.
        if (initiallyPopulated) {
            return;
        }
        // If the attribute is not set, bail early.
        if (!attribute) {
            return;
        }
        // If the terms are not loaded, bail early.
        if (!globalAttributeTerms?.length) {
            return;
        }
        // Set the flag to true.
        setInitiallyPopulated(true);
        /*
         * If terms auto selection is set to 'first',
         * and there are terms, select the first term,
         * and bail early.
         */
        if (termsAutoSelection === 'first') {
            return onTermsSelect([globalAttributeTerms[0]], index, attribute);
        }
        // auto select the first INITIAL_MAX_TOKENS_TO_SHOW terms
        onTermsSelect(globalAttributeTerms.slice(0, INITIAL_MAX_TOKENS_TO_SHOW), index, attribute);
    }, [
        termsAutoSelection,
        initiallyPopulated,
        attribute,
        globalAttributeTerms,
        onTermsSelect,
        index,
    ]);
    /*
     * Filter the attributes to exclude
     * attributes that are already taken,
     * less the current attribute.
     */
    const filteredAttributes = attributes?.filter((item) => {
        return (item.id === attributeId ||
            (typeof item?.takenBy !== 'undefined' ? item.takenBy < 0 : true));
    });
    async function addNewTerms(newTokens) {
        if (!attribute) {
            return;
        }
        /*
         * Create the temporary terms.
         * It will show the tokens in the token field
         * optimistically, before the terms are created.
         */
        setTemporaryTerms((prevTerms) => [...prevTerms, ...newTokens]);
        // Create the new terms.
        const promises = newTokens.map(async (token) => {
            try {
                const newTerm = await createProductAttributeTerm({
                    name: token.value,
                    slug: token.slug,
                    attribute_id: attributeId,
                }, {
                    optimisticQueryUpdate: selectItemsQuery,
                    optimisticUrlParameters: attributeId
                        ? [attributeId]
                        : [],
                });
                return newTerm;
            }
            catch (error) {
                (0, data_1.dispatch)('core/notices').createErrorNotice((0, i18n_1.sprintf)(
                /* translators: %s: the attribute term */
                (0, i18n_1.__)('There was an error trying to create the attribute term "%s".', 'fincommerce'), token.value));
                return undefined;
            }
        });
        const newTerms = await Promise.all(promises);
        const storedTerms = newTerms.filter((term) => term !== undefined);
        // Remove the recently created terms from the temporary state,
        setTemporaryTerms((prevTerms) => prevTerms.filter((term) => !newTokens.includes(term)));
        /*
         * Pull the recent terms list from the store
         * to get the terms that were just created.
         * @Todo: using this `sel` alias is a workaround.
         * The optimistic rendering should be implemented in the store.
         */
        const recentTermsList = (0, data_1.select)(data_2.experimentalProductAttributeTermsStore).getProductAttributeTerms(selectItemsQuery);
        /*
         * New selected terms are the ones that are in the recent terms list
         * and also in the token field values.
         */
        const newSelectedTerms = recentTermsList?.filter((term) => tokenFieldValues
            .map((item) => item.value)
            .includes(term.name)) ?? [];
        // Call the callback to update the Form terms.
        onTermsSelect([...newSelectedTerms, ...storedTerms], index, attribute);
    }
    /*
     * Check if there are available suggestions
     * to show the values column,
     * comparing the suggestions length with the selected values length.
     */
    const hasAvailableSuggestions = tokenFieldSuggestions?.length &&
        tokenFieldSuggestions.length > (tokenFieldValues?.length || 0);
    return ((0, element_1.createElement)("tr", { key: index, className: `fincommerce-new-attribute-modal__table-row fincommerce-new-attribute-modal__table-row-${index}` },
        (0, element_1.createElement)("td", { className: "fincommerce-new-attribute-modal__table-attribute-column" },
            (0, element_1.createElement)(attribute_combobox_field_1.default, { instanceNumber: index, placeholder: attributePlaceholder, current: attribute, items: filteredAttributes, isLoading: isLoadingAttributes, onAddNew: (newValue) => onNewAttributeAdd?.(newValue, index), onChange: (nextAttribute) => {
                    if (nextAttribute.id === attributeId) {
                        return;
                    }
                    onAttributeSelect(nextAttribute, index);
                    setInitiallyPopulated(false);
                }, disabledAttributeMessage: disabledAttributeMessage })),
        (0, element_1.createElement)("td", { className: `fincommerce-new-attribute-modal__table-attribute-value-column${hasAvailableSuggestions ? ' has-values' : ''}` },
            (0, element_1.createElement)(FormTokenField, { placeholder: termPlaceholder, disabled: !attribute, suggestions: tokenFieldSuggestions, value: tokenFieldValues, onChange: (nextTokens) => {
                    // If there is no attribute, exit.
                    if (!attribute) {
                        return;
                    }
                    /*
                     * Pick the new tokens from the nextTokens array.
                     * (all string are considered new tokens)
                     * and map them to a new TermItem[] array.
                     */
                    const newTokens = nextTokens
                        .filter((token) => typeof token === 'string')
                        .map(stringToTokenItem);
                    // Create a string list of the next string tokens.
                    const nextStringTokens = nextTokens.map((value) => tokenItemToString(value));
                    // *** LOCAL Attributes ***
                    if (isLocalAttribute) {
                        // Update the local terms with the new tokens.
                        setLocalTerms((prevTerms) => [
                            ...prevTerms,
                            ...newTokens.map(stringToTokenItem),
                        ]);
                        // Update the form terms using the callback function.
                        onTermsSelect(nextStringTokens, index, attribute);
                        return;
                    }
                    // *** GLOBAL Attributes ***
                    /*
                     * Convert the current suggestions (tokenFieldSuggestions)
                     * to slugs[] using the cleanForSlug helper.
                     * It's used to compare the new tokens with the suggestions,
                     * to avoid creating duplicate terms.
                     *
                     * @todo: this should be handled by the API,
                     * probably allowing to create terms with the same name,
                     * but different slugs.
                     */
                    const slugSuggestions = tokenFieldSuggestions.map(url_1.cleanForSlug);
                    /*
                     * Identify new tokens that are not found
                     * in the (slugged) suggestions.
                     *
                     * This helps prevent creating duplicate terms
                     * with different cases, for example.
                     */
                    const newTermsToAdd = newTokens.filter((itemToken) => !slugSuggestions.includes(itemToken.slug));
                    /*
                     * Determine the selected terms to pass to the form,
                     * filtering the terms by the new string tokens.
                     */
                    const selectedTerms = globalAttributeTerms?.filter((globalTerm) => nextStringTokens.includes(globalTerm.name));
                    // Update the form terms using the callback function.
                    onTermsSelect(selectedTerms, index, attribute);
                    /*
                     * Create new terms if there are any new tokens.
                     * Set the status of new terms to 'validating'.
                     */
                    if (newTermsToAdd.length) {
                        addNewTerms(newTermsToAdd.map((item) => ({
                            ...item,
                            status: 'validating',
                        })));
                    }
                }, __experimentalExpandOnFocus: true, __experimentalAutoSelectFirstMatch: true, __experimentalShowHowTo: true })),
        (0, element_1.createElement)("td", { className: "fincommerce-new-attribute-modal__table-attribute-trash-column" },
            (0, element_1.createElement)(components_1.Button, { icon: icons_1.closeSmall, disabled: clearButtonDisabled, label: removeLabel, onClick: () => onRemove(index) }))));
};
exports.AttributeTableRow = AttributeTableRow;
