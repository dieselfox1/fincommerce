/**
 * Default shipping zone object.
 *
 * For more details on shipping zone properties, see:
 *
 * https://fincommerce.github.io/fincommerce-rest-api-docs/#shipping-zone-properties
 *
 */
const shippingZone = {
	name: 'US Domestic',
};

/**
 * Constructs a default shipping zone object.
 *
 */
const getShippingZoneExample = () => {
	return shippingZone;
};

module.exports = {
	getShippingZoneExample,
};
