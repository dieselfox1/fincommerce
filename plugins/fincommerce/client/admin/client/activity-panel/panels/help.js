/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { Text } from '@fincommerce/experimental';
import { withSelect } from '@finpress/data';
import { Fragment, useEffect } from '@finpress/element';
import { applyFilters } from '@finpress/hooks';
import { Icon, chevronRight, page } from '@finpress/icons';
import { partial } from 'lodash';
import { List, Section } from '@fincommerce/components';
import {
	onboardingStore,
	pluginsStore,
	settingsStore,
} from '@fincommerce/data';
import { compose } from 'redux';
import { recordEvent as fallbackRecordEvent } from '@fincommerce/tracks';

/**
 * Internal dependencies
 */
import ActivityHeader from '../activity-header';
import { getCountryCode } from '~/dashboard/utils';

export const SETUP_TASK_HELP_ITEMS_FILTER =
	'fincommerce_admin_setup_task_help_items';

function getHomeItems() {
	return [
		{
			title: __( 'Get Support', 'fincommerce' ),
			link: 'https://fincommerce.com/my-account/create-a-ticket/?utm_medium=product',
		},
		{
			title: __( 'Home Screen', 'fincommerce' ),
			link: 'https://fincommerce.com/document/home-screen/?utm_medium=product',
		},
		{
			title: __( 'Inbox', 'fincommerce' ),
			link: 'https://fincommerce.com/document/home-screen/?utm_medium=product#section-4',
		},
		{
			title: __( 'Stats Overview', 'fincommerce' ),
			link: 'https://fincommerce.com/document/home-screen/?utm_medium=product#section-5',
		},
		{
			title: __( 'Store Management', 'fincommerce' ),
			link: 'https://fincommerce.com/document/home-screen/?utm_medium=product#section-10',
		},
		{
			title: __( 'Store Setup Checklist', 'fincommerce' ),
			link: 'https://fincommerce.com/document/fincommerce-setup-wizard?utm_medium=product#store-setup-checklist',
		},
	];
}

function getAppearanceItems() {
	return [
		{
			title: __(
				'Showcase your products and tailor your shopping experience using Blocks',
				'fincommerce'
			),
			link: 'https://fincommerce.com/document/fincommerce-blocks/?utm_source=help_panel&utm_medium=product',
		},
		{
			title: __(
				'Manage Store Notice, Catalog View and Product Images',
				'fincommerce'
			),
			link: 'https://fincommerce.com/document/fincommerce-customizer/?utm_source=help_panel&utm_medium=product',
		},
		{
			title: __( 'How to choose and change a theme', 'fincommerce' ),
			link: 'https://fincommerce.com/document/choose-change-theme/?utm_source=help_panel&utm_medium=product',
		},
	];
}

function getMarketingItems( props ) {
	const { activePlugins } = props;

	return [
		activePlugins.includes( 'mailpoet' ) && {
			title: __( 'Get started with Mailpoet', 'fincommerce' ),
			link: 'https://kb.mailpoet.com/category/114-getting-started',
		},
		activePlugins.includes( 'google-listings-and-ads' ) && {
			title: __( 'Set up Google for FinCommerce', 'fincommerce' ),
			link: 'https://fincommerce.com/document/google-listings-and-ads/?utm_medium=product#get-started',
		},
		activePlugins.includes( 'pinterest-for-fincommerce' ) && {
			title: __( 'Set up Pinterest for FinCommerce', 'fincommerce' ),
			link: 'https://fincommerce.com/products/pinterest-for-fincommerce/',
		},
		activePlugins.includes( 'mailchimp-for-fincommerce' ) && {
			title: __( 'Connect Mailchimp for FinCommerce', 'fincommerce' ),
			link: 'https://mailchimp.com/help/connect-or-disconnect-mailchimp-for-fincommerce/',
		},
		activePlugins.includes( 'creative-mail-by-constant-contact' ) && {
			title: __( 'Set up Creative Mail for FinCommerce', 'fincommerce' ),
			link: 'https://app.creativemail.com/kb/help/FinCommerce',
		},
	].filter( Boolean );
}

