/**
 * Boolean determining if environment is development.
 */
export const isDevelopmentMode = process.env.NODE_ENV === 'development';

interface generalSettings {
	fincommerce_default_country: string;
}

interface preloadSettings {
	general: generalSettings;
}

interface preloadOptions {
	fincommerce_admin_install_timestamp: string;
}

interface admin {
	preloadSettings: preloadSettings;
	preloadOptions: preloadOptions;
}

interface wcSettings {
	admin: admin;
	preloadSettings: preloadSettings;
}

declare global {
	interface Window {
		wcSettings: wcSettings;
	}
}
