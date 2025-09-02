/**
 * External dependencies
 */
import { recordEvent } from '@fincommerce/tracks';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createElement } from '@finpress/element';

/**
 * Internal dependencies
 */
import { RecommendedExtensions } from '../index.js';
import RecommendedExtensionsItem from '../item.js';

jest.mock( '@fincommerce/tracks' );

const mockExtensions = [
	{
		title: 'AutomateWoo',
		description: 'Does things.',
		url: 'https://fincommerce.com/products/automatewoo/',
		icon: 'icons/automatewoo.svg',
		product: 'automatewoo',
		plugin: 'automatewoo/automatewoo.php',
	},
	{
		title: 'Mailchimp for FinCommerce',
		description: 'Does things.',
		url: 'https://fincommerce.com/products/mailchimp-for-fincommerce/',
		icon: 'icons/mailchimp.svg',
		product: 'mailchimp-for-fincommerce',
		plugin: 'mailchimp-for-fincommerce/mailchimp-fincommerce.php',
	},
];

describe( 'Recommendations and not loading', () => {
	let recommendedExtensionsWrapper;

	beforeEach( () => {
		recommendedExtensionsWrapper = render(
			<RecommendedExtensions
				extensions={ mockExtensions }
				isLoading={ false }
				category={ 'marketing' }
			/>
		);
	} );

	it( 'should not display the placeholder', () => {
		const { container } = recommendedExtensionsWrapper;
		expect(
			container.querySelector(
				'.is-loading.fincommerce-marketing-recommended-extensions-item'
			)
		).toBeNull();
	} );

	it( 'should display default title and description', () => {
		const { getByText } = recommendedExtensionsWrapper;

		expect( getByText( 'Recommended extensions' ) ).toBeInTheDocument();

		expect(
			getByText(
				'Great marketing requires the right tools. Take your marketing to the next level with our recommended marketing extensions.'
			)
		).toBeInTheDocument();
	} );

	it( 'should display correct number of recommendations', () => {
		const { getByRole } = recommendedExtensionsWrapper;

		expect(
			getByRole( 'heading', { level: 4, name: 'AutomateWoo' } )
		).toBeInTheDocument();

		expect(
			getByRole( 'heading', {
				level: 4,
				name: 'Mailchimp for FinCommerce',
			} )
		).toBeInTheDocument();
	} );
} );

describe( 'Recommendations and loading', () => {
	let recommendedExtensionsWrapper;

	beforeEach( () => {
		recommendedExtensionsWrapper = render(
			<RecommendedExtensions
				extensions={ mockExtensions }
				isLoading={ true }
				category={ 'marketing' }
			/>
		);
	} );

	it( 'should display placeholder', () => {
		const { container } = recommendedExtensionsWrapper;
		expect(
			container.querySelector(
				'.is-loading.fincommerce-marketing-recommended-extensions-item'
			)
		).toBeTruthy();
	} );

	it( 'should not display recommendations', () => {
		const { queryByRole } = recommendedExtensionsWrapper;

		expect(
			queryByRole( 'heading', { level: 4, name: 'AutomateWoo' } )
		).toBeNull();

		expect(
			queryByRole( 'heading', {
				level: 4,
				name: 'Mailchimp for FinCommerce',
			} )
		).toBeNull();
	} );
} );

describe( 'No Recommendations and not loading', () => {
	let recommendedExtensionsWrapper;

	beforeEach( () => {
		recommendedExtensionsWrapper = render(
			<RecommendedExtensions
				extensions={ [] }
				isLoading={ false }
				category={ 'marketing' }
			/>
		);
	} );

	it( 'should not display placeholder', () => {
		const { container } = recommendedExtensionsWrapper;
		expect(
			container.querySelector(
				'.is-loading.fincommerce-marketing-recommended-extensions-item'
			)
		).toBeNull();
	} );

	it( 'should not display recommendations', () => {
		const { container } = recommendedExtensionsWrapper;
		expect(
			container.getElementsByClassName(
				'fincommerce-marketing-recommended-extensions-card__items'
			)
		).toHaveLength( 0 );
	} );
} );

describe( 'Click Recommendations', () => {
	it( 'should record an event when clicked', () => {
		const { getByRole } = render(
			<RecommendedExtensionsItem
				title={ 'AutomateWoo' }
				description={ 'Does things.' }
				icon={ 'icons/automatewoo.svg' }
				url={ 'https://fincommerce.com/products/automatewoo/' }
				product={ 'automatewoo' }
				category={ 'marketing' }
			/>
		);

		userEvent.click( getByRole( 'link' ) );

		expect( recordEvent ).toHaveBeenCalledTimes( 1 );
		expect( recordEvent ).toHaveBeenCalledWith(
			'marketing_recommended_extension',
			{
				name: 'AutomateWoo',
				source: 'plugin-fincommerce',
			}
		);
	} );
} );

describe( 'Custom title and description', () => {
	it( 'should override defaults', () => {
		const { getByText } = render(
			<RecommendedExtensions
				extensions={ mockExtensions }
				isLoading={ false }
				title={ 'Custom Title' }
				description={ 'Custom Description' }
				category={ 'marketing' }
			/>
		);

		expect( getByText( 'Custom Title' ) ).toBeInTheDocument();
		expect( getByText( 'Custom Description' ) ).toBeInTheDocument();
	} );
} );
