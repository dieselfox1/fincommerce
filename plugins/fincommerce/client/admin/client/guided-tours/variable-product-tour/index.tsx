/**
 * External dependencies
 */
import { useEffect, useState } from '@finpress/element';
import { __ } from '@finpress/i18n';
import { TourKit, TourKitTypes } from '@fincommerce/components';
import { useUserPreferences } from '@fincommerce/data';
import { recordEvent } from '@fincommerce/tracks';

function getStepName(
	steps: TourKitTypes.WooStep[],
	currentStepIndex: number
) {
	return steps[ currentStepIndex ]?.meta?.name;
}

export const VariableProductTour = () => {
	const [ isTourOpen, setIsTourOpen ] = useState( false );

	const { updateUserPreferences, variable_product_tour_shown: hasShownTour } =
		useUserPreferences();

	const config: TourKitTypes.WooConfig = {
		steps: [
			{
				referenceElements: {
					desktop: '.attribute_tab',
				},
				focusElement: {
					desktop: '.attribute_tab',
				},
				meta: {
					name: 'attributes',
					heading: __( 'Start by adding attributes', 'fincommerce' ),
					descriptions: {
						desktop: __(
							'Add attributes like size and color for customers to choose from on the product page. We will use them to generate product variations.',
							'fincommerce'
						),
					},
					primaryButton: {
						text: __( 'Got it', 'fincommerce' ),
					},
				},
			},
		],
		options: {
			// WooTourKit does not handle merging of default options properly,
			// so we need to duplicate the effects options here.
			effects: {
				spotlight: {
					interactivity: {
						enabled: true,
						rootElementSelector: '#wpwrap',
					},
				},
				arrowIndicator: true,
				liveResize: {
					mutation: true,
					resize: true,
					rootElementSelector: '#wpwrap',
				},
			},
		},
		closeHandler: ( steps, currentStepIndex ) => {
			updateUserPreferences( { variable_product_tour_shown: 'yes' } );
			setIsTourOpen( false );

			if ( currentStepIndex === steps.length - 1 ) {
				recordEvent( 'variable_product_tour_completed', {
					step: getStepName(
						steps as TourKitTypes.WooStep[],
						currentStepIndex
					),
				} );
			} else {
				recordEvent( 'variable_product_tour_dismissed', {
					step: getStepName(
						steps as TourKitTypes.WooStep[],
						currentStepIndex
					),
				} );
			}
		},
	};

	// show the tour when the product type is changed to variable
	useEffect( () => {
		const productTypeSelect = document.querySelector(
			'#product-type'
		) as HTMLSelectElement;

		if ( hasShownTour === 'yes' || ! productTypeSelect ) {
			return;
		}

		function handleProductTypeChange() {
			if ( productTypeSelect.value === 'variable' ) {
				setIsTourOpen( true );
				recordEvent( 'variable_product_tour_started', {
					step: getStepName( config.steps, 0 ),
				} );
			}
		}

		productTypeSelect.addEventListener( 'change', handleProductTypeChange );

		return () => {
			productTypeSelect.removeEventListener(
				'change',
				handleProductTypeChange
			);
		};
	} );

	if ( ! isTourOpen ) {
		return null;
	}

	return <TourKit config={ config } />;
};
