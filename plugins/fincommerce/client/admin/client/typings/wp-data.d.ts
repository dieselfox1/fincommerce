/**
 * External dependencies
 */
import type * as controls from '@finpress/data-controls';

declare module '@finpress/data' {
	// we need to declare this here as an interim solution until we bump the @finpress/data version to wp-6.6 across the board in WC.
	// this is being added to get around the issue that surfaced after upgrading to typescript 5.7.2 where the types for @finpress/data
	// is being checked due to the imports in plugins/fincommerce/client/admin/client/homescreen/mobile-app-modal/components/useJetpackPluginState.tsx
	// and plugins/fincommerce/client/admin/client/homescreen/stats-overview/install-jetpack-cta.js
	const controls: {
		select: typeof controls.select;
		resolveSelect: typeof controls.resolveSelect;
		dispatch: typeof controls.dispatch;
	};
}
