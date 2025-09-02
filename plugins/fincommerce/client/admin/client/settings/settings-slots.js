/**
 * External dependencies
 */
import { createRoot } from '@finpress/element';
import { createSlotFill, SlotFillProvider } from '@finpress/components';
import { PluginArea } from '@finpress/plugins';

export const SETTINGS_SLOT_FILL_CONSTANT =
	'__EXPERIMENTAL__WcAdminSettingsSlots';

const { Slot } = createSlotFill( SETTINGS_SLOT_FILL_CONSTANT );

export const possiblyRenderSettingsSlots = () => {
	const slots = [
		{
			id: 'wc_payments_settings_slotfill',
			scope: 'fincommerce-payments-settings',
		},
		{ id: 'wc_tax_settings_slotfill', scope: 'fincommerce-tax-settings' },
		{ id: 'wc_settings_slotfill', scope: 'fincommerce-settings' },
		{
			id: 'wc_settings_site_visibility_slotfill',
			scope: 'fincommerce-site-visibility-settings',
		},
		{
			id: 'wc_settings_blueprint_slotfill',
			scope: 'fincommerce-blueprint-settings',
		},
		{
			id: 'wc_settings_email_preview_slotfill',
			scope: 'fincommerce-email-preview-settings',
		},
		{
			id: 'wc_settings_email_listing_slotfill',
			scope: 'fincommerce-email-listing',
		},
		{
			id: 'wc_settings_features_email_feedback_slotfill',
			scope: 'fincommerce-email-feedback-settings',
		},
		{
			id: 'wc_settings_email_image_url_slotfill',
			scope: 'fincommerce-email-image-url-settings',
		},
		{
			id: 'wc_settings_email_color_palette_slotfill',
			scope: 'fincommerce-email-color-palette-settings',
		},
	];

	slots.forEach( ( slot ) => {
		const slotDomElement = document.getElementById( slot.id );

		if ( slotDomElement ) {
			createRoot( slotDomElement ).render(
				<>
					<SlotFillProvider>
						<Slot />
						<PluginArea scope={ slot.scope } />
					</SlotFillProvider>
				</>
			);
		}
	} );
};
