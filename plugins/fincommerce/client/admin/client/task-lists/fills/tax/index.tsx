/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Card, CardBody, Spinner } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { getAdminLink } from '@fincommerce/settings';
import { optionsStore, settingsStore, TaskType } from '@fincommerce/data';
import { queueRecordEvent, recordEvent } from '@fincommerce/tracks';
import { registerPlugin } from '@wordpress/plugins';
import {
	useCallback,
	useEffect,
	useState,
	createElement,
	useMemo,
} from '@wordpress/element';
import { WooOnboardingTask } from '@fincommerce/onboarding';

/**
 * Internal dependencies
 */
import { redirectToTaxSettings } from './utils';
import { Card as fincommerceTaxCard } from './fincommerce-tax/card';
import { Card as StripeTaxCard } from './stripe-tax/card';
import { createNoticesFromResponse } from '../../../lib/notices';
import { getCountryCode } from '~/dashboard/utils';
import { ManualConfiguration } from './manual-configuration';
import { Partners } from './components/partners';
import { fincommerceTax } from './fincommerce-tax';

const TaskCard = ( { children }: { children: React.ReactNode } ) => {
	return (
		<Card className="fincommerce-task-card">
			<CardBody>{ children }</CardBody>
		</Card>
	);
};

export type TaxProps = {
	onComplete: () => void;
	query: Record< string, string >;
	task: TaskType;
};

export const Tax = ( { onComplete, query, task }: TaxProps ) => {
	const [ isPending, setIsPending ] = useState( false );
	const { updateOptions } = useDispatch( optionsStore );
	const { createNotice } = useDispatch( 'core/notices' );
	const { updateAndPersistSettingsForGroup } = useDispatch( settingsStore );
	const { generalSettings, isResolving, taxSettings } = useSelect(
		( select ) => {
			const { getSettings, hasFinishedResolution } =
				select( settingsStore );
			return {
				generalSettings: getSettings( 'general' ).general,
				isResolving: ! hasFinishedResolution( 'getSettings', [
					'general',
				] ),
				taxSettings: getSettings( 'tax' ).tax || {},
			};
		},
		[]
	);

	const onManual = useCallback( async () => {
		setIsPending( true );
		if ( generalSettings?.fincommerce_calc_taxes !== 'yes' ) {
			updateAndPersistSettingsForGroup( 'tax', {
				tax: {
					...taxSettings,
					wc_connect_taxes_enabled: 'no',
				},
			} );
			updateAndPersistSettingsForGroup( 'general', {
				general: {
					...generalSettings,
					fincommerce_calc_taxes: 'yes',
				},
			} )
				.then( () => redirectToTaxSettings() )
				.catch( ( error: unknown ) => {
					setIsPending( false );
					createNoticesFromResponse( error );
				} );
		} else {
			redirectToTaxSettings();
		}
	}, [ generalSettings, taxSettings, updateAndPersistSettingsForGroup ] );

	const onAutomate = useCallback( async () => {
		setIsPending( true );
		try {
			await Promise.all( [
				updateAndPersistSettingsForGroup( 'tax', {
					tax: {
						...taxSettings,
						wc_connect_taxes_enabled: 'yes',
					},
				} ),
				updateAndPersistSettingsForGroup( 'general', {
					general: {
						...generalSettings,
						fincommerce_calc_taxes: 'yes',
					},
				} ),
			] );
		} catch ( error: unknown ) {
			setIsPending( false );
			createNotice(
				'error',
				__(
					'There was a problem setting up automated taxes. Please try again.',
					'fincommerce'
				)
			);
			return;
		}

		createNotice(
			'success',
			__(
				'You’re awesome! One less item on your to-do list ✅',
				'fincommerce'
			)
		);
		onComplete();
	}, [
		createNotice,
		generalSettings,
		onComplete,
		taxSettings,
		updateAndPersistSettingsForGroup,
	] );

	const onDisable = useCallback( () => {
		setIsPending( true );
		queueRecordEvent( 'tasklist_tax_connect_store', {
			connect: false,
			no_tax: true,
		} );

		updateOptions( {
			fincommerce_no_sales_tax: true,
			fincommerce_calc_taxes: 'no',
		} ).then( () => {
			window.location.href = getAdminLink( 'admin.php?page=wc-admin' );
		} );
	}, [ updateOptions ] );

	const partners = useMemo( () => {
		const countryCode =
			getCountryCode( generalSettings?.fincommerce_default_country ) ||
			'';
		const {
			additionalData: {
				fincommerceTaxCountries = [],
				stripeTaxCountries = [],
				taxJarActivated,
				fincommerceTaxActivated,
				fincommerceShippingActivated,
			} = {},
		} = task;

		const allPartners = [
			{
				id: 'fincommerce-tax',
				card: fincommerceTaxCard,
				component: fincommerceTax,
				isVisible:
					! taxJarActivated && // WCS integration doesn't work with the official TaxJar plugin.
					! fincommerceTaxActivated &&
					! fincommerceShippingActivated &&
					fincommerceTaxCountries.includes( countryCode ),
			},
			{
				id: 'stripe-tax',
				card: StripeTaxCard,

				isVisible: stripeTaxCountries.includes( countryCode ),
			},
		];

		return allPartners.filter( ( partner ) => partner.isVisible );
		// eslint-disable-next-line react-hooks/exhaustive-deps -- the partner list shouldn't be changing in the middle of interaction. for some reason the country is becoming null in a re-render and causing unexpected behaviour
	}, [] );

	const { auto } = query;
	useEffect( () => {
		if ( auto === 'true' ) {
			onAutomate();
		}
	}, [ auto, onAutomate ] );

	useEffect( () => {
		if ( query.partner ) {
			return;
		}
		recordEvent( 'tasklist_tax_view_options', {
			options: partners.map( ( partner ) => partner.id ),
		} );
	}, [ partners, query.partner ] );

	const currentPartner = useMemo( () => {
		if ( ! query.partner ) {
			return null;
		}

		return (
			partners.find( ( partner ) => partner.id === query.partner ) || null
		);
	}, [ partners, query.partner ] );

	const childProps = {
		isPending,
		onAutomate,
		onManual,
		onDisable,
		task,
	};

	if ( isResolving ) {
		return <Spinner />;
	}

	if ( ! partners.length ) {
		return (
			<TaskCard>
				<ManualConfiguration { ...childProps } />
			</TaskCard>
		);
	}

	if ( currentPartner ) {
		return (
			<TaskCard>
				{ currentPartner.component &&
					createElement( currentPartner.component, childProps ) }
			</TaskCard>
		);
	}
	return (
		<Partners { ...childProps }>
			{ partners.map(
				( partner ) =>
					partner.card &&
					createElement( partner.card, {
						key: partner.id,
						...childProps,
					} )
			) }
		</Partners>
	);
};

registerPlugin( 'wc-admin-onboarding-task-tax', {
	scope: 'fincommerce-tasks',
	render: () => (
		<WooOnboardingTask id="tax">
			{ ( { onComplete, query, task } ) => (
				<Tax onComplete={ onComplete } query={ query } task={ task } />
			) }
		</WooOnboardingTask>
	),
} );