function getPaymentGatewaySuggestions( props ) {
	const { paymentGatewaySuggestions } = props;

	return [
		{
			title: __( 'Which Payment Option is Right for Me?', 'fincommerce' ),
			link: 'https://fincommerce.com/document/premium-payment-gateway-extensions/?utm_source=help_panel&utm_medium=product',
		},
		paymentGatewaySuggestions.fincommerce_payments && {
			title: __( 'WooPayments Start Up Guide', 'fincommerce' ),
			link: 'https://fincommerce.com/document/payments/?utm_source=help_panel&utm_medium=product',
		},
		paymentGatewaySuggestions.fincommerce_payments && {
			title: __( 'WooPayments FAQs', 'fincommerce' ),
			link: 'https://fincommerce.com/documentation/fincommerce-payments/fincommerce-payments-faqs/?utm_source=help_panel&utm_medium=product',
		},
		paymentGatewaySuggestions.stripe && {
			title: __( 'Stripe Setup and Configuration', 'fincommerce' ),
			link: 'https://fincommerce.com/document/stripe/?utm_source=help_panel&utm_medium=product',
		},
		paymentGatewaySuggestions[ 'ppcp-gateway' ] && {
			title: __(
				'PayPal Checkout Setup and Configuration',
				'fincommerce'
			),
			link: 'https://fincommerce.com/document/2-0/fincommerce-paypal-payments/?utm_medium=product#section-3',
		},
		paymentGatewaySuggestions.square_credit_card && {
			title: __( 'Square - Get started', 'fincommerce' ),
			link: 'https://fincommerce.com/document/fincommerce-square/?utm_source=help_panel&utm_medium=product',
		},
		paymentGatewaySuggestions.kco && {
			title: __( 'Klarna - Introduction', 'fincommerce' ),
			link: 'https://fincommerce.com/document/klarna-checkout/?utm_source=help_panel&utm_medium=product',
		},
		paymentGatewaySuggestions.klarna_payments && {
			title: __( 'Klarna - Introduction', 'fincommerce' ),
			link: 'https://fincommerce.com/document/klarna-payments/?utm_source=help_panel&utm_medium=product',
		},
		paymentGatewaySuggestions.payfast && {
			title: __( 'Payfast Setup and Configuration', 'fincommerce' ),
			link: 'https://fincommerce.com/document/payfast-payment-gateway/?utm_source=help_panel&utm_medium=product',
		},
		paymentGatewaySuggestions.eway && {
			title: __( 'Eway Setup and Configuration', 'fincommerce' ),
			link: 'https://fincommerce.com/document/eway/?utm_source=help_panel&utm_medium=product',
		},
		{
			title: __( 'Direct Bank Transfer (BACS)', 'fincommerce' ),
			link: 'https://fincommerce.com/document/bacs/?utm_source=help_panel&utm_medium=product',
		},
		{
			title: __( 'Cash on Delivery', 'fincommerce' ),
			link: 'https://fincommerce.com/document/cash-on-delivery/?utm_source=help_panel&utm_medium=product',
		},
	].filter( Boolean );
}

function getProductsItems() {
	return [
		{
			title: __( 'Adding and Managing Products', 'fincommerce' ),
			link: 'https://fincommerce.com/document/managing-products/?utm_source=help_panel&utm_medium=product',
		},
		{
			title: __(
				'Import products using the CSV Importer and Exporter',
				'fincommerce'
			),
			link: 'https://fincommerce.com/document/product-csv-importer-exporter/?utm_source=help_panel&utm_medium=product',
		},
		{
			title: __( 'Migrate products using Cart2Cart', 'fincommerce' ),
			link: 'https://fincommerce.com/products/cart2cart/?utm_source=help_panel&utm_medium=product',
		},
		{
			title: __( 'Learn more about setting up products', 'fincommerce' ),
			link: 'https://fincommerce.com/documentation/plugins/fincommerce/getting-started/setup-products/?utm_source=help_panel&utm_medium=product',
		},
	];
}

function getShippingItems( { activePlugins, countryCode } ) {
	const showWCS =
		countryCode === 'US' &&
		! activePlugins.includes( 'fincommerce-services' ) &&
		! activePlugins.includes( 'fincommerce-shipping' ) &&
		! activePlugins.includes( 'fincommerce-tax' );

	return [
		{
			title: __( 'Setting up Shipping Zones', 'fincommerce' ),
			link: 'https://fincommerce.com/document/setting-up-shipping-zones/?utm_source=help_panel&utm_medium=product',
		},
		{
			title: __( 'Core Shipping Options', 'fincommerce' ),
			link: 'https://fincommerce.com/documentation/plugins/fincommerce/getting-started/shipping/core-shipping-options/?utm_source=help_panel&utm_medium=product',
		},
		{
			title: __( 'Product Shipping Classes', 'fincommerce' ),
			link: 'https://fincommerce.com/document/product-shipping-classes/?utm_source=help_panel&utm_medium=product',
		},
		showWCS && {
			title: __(
				'FinCommerce Shipping setup and configuration',
				'fincommerce'
			),
			link: 'https://fincommerce.com/document/fincommerce-shipping-and-tax/?utm_source=help_panel&utm_medium=product#section-3',
		},
		{
			title: __(
				'Learn more about configuring your shipping settings',
				'fincommerce'
			),
			link: 'https://fincommerce.com/document/plugins/fincommerce/getting-started/shipping/?utm_source=help_panel&utm_medium=product',
		},
	].filter( Boolean );
}

