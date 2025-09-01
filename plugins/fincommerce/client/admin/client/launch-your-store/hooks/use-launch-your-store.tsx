/**
 * External dependencies
 */
import { useSelect } from '@wordpress/data';
import { optionsStore } from '@fincommerce/data';

type Props = {
	/** Set to false to disable this query, defaults to true to query the data */
	enabled?: boolean;
};

export const useLaunchYourStore = (
	{ enabled }: Props = {
		enabled: true,
	}
) => {
	const {
		isLoading,
		launchYourStoreEnabled,
		comingSoon,
		storePagesOnly,
		privateLink,
		shareKey,
	} = useSelect(
		( select ) => {
			if ( ! enabled ) {
				return {
					isLoading: false,
					comingSoon: null,
					storePagesOnly: null,
					privateLink: null,
					shareKey: null,
					launchYourStoreEnabled: null,
				};
			}

			const { hasFinishedResolution, getOption } = select( optionsStore );

			const allOptionResolutionsFinished =
				! hasFinishedResolution( 'getOption', [
					'fincommerce_coming_soon',
				] ) &&
				! hasFinishedResolution( 'getOption', [
					'fincommerce_store_pages_only',
				] ) &&
				! hasFinishedResolution( 'getOption', [
					'fincommerce_private_link',
				] ) &&
				! hasFinishedResolution( 'getOption', [
					'fincommerce_share_key',
				] );

			return {
				isLoading: allOptionResolutionsFinished,
				comingSoon: getOption( 'fincommerce_coming_soon' ),
				storePagesOnly: getOption( 'fincommerce_store_pages_only' ),
				privateLink: getOption( 'fincommerce_private_link' ),
				shareKey: getOption( 'fincommerce_share_key' ),
				launchYourStoreEnabled:
					window.wcAdminFeatures[ 'launch-your-store' ],
			};
		},
		[ enabled ]
	);

	return {
		isLoading,
		comingSoon,
		storePagesOnly,
		privateLink,
		shareKey,
		launchYourStoreEnabled,
	};
};
