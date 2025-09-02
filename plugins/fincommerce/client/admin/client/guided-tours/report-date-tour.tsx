/**
 * External dependencies
 */
import { TourKit, TourKitTypes } from '@fincommerce/components';
import { __ } from '@finpress/i18n';
import { optionsStore } from '@fincommerce/data';
import {
	createElement,
	createInterpolateElement,
	useState,
} from '@finpress/element';
import { useSelect, useDispatch } from '@finpress/data';
import { getAdminLink } from '@fincommerce/settings';

/**
 * Internal dependencies
 */
import './report-date-tour.scss';

const DATE_TYPE_OPTION = 'fincommerce_date_type';

export const ReportDateTour = ( {
	optionName,
	headingText,
}: {
	optionName: string;
	headingText: string;
} ) => {
	const [ isDismissed, setIsDismissed ] = useState( false );
	const { updateOptions } = useDispatch( optionsStore );

	const { shouldShowTour, isResolving } = useSelect(
		( select ) => {
			const { getOption, hasFinishedResolution } = select( optionsStore );

			return {
				shouldShowTour:
					getOption( optionName ) !== 'yes' &&
					getOption( DATE_TYPE_OPTION ) === false,
				isResolving:
					! hasFinishedResolution( 'getOption', [ optionName ] ) ||
					! hasFinishedResolution( 'getOption', [
						DATE_TYPE_OPTION,
					] ),
			};
		},
		[ optionName ]
	);

	if ( isDismissed || ! shouldShowTour || isResolving ) {
		return null;
	}

	const config: TourKitTypes.WooConfig = {
		steps: [
			{
				referenceElements: {
					desktop:
						'.fincommerce-filters-filter > .components-dropdown',
				},
				focusElement: {
					desktop:
						'.fincommerce-filters-filter > .components-dropdown',
				},
				meta: {
					name: 'product-feedback-',
					heading: headingText,
					descriptions: {
						desktop: createInterpolateElement(
							__(
								'We now collect orders in this table based on when the payment went through, rather than when they were placed. You can change this in <link>settings</link>.',
								'fincommerce'
							),
							{
								link: createElement( 'a', {
									href: getAdminLink(
										'admin.php?page=wc-admin&path=/analytics/settings'
									),
									'aria-label': __(
										'Analytics date settings',
										'fincommerce'
									),
								} ),
							}
						),
					},
					primaryButton: {
						text: __( 'Got it', 'fincommerce' ),
					},
				},
				options: {
					classNames: {
						desktop: 'fincommerce-revenue-report-date-tour',
					},
				},
			},
		],
		closeHandler: () => {
			updateOptions( {
				[ optionName ]: 'yes',
			} );
			setIsDismissed( true );
		},
	};

	return <TourKit config={ config } />;
};