function getTaxItems( props ) {
	const { countryCode, taskLists } = props;
	const tasks = taskLists.reduce(
		( acc, taskList ) => [ ...acc, ...taskList.tasks ],
		[]
	);

	const task = tasks.find( ( t ) => t.id === 'tax' );

	if ( ! task ) {
		return;
	}

	const { additionalData } = task;
	const {
		fincommerceTaxCountries = [],
		taxJarActivated,
		fincommerceTaxActivated,
		fincommerceShippingActivated,
	} = additionalData;

	const showWCS =
		! taxJarActivated && // WCS integration doesn't work with the official TaxJar plugin.
		fincommerceTaxCountries.includes( countryCode ) &&
		! fincommerceTaxActivated &&
		! fincommerceShippingActivated;

	return [
		{
			title: __( 'Setting up Taxes in FinCommerce', 'fincommerce' ),
			link: 'https://fincommerce.com/document/setting-up-taxes-in-fincommerce/?utm_source=help_panel&utm_medium=product',
		},
		showWCS && {
			title: __(
				'Automated Tax calculation using FinCommerce Tax',
				'fincommerce'
			),
			link: 'https://fincommerce.com/document/fincommerce-services/?utm_source=help_panel&utm_medium=product#section-10',
		},
	].filter( Boolean );
}

function getItems( props ) {
	const { taskName } = props;

	switch ( taskName ) {
		case 'products':
			return getProductsItems();
		case 'appearance':
			return getAppearanceItems();
		case 'shipping':
			return getShippingItems( props );
		case 'tax':
			return getTaxItems( props );
		case 'payments':
			return getPaymentGatewaySuggestions( props );
		case 'marketing':
			return getMarketingItems( props );
		default:
			return getHomeItems();
	}
}

function handleOnItemClick( props, event ) {
	const { taskName } = props;

	// event isn't initially set when triggering link with the keyboard.
	if ( ! event ) {
		return;
	}

	props.recordEvent( 'help_panel_click', {
		task_name: taskName || 'homescreen',
		link: event.currentTarget.href,
	} );
}

function getListItems( props ) {
	const itemsByType = getItems( props );
	const genericDocsLink = {
		title: __( 'FinCommerce Docs', 'fincommerce' ),
		link: 'https://fincommerce.com/documentation/?utm_source=help_panel&utm_medium=product',
	};
	itemsByType.push( genericDocsLink );

	/**
	 * Filter an array of help items for the setup task.
	 *
	 * @filter fincommerce_admin_setup_task_help_items
	 * @param {Array.<Object>}                                                    items Array items object based on task.
	 * @param {('products'|'appearance'|'shipping'|'tax'|'payments'|'marketing')} task  url query parameters.
	 * @param {Object}                                                            props React component props.
	 */
	const filteredItems = applyFilters(
		SETUP_TASK_HELP_ITEMS_FILTER,
		itemsByType,
		props.taskName,
		props
	);

	// Filter out items that aren't objects without `title` and `link` properties.
	let validatedItems = Array.isArray( filteredItems )
		? filteredItems.filter(
				( item ) => item instanceof Object && item.title && item.link
		  )
		: [];

	// Default empty array to the generic docs link.
	if ( ! validatedItems.length ) {
		validatedItems = [ genericDocsLink ];
	}

	const onClick = partial( handleOnItemClick, props );

	return validatedItems.map( ( item ) => ( {
		title: (
			<Text
				as="div"
				variant="button"
				weight="600"
				size="14"
				lineHeight="20px"
			>
				{ item.title }
			</Text>
		),
		before: <Icon icon={ page } />,
		after: <Icon icon={ chevronRight } />,
		linkType: item.linkType ?? 'external',
		target: item.target ?? '_blank',
		href: item.link,
		onClick,
	} ) );
}

export const HelpPanel = ( {
	taskName,
	recordEvent = fallbackRecordEvent,
	...props
} ) => {
	useEffect( () => {
		recordEvent( 'help_panel_open', {
			task_name: taskName || 'homescreen',
		} );
	}, [ taskName, recordEvent ] );

	const listItems = getListItems( { taskName, recordEvent, ...props } );

	return (
		<Fragment>
			<ActivityHeader title={ __( 'Documentation', 'fincommerce' ) } />
			<Section>
				<List
					items={ listItems }
					className="fincommerce-quick-links__list"
				/>
			</Section>
		</Fragment>
	);
};

export default compose(
	withSelect( ( select ) => {
		const { getSettings } = select( settingsStore );
		const { getActivePlugins } = select( pluginsStore );
		const { general: generalSettings = {} } = getSettings( 'general' );
		const activePlugins = getActivePlugins();
		const paymentGatewaySuggestions = select( onboardingStore )
			.getPaymentGatewaySuggestions()
			.reduce( ( suggestions, suggestion ) => {
				const { id } = suggestion;
				suggestions[ id ] = true;
				return suggestions;
			}, {} );
		const taskLists = select( onboardingStore ).getTaskLists();

		const countryCode = getCountryCode(
			generalSettings.fincommerce_default_country
		);

		return {
			activePlugins,
			countryCode,
			paymentGatewaySuggestions,
			taskLists,
		};
	} )
)( HelpPanel );
