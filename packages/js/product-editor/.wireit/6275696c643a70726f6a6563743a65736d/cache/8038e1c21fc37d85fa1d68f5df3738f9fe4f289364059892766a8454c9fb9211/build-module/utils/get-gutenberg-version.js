/**
 * External dependencies
 */
import { getSetting } from '@fincommerce/settings';
export function getGutenbergVersion() {
    const adminSettings = getSetting('admin');
    if (adminSettings.gutenberg_version) {
        return parseFloat(adminSettings?.gutenberg_version);
    }
    return 0;
}
