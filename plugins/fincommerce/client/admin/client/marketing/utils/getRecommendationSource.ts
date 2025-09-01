/**
 * Internal dependencies
 */
import { getAdminSetting } from '~/utils/admin-settings';

/**
 * Get the source of the marketing recommendations.
 *
 * When the marketplace suggestions feature is turned on, the source is 'fincommerce.com'. Otherwise, it is 'plugin-fincommerce'.
 */
export const getRecommendationSource = () => {
	if ( getAdminSetting( 'allowMarketplaceSuggestions', false ) ) {
		return 'fincommerce.com';
	}

	return 'plugin-fincommerce';
};
