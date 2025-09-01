/**
 * Internal dependencies
 */
import { Location } from '.';
/**
 * This file is used to map a location to a WC region label
 * so that we can find the correct country option
 * since WPCOM geolocation returns a different
 * region or city name.
 */
declare const MAPPING: Record<string, Record<string, string>>;
/**
 * Returns a WC mapping region name for the given country, region and city.
 */
export declare const getMappingRegion: ({ country_short: countryCode, region, city, }: Location) => string | null;
export default MAPPING;
//# sourceMappingURL=location-mapping.d.ts.map