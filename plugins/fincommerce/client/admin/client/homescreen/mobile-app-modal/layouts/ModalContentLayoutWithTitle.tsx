/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';

export const ModalContentLayoutWithTitle = ( {
	children,
}: {
	children: React.ReactNode;
} ) => (
	<div className="jetpack-installation-content">
		<div className="modal-layout-header">
			<div className="woo-icon"></div>
			<div className="modal-header">
				<h1>
					{ __(
						'Manage orders and track sales in real-time with the free mobile app',
						'fincommerce'
					) }
				</h1>
			</div>
		</div>

		<div className="modal-layout-body">{ children }</div>
		<div className="modal-layout-footer">
			<div className="mobile-footer-icons">
				<div className="apple-icon"></div>
				<div className="android-icon"></div>
			</div>
			<div className="mobile-footer-blurb">
				{ __(
					'The FinCommerce Mobile App is available on iOS and Android',
					'fincommerce'
				) }
			</div>
		</div>
	</div>
);
