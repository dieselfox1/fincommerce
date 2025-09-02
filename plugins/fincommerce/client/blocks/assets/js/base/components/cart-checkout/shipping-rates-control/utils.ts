/**
 * External dependencies
 */
import { _n, sprintf } from '@finpress/i18n';
import { speak } from '@finpress/a11y';

export const speakFoundShippingOptions = (
	packageCount: number,
	rateCount: number
) => {
	if ( packageCount === 1 ) {
		speak(
			sprintf(
				/* translators: %d number of shipping options found. */
				_n(
					'%d shipping option was found.',
					'%d shipping options were found.',
					rateCount,
					'fincommerce'
				),
				rateCount
			)
		);
	} else {
		speak(
			sprintf(
				/* translators: %d number of shipping packages packages. */
				_n(
					'Shipping option searched for %d package.',
					'Shipping options searched for %d packages.',
					packageCount,
					'fincommerce'
				),
				packageCount
			) +
				' ' +
				sprintf(
					/* translators: %d number of shipping options available. */
					_n(
						'%d shipping option was found',
						'%d shipping options were found',
						rateCount,
						'fincommerce'
					),
					rateCount
				)
		);
	}
};
