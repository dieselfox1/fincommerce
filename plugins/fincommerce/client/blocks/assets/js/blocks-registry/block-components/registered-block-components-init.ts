/**
 * External dependencies
 */
import type { RegisteredBlockComponent } from '@fincommerce/types';

const registeredBlockComponents: Record<
	string,
	Record< string, RegisteredBlockComponent >
> = {};

export { registeredBlockComponents };
