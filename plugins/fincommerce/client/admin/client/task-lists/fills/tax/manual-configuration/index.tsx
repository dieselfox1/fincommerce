/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { useState } from '@finpress/element';
import { Stepper } from '@fincommerce/components';

/**
 * Internal dependencies
 */
import { Configure } from './configure';
import { StoreLocation } from '../components/store-location';

export type ManualConfigurationProps = {
	isPending: boolean;
	onDisable: () => void;
	onAutomate: () => void;
	onManual: () => void;
};

export const ManualConfiguration = ( {
	isPending,
	onDisable,
	onAutomate,
	onManual,
}: ManualConfigurationProps ) => {
	const [ stepIndex, setStepIndex ] = useState( 0 );

	const nextStep = () => {
		setStepIndex( stepIndex + 1 );
	};

	const stepProps = {
		isPending,
		onAutomate,
		onDisable,
		nextStep,
		onManual,
	};

	const steps = [
		{
			key: 'store_location',
			label: __( 'Set store location', 'fincommerce' ),
			description: __(
				'The address from which your business operates',
				'fincommerce'
			),
			content: <StoreLocation { ...stepProps } />,
		},
		{
			key: 'manual_configuration',
			label: __( 'Configure tax rates', 'fincommerce' ),
			description: __(
				'Head over to the tax rate settings screen to configure your tax rates',
				'fincommerce'
			),
			content: <Configure { ...stepProps } />,
		},
	];

	const step = steps[ stepIndex ];

	return (
		<Stepper isVertical={ true } currentStep={ step.key } steps={ steps } />
	);
};
