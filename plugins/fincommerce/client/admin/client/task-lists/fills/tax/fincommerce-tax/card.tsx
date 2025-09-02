/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import interpolateComponents from '@automattic/interpolate-components';
import { recordEvent } from '@fincommerce/tracks';
import { updateQueryString } from '@fincommerce/navigation';

/**
 * Internal dependencies
 */
import { PartnerCard } from '../components/partner-card';
import logo from './logo.png';
import { TermsOfService } from '~/task-lists/components/terms-of-service';

export const Card = () => {
	return (
		<PartnerCard
			name={ __( 'FinCommerce Tax', 'fincommerce' ) }
			logo={ logo }
			description={ __(
				'FinCommerce Tax, recommended for new stores',
				'fincommerce'
			) }
			benefits={ [
				__( 'Real-time sales tax calculation', 'fincommerce' ),
				interpolateComponents( {
					mixedString: __(
						'{{strong}}Single{{/strong}} economic nexus compliance',
						'fincommerce'
					),
					components: {
						strong: <strong />,
					},
				} ),
				// eslint-disable-next-line @finpress/i18n-translator-comments
				__( '100% free', 'fincommerce' ),
			] }
			terms={
				<TermsOfService
					buttonText={ __( 'Continue setup', 'fincommerce' ) }
				/>
			}
			actionText={ __( 'Continue setup', 'fincommerce' ) }
			onClick={ () => {
				recordEvent( 'tasklist_tax_select_option', {
					selected_option: 'fincommerce-tax',
				} );
				updateQueryString( {
					partner: 'fincommerce-tax',
				} );
			} }
		/>
	);
};
