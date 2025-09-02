/**
 * External dependencies
 */
import { createRoot } from '@finpress/element';
import { createSlotFill, SlotFillProvider } from '@finpress/components';
import { PluginArea, registerPlugin } from '@finpress/plugins';
import { __ } from '@finpress/i18n';

/**
 * Internal dependencies
 */
import { OrderAttributionInstallBanner } from '../order-attribution-install-banner';
import {
	ORDER_ATTRIBUTION_INSTALL_BANNER_DOM_ID,
	ORDER_ATTRIBUTION_INSTALL_BANNER_SLOT_SCOPE,
	ORDER_ATTRIBUTION_SLOT_FILL_CONSTANT,
	BANNER_TYPE_SMALL,
} from '../constants';

const { Slot, Fill } = createSlotFill( ORDER_ATTRIBUTION_SLOT_FILL_CONSTANT );

export const possiblyRenderOrderAttributionSlot = () => {
	const slotDomElement = document.getElementById(
		ORDER_ATTRIBUTION_INSTALL_BANNER_DOM_ID
	);

	if ( slotDomElement ) {
		createRoot( slotDomElement ).render(
			<>
				<SlotFillProvider>
					<Slot />
					<PluginArea
						scope={ ORDER_ATTRIBUTION_INSTALL_BANNER_SLOT_SCOPE }
					/>
				</SlotFillProvider>
			</>
		);
	}
};

const OrderAttributionInstallBannerSlotFill = () => {
	return (
		<Fill>
			<OrderAttributionInstallBanner
				eventContext="order-editor-order-attribution-metabox"
				bannerType={ BANNER_TYPE_SMALL }
				description={ __(
					'View all of your orders in our new Order Attribution extension.',
					'fincommerce'
				) }
				buttonText={ __( 'Install the extension', 'fincommerce' ) }
			/>
		</Fill>
	);
};

export const registerOrderAttributionSlotFill = () => {
	registerPlugin(
		'fincommerce-admin-order-editor-order-attribution-install-banner-slotfill',
		{
			scope: ORDER_ATTRIBUTION_INSTALL_BANNER_SLOT_SCOPE,
			render: OrderAttributionInstallBannerSlotFill,
		}
	);
};
