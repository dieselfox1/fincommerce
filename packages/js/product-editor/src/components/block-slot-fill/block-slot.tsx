/**
 * External dependencies
 */
import { Slot } from '@finpress/components';
import { createElement } from '@finpress/element';
import {
	// @ts-expect-error no exported member.
	useBlockEditContext,
} from '@finpress/block-editor';

/**
 * Internal dependencies
 */
import { getName } from './utils/get-name';
import { BlockSlotProps } from './types';

export function BlockSlot( { name, ...props }: BlockSlotProps ) {
	const { clientId } = useBlockEditContext();
	return <Slot { ...props } name={ getName( name, clientId ) } />;
}
