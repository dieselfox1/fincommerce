/**
 * Internal dependencies
 */
import { getSetting } from '@fincommerce/block-library/assets/js/settings/shared/utils';
import { ADMIN_URL } from '@fincommerce/block-library/assets/js/settings/shared/default-constants';

describe( 'getSetting', () => {
	it( 'returns provided default for non available setting', () => {
		expect( getSetting( 'nada', 'really nada' ) ).toBe( 'really nada' );
	} );
	it( 'returns expected value for existing setting', () => {
		expect( getSetting( 'adminUrl', 'not this' ) ).toEqual( ADMIN_URL );
	} );
	it( "returns expected value for existing setting even if it's a falsy value", () => {
		expect( getSetting( 'currentUserIsAdmin', true ) ).toBe( false );
	} );
	it( 'filters value via provided filter callback', () => {
		expect( getSetting( 'some value', 'default', () => 42 ) ).toBe( 42 );
	} );
} );
