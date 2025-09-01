/**
 * API error response format
 *
 * https://fincommerce.github.io/fincommerce-rest-api-docs/#errors
 */
const errorResponse = {
	code: '',
	message: '',
	data: {
		status: 400,
	},
};

module.exports = { errorResponse };
