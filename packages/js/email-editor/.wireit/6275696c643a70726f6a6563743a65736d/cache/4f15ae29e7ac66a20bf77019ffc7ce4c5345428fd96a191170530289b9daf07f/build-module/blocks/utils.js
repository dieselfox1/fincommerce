/**
 * External dependencies
 */
import { getBlockTypes } from '@wordpress/blocks';
/**
 * Returns an array of block names that support the 'email' feature.
 */
export function getAllowedBlockNames() {
    try {
        return getBlockTypes()
            .filter((block) => {
            // @ts-expect-error: 'email' is a custom property
            return block.supports?.email === true;
        })
            .map((block) => block.name);
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to get allowed block names:', error);
        return [];
    }
}
