/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { recordEvent } from '@fincommerce/tracks';
import { Button } from '@finpress/components';
import { useMemo } from '@finpress/element';
import type { TaskListType } from '@fincommerce/data';

/**
 * Internal dependencies
 */
import { ADMIN_URL } from '~/utils/admin-settings';

export type WhatsNextProps = {
	activePlugins: string[];
	allTasklists: TaskListType[];
};

type Action = {
	title: string;
	description: string;
	link: string;
	linkText: string;
	trackEvent: string;
};

export const getActionsList = ( {
	activePlugins,
	allTasklists,
}: WhatsNextProps ) => {
	const actions: Action[] = [];
	const pick = ( action: Action, condition: boolean ) => {
		if ( actions.length < 3 && condition ) {
			actions.push( action );
		}
	};

	const setupTasksCompletion = allTasklists
		.find( ( { id } ) => id === 'setup' )
		?.tasks?.reduce(
			( acc: Record< string, boolean >, { id, isComplete } ) => {
				acc[ id ] = isComplete || false;
				return acc;
			},
			{}
		);

	const extendedTasksCompletion = allTasklists
		.find( ( { id } ) => id === 'extended' )
		?.tasks?.reduce(
			( acc: Record< string, boolean >, { id, isComplete } ) => {
				acc[ id ] = isComplete || false;
				return acc;
			},
			{}
		);

	const isMarketingTaskCompleted =
		extendedTasksCompletion?.marketing || false;
	const isPaymentsTaskCompleted = setupTasksCompletion?.payments || false;
	const isMobileTaskCompleted =
		extendedTasksCompletion?.[ 'get-mobile-app' ] || false;
	const isMailChimpActivated = activePlugins.includes(
		'mailchimp-for-fincommerce'
	);

	const marketing = {
		title: __( 'Promote your products', 'fincommerce' ),
		description: __(
			'Grow your customer base by promoting your products to millions of engaged shoppers.',
			'fincommerce'
		),
		link: `${ ADMIN_URL }admin.php?page=wc-admin&task=marketing`,
		linkText: __( 'Promote products', 'fincommerce' ),
		trackEvent: 'launch_you_store_congrats_marketing_click',
	};

	const payments = {
		title: __( 'Provide more ways to pay', 'fincommerce' ),
		description: __(
			'Give your shoppers more ways to pay by adding additional payment methods to your store.',
			'fincommerce'
		),
		link: `${ ADMIN_URL }admin.php?page=wc-settings&tab=checkout`,
		linkText: __( 'Add payment methods', 'fincommerce' ),
		trackEvent: 'launch_you_store_congrats_payments_click',
	};

	const mailchimp = {
		title: __( 'Build customer relationships', 'fincommerce' ),
		description: __(
			'Keep your shoppers up to date with what’s new in your store and set up clever post-purchase automations.',
			'fincommerce'
		),
		link: isMailChimpActivated
			? `${ ADMIN_URL }admin.php?page=mailchimp-fincommerce`
			: 'https://woo.com/products/mailchimp-for-fincommerce/?utm_source=launch_your_store&utm_medium=product',
		linkText: isMailChimpActivated
			? __( 'Manage Mailchimp', 'fincommerce' )
			: __( 'Install Mailchimp', 'fincommerce' ),
		trackEvent: 'launch_you_store_congrats_mailchimp_click',
	};

	const extensions = {
		title: __( 'Power up your store', 'fincommerce' ),
		description: __(
			'Add extra features and functionality to your store with Woo extensions.',
			'fincommerce'
		),
		link: `${ ADMIN_URL }admin.php?page=wc-admin&path=%2Fextensions`,
		linkText: __( 'Add extensions', 'fincommerce' ),
		trackEvent: 'launch_you_store_congrats_extensions_click',
	};

	const mobileApp = {
		title: __( 'Manage your store on the go', 'fincommerce' ),
		description: __(
			'Manage your store anywhere with the free FinCommerce Mobile App.',
			'fincommerce'
		),
		link: `${ ADMIN_URL }admin.php?page=wc-admin&mobileAppModal=true`,
		linkText: __( 'Get the app', 'fincommerce' ),
		trackEvent: 'launch_you_store_congrats_mobile_app_click',
	};

	const externalDocumentation = {
		title: __( 'Help is on hand', 'fincommerce' ),
		description: __(
			'Detailed guides and our support team are always available if you’re feeling stuck or need some guidance.',
			'fincommerce'
		),
		link: `https://woo.com/documentation/fincommerce/?utm_source=launch_your_store&utm_medium=product`,
		linkText: __( 'Explore support resources', 'fincommerce' ),
		trackEvent: 'launch_you_store_congrats_external_documentation_click',
	};

	// Pick first three
	pick( marketing, ! isMarketingTaskCompleted );
	pick( payments, ! isPaymentsTaskCompleted );
	pick( extensions, true ); // No condition yet

	// Pick second three
	pick( mobileApp, ! isMobileTaskCompleted );
	pick( mailchimp, ! isMailChimpActivated );
	pick( externalDocumentation, true ); // No condition yet

	// Pick last three
	pick( payments, true );
	pick( extensions, true );
	pick( externalDocumentation, true );

	return actions;
};

export const WhatsNext = ( {
	activePlugins,
	allTasklists,
}: WhatsNextProps ) => {
	const actions = useMemo( () => {
		return getActionsList( { activePlugins, allTasklists } );
	}, [ activePlugins, allTasklists ] );

	return (
		<div className="fincommerce-launch-store__congrats-main-actions">
			{ actions.map( ( item, index ) => (
				<div
					className="fincommerce-launch-store__congrats-action"
					key={ index }
				>
					<div className="fincommerce-launch-store__congrats-action__content">
						<h3>{ item.title }</h3>
						<p>{ item.description }</p>
						<Button
							variant="link"
							href={ item.link }
							target={
								item.link.indexOf( ADMIN_URL ) === -1
									? '_blank'
									: '_self'
							}
							onClick={ () => {
								recordEvent( item.trackEvent );
							} }
						>
							{ item.linkText }
						</Button>
					</div>
				</div>
			) ) }
		</div>
	);
};
