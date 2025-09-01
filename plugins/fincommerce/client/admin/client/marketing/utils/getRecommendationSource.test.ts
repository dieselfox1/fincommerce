/**
 * Internal dependencies
 */
import { getAdminSetting } from '~/utils/admin-settings';
import { getRecommendationSource } from './getRecommendationSource';

jest.mock( '~/utils/admin-settings', () => ( {
	getAdminSetting: jest.fn(),
} ) );

describe( 'getRecommendationSource', () => {
	it( 'should return "fincommerce.com" when marketplace suggestions feature is turned on', () => {
		( getAdminSetting as jest.Mock ).mockReturnValue( true );

		const source = getRecommendationSource();

		expect( getAdminSetting ).toHaveBeenCalledWith(
			'allowMarketplaceSuggestions',
			false
		);
		expect( source ).toBe( 'fincommerce.com' );
	} );

	it( 'should return "plugin-fincommerce" when marketplace suggestions feature is turned off', () => {
		( getAdminSetting as jest.Mock ).mockReturnValue( false );

		const source = getRecommendationSource();

		expect( getAdminSetting ).toHaveBeenCalledWith(
			'allowMarketplaceSuggestions',
			false
		);
		expect( source ).toBe( 'plugin-fincommerce' );
	} );
} );
