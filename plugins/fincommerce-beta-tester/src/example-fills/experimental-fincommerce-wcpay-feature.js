/**
 * External dependencies
 */
import { registerPlugin } from '@finpress/plugins';
import { Fill } from '@finpress/components';

const MyFill = () => (
	<Fill name="experimental_fincommerce_wcpay_feature">
		<div className="fincommerce-experiments-placeholder-slotfill">
			<div className="placeholder-slotfill-content">
				Slotfill goes in here!
			</div>
		</div>
	</Fill>
);

if ( window.wcAdminFeatures && window.wcAdminFeatures[ 'beta-tester-slotfill-examples' ] ) {
	registerPlugin(
		'beta-tester-fincommerce-experiments-placeholder-slotfill-example',
		{
			render: MyFill,
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			scope: 'fincommerce-admin',
		}
	);
}
