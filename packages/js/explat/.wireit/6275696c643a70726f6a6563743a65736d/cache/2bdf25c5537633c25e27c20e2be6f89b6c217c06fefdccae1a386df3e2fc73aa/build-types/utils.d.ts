/**
 * Boolean determining if environment is development.
 */
export declare const isDevelopmentMode: boolean;
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
export {};
//# sourceMappingURL=utils.d.ts.map