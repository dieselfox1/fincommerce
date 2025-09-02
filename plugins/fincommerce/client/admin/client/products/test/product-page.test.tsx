/**
 * External dependencies
 */
import { render } from '@testing-library/react';
import { recordEvent } from '@fincommerce/tracks';
import { useParams } from 'react-router-dom';

/**
 * Internal dependencies
 */
import ProductPage from '../product-page';
import ProductVariationPage from '../product-variation-page';

jest.mock( '@fincommerce/tracks', () => ( {
	recordEvent: jest.fn(),
} ) );
jest.mock( 'react-router-dom', () => ( { useParams: jest.fn() } ) );

// Mocks to prevent crashes.
jest.mock( '@finpress/api-fetch', () => ( {
	apiFetch: jest.fn(),
} ) );
jest.mock( '@finpress/core-data', () => ( {
	apiFetch: jest.fn(),
} ) );
jest.mock( '../hooks/use-product-entity-record', () => ( {
	useProductEntityRecord: jest.fn(),
} ) );
jest.mock( '../hooks/use-product-variation-entity-record', () => ( {
	useProductVariationEntityRecord: jest.fn(),
} ) );
jest.mock( '@fincommerce/product-editor', () => ( {
	...jest.requireActual( '@fincommerce/product-editor' ),
	productEditorHeaderApiFetchMiddleware: jest.fn(),
	productApiFetchMiddleware: jest.fn(),
	__experimentalInitBlocks: jest.fn().mockImplementation( () => () => {} ),
} ) );
jest.mock( '@fincommerce/product-editor', () => ( {
	__experimentalEditor: jest.fn(),
	__experimentalInitBlocks: jest.fn().mockImplementation( () => () => {} ),
	__experimentalWooProductMoreMenuItem: jest.fn(),
	productApiFetchMiddleware: jest.fn(),
	productEditorHeaderApiFetchMiddleware: jest.fn(),
	TRACKS_SOURCE: 'test-source',
	__experimentalProductMVPCESFooter: jest.fn(),
	__experimentalEditorLoadingContext: jest.fn(),
	__experimentalProductMVPFeedbackModalContainer: jest.fn(),
} ) );

const TRACKS_SOURCE = 'test-source';
describe( 'ProductPage', () => {
	beforeEach( () => {
		jest.clearAllMocks();
	} );
	it( 'should trigger product_add_view on render without product_id defined', () => {
		( useParams as jest.Mock ).mockReturnValue( { productId: null } );
		render( <ProductPage /> );
		expect( recordEvent ).toBeCalledWith( 'product_add_view', {
			source: TRACKS_SOURCE,
		} );
	} );
	it( 'should trigger product_edit_view on render with product_id defined', () => {
		( useParams as jest.Mock ).mockReturnValue( { productId: 1 } );
		render( <ProductPage /> );
		expect( recordEvent ).toBeCalledWith( 'product_edit_view', {
			source: TRACKS_SOURCE,
			product_id: 1,
		} );
	} );
} );

describe( 'ProductVariationPage', () => {
	beforeEach( () => {
		jest.clearAllMocks();
	} );
	it( 'should trigger product_add_view track event on render without product_id defined', () => {
		( useParams as jest.Mock ).mockReturnValue( { productId: null } );
		render( <ProductVariationPage /> );
		expect( recordEvent ).toBeCalledWith( 'product_add_view', {
			source: TRACKS_SOURCE,
		} );
	} );
	it( 'should trigger product_edit_view track event on render with product_id defined', () => {
		( useParams as jest.Mock ).mockReturnValue( { productId: 1 } );
		render( <ProductVariationPage /> );
		expect( recordEvent ).toBeCalledWith( 'product_edit_view', {
			source: TRACKS_SOURCE,
			product_id: 1,
		} );
	} );
} );
