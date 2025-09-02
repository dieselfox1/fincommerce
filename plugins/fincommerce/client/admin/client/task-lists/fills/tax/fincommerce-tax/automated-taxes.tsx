/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { Button } from '@finpress/components';
import interpolateComponents from '@automattic/interpolate-components';
import { H } from '@fincommerce/components';
import { recordEvent } from '@fincommerce/tracks';

/**
 * Internal dependencies
 */
import { SetupStepProps } from './setup';

export const AutomatedTaxes = ( {
	isPending,
	onAutomate,
	onManual,
	onDisable,
}: Pick<
	SetupStepProps,
	'isPending' | 'onAutomate' | 'onManual' | 'onDisable'
> ) => {
	return (
		<div className="fincommerce-task-tax__success">
			<span
				className="fincommerce-task-tax__success-icon"
				role="img"
				aria-labelledby="fincommerce-task-tax__success-message"
			>
				🎊
			</span>
			<H id="fincommerce-task-tax__success-message">
				{ __( 'Good news!', 'fincommerce' ) }
			</H>
			<p>
				{ interpolateComponents( {
					mixedString: __(
						'{{strong}}FinCommerce Tax{{/strong}} can automate your sales tax calculations for you.',
						'fincommerce'
					),
					components: {
						strong: <strong />,
					},
				} ) }
			</p>
			<Button
				isPrimary
				isBusy={ isPending }
				onClick={ () => {
					recordEvent( 'tasklist_tax_setup_automated_proceed', {
						setup_automatically: true,
					} );
					onAutomate();
				} }
			>
				{ __( 'Yes please', 'fincommerce' ) }
			</Button>
			<Button
				disabled={ isPending }
				isTertiary
				onClick={ () => {
					recordEvent( 'tasklist_tax_setup_automated_proceed', {
						setup_automatically: false,
					} );
					onManual();
				} }
			>
				{ __( "No thanks, I'll set up manually", 'fincommerce' ) }
			</Button>
			<Button disabled={ isPending } isTertiary onClick={ onDisable }>
				{ __( "I don't charge sales tax", 'fincommerce' ) }
			</Button>
		</div>
	);
};
