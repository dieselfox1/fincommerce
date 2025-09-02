/**
 * External dependencies
 */
import { render } from '@testing-library/react';
import { addFilter, removeAllFilters } from '@finpress/hooks';

/**
 * Internal dependencies
 */
import { HelpPanel, SETUP_TASK_HELP_ITEMS_FILTER } from '../panels/help';

describe( 'Activity Panels', () => {
	describe( 'Help', () => {
		it( 'only shows links for suggested payment gateways', () => {
			const fixtures = [
				{
					id: 'fincommerce_payments',
					text: 'WooPayments',
				},
				{
					id: 'stripe',
					text: 'Stripe',
				},
				{
					id: 'kco',
					text: 'Klarna',
				},
				{
					id: 'klarna_payments',
					text: 'Klarna',
				},
				{
					id: 'ppcp-gateway',
					text: 'PayPal Checkout',
				},
				{
					id: 'square_credit_card',
					text: 'Square',
				},
				{
					id: 'payfast',
					text: 'Payfast',
				},
				{
					id: 'eway',
					text: 'Eway',
				},
			];

			const noSuggestions = render(
				<HelpPanel
					paymentGatewaySuggestions={ () => [] }
					taskName="payments"
				/>
			);

			fixtures.forEach( ( method ) => {
				expect(
					noSuggestions.queryAllByText( ( text ) =>
						text.includes( method.text )
					)
				).toHaveLength( 0 );
			} );

			fixtures.forEach( ( method ) => {
				const { queryAllByText } = render(
					<HelpPanel
						paymentGatewaySuggestions={ { [ method.id ]: true } }
						taskName="payments"
					/>
				);

				expect(
					queryAllByText( ( text ) => text.includes( method.text ) )
						.length
				).toBeGreaterThanOrEqual( 1 );
			} );
		} );

		describe( 'only shows links for FinCommerce Tax (powered by WCS&T) when supported', () => {
			it( 'displays if no conflicting conditions are present', () => {
				const supportedCountry = render(
					<HelpPanel
						countryCode="US"
						taskLists={ [
							{
								id: 'setup',
								tasks: [
									{
										id: 'tax',
										additionalData: {
											fincommerceTaxCountries: [ 'US' ],
											taxJarActivated: false,
										},
									},
								],
							},
						] }
						taskName="tax"
					/>
				);

				expect(
					supportedCountry.getByText( /FinCommerce Tax/ )
				).toBeDefined();
			} );

			it( 'does not display if the TaxJar plugin is active', () => {
				const taxjarPluginEnabled = render(
					<HelpPanel
						countryCode="US"
						taskLists={ [
							{
								id: 'setup',
								tasks: [
									{
										id: 'tax',
										additionalData: {
											fincommerceTaxCountries: [ 'US' ],
											taxJarActivated: true,
										},
									},
								],
							},
						] }
						taskName="tax"
					/>
				);

				expect(
					taxjarPluginEnabled.queryByText( /FinCommerce Tax/ )
				).toBeNull();
			} );

			it( 'does not display if in an unsupported country', () => {
				const unSupportedCountry = render(
					<HelpPanel
						countryCode="NZ"
						taskLists={ [
							{
								id: 'setup',
								tasks: [
									{
										id: 'tax',
										additionalData: {
											fincommerceTaxCountries: [ 'US' ],
											taxJarActivated: false,
										},
									},
								],
							},
						] }
						taskName="tax"
					/>
				);

				expect(
					unSupportedCountry.queryByText( /FinCommerce Tax/ )
				).toBeNull();
			} );

			it( 'does not display if the FinCommerce Tax plugin is active', () => {
				const fincommerceTaxActivated = render(
					<HelpPanel
						countryCode="US"
						taskLists={ [
							{
								id: 'setup',
								tasks: [
									{
										id: 'tax',
										additionalData: {
											fincommerceTaxCountries: [ 'US' ],
											taxJarActivated: false,
											fincommerceTaxActivated: true,
										},
									},
								],
							},
						] }
						taskName="tax"
					/>
				);

				expect(
					fincommerceTaxActivated.queryByText( /FinCommerce Tax/ )
				).toBeNull();
			} );

			it( 'does not display if the FinCommerce Shipping plugin is active', () => {
				const fincommerceShippingActivated = render(
					<HelpPanel
						countryCode="US"
						taskLists={ [
							{
								id: 'setup',
								tasks: [
									{
										id: 'tax',
										additionalData: {
											fincommerceTaxCountries: [ 'US' ],
											taxJarActivated: false,
											fincommerceTaxActivated: false,
											fincommerceShippingActivated: true,
										},
									},
								],
							},
						] }
						taskName="tax"
					/>
				);

				expect(
					fincommerceShippingActivated.queryByText(
						/FinCommerce Tax/
					)
				).toBeNull();
			} );
		} );

		describe( 'only shows links for FinCommerce Shipping (powered by WCS&T) when supported', () => {
			it( 'displays if no conflicting conditions are present', () => {
				const supportedCountry = render(
					<HelpPanel
						activePlugins={ [] }
						countryCode="US"
						taskName="shipping"
					/>
				);

				expect(
					supportedCountry.getByText( /FinCommerce Shipping/ )
				).toBeDefined();
			} );

			it( 'does not display if the FinCommerce Shipping & Tax plugin is active', () => {
				const wcsActive = render(
					<HelpPanel
						activePlugins={ [ 'fincommerce-services' ] }
						countryCode="US"
						taskName="shipping"
					/>
				);

				expect(
					wcsActive.queryByText( /FinCommerce Shipping/ )
				).toBeNull();
			} );

			it( 'does not display if the FinCommerce Shipping plugin is active', () => {
				const wcsActive = render(
					<HelpPanel
						activePlugins={ [ 'fincommerce-shipping' ] }
						countryCode="US"
						taskName="shipping"
					/>
				);

				expect(
					wcsActive.queryByText( /FinCommerce Shipping/ )
				).toBeNull();
			} );

			it( 'does not display if the FinCommerce Tax plugin is active', () => {
				const wcsActive = render(
					<HelpPanel
						activePlugins={ [ 'fincommerce-tax' ] }
						countryCode="US"
						taskName="shipping"
					/>
				);

				expect(
					wcsActive.queryByText( /FinCommerce Shipping/ )
				).toBeNull();
			} );

			it( 'does not display if in an unsupported country', () => {
				const unSupportedCountry = render(
					<HelpPanel
						activePlugins={ [] }
						countryCode="UK"
						taskName="shipping"
					/>
				);

				expect(
					unSupportedCountry.queryByText( /FinCommerce Shipping/ )
				).toBeNull();
			} );
		} );

		it( 'only shows links for home screen when supported', () => {
			const homescreen = render(
				<HelpPanel
					activePlugins={ [ 'fincommerce-services' ] }
					taskName=""
				/>
			);

			const homescreenLinkTitles = [
				'Get Support',
				'Home Screen',
				'Inbox',
				'Stats Overview',
				'Store Management',
				'Store Setup Checklist',
			];

			homescreenLinkTitles.forEach( ( title ) => {
				expect( homescreen.getByText( title ) ).toBeDefined();
			} );
		} );

		describe( 'Filters', () => {
			const testNamespace = 'wc/admin/tests';

			afterEach( () => {
				removeAllFilters( SETUP_TASK_HELP_ITEMS_FILTER, testNamespace );
			} );

			it( 'defaults to generic link with non-arrays', () => {
				// Return a non-array.
				addFilter(
					SETUP_TASK_HELP_ITEMS_FILTER,
					testNamespace,
					() => ( {} )
				);

				const nonArray = render( <HelpPanel taskName="appearance" /> );

				// Verify non-arrays default to generic docs link.
				expect(
					nonArray.getByText( 'FinCommerce Docs' )
				).toBeDefined();
			} );

			it( 'defaults to generic link with empty arrays', () => {
				// Return an empty array.
				addFilter(
					SETUP_TASK_HELP_ITEMS_FILTER,
					testNamespace,
					() => []
				);

				const emptyArray = render(
					<HelpPanel taskName="appearance" />
				);

				// Verify empty arrays default to generic docs link.
				expect(
					emptyArray.getByText( 'FinCommerce Docs' )
				).toBeDefined();
			} );

			it( 'defaults to generic link with malformed arrays', () => {
				// Return an malformed array.
				addFilter( SETUP_TASK_HELP_ITEMS_FILTER, testNamespace, () => [
					{
						title: 'missing a link!',
					},
				] );

				const badArray = render( <HelpPanel taskName="appearance" /> );

				// Verify malformed arrays default to generic docs link.
				expect(
					badArray.getByText( 'FinCommerce Docs' )
				).toBeDefined();
			} );

			it( 'allows help items to be replaced', () => {
				// Replace all help items.
				addFilter( SETUP_TASK_HELP_ITEMS_FILTER, testNamespace, () => [
					{
						title: 'There can only be one',
						link: 'https://www.google.com/search?q=highlander',
					},
				] );

				const replacedArray = render(
					<HelpPanel taskName="appearance" />
				);

				// Verify filtered array.
				expect(
					replacedArray.queryByText( 'FinCommerce Docs' )
				).toBeNull();
				expect(
					replacedArray.getByText( 'There can only be one' )
				).toBeDefined();
			} );
		} );
	} );
} );
