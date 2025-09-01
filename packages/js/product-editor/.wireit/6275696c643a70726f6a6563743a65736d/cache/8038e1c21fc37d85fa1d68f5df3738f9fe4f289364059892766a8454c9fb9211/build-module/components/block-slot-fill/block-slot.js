/**
 * External dependencies
 */
import { Slot } from '@wordpress/components';
import { createElement } from '@wordpress/element';
import { 
// @ts-expect-error no exported member.
useBlockEditContext, } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */
import { getName } from './utils/get-name';
export function BlockSlot({ name, ...props }) {
    const { clientId } = useBlockEditContext();
    return createElement(Slot, { ...props, name: getName(name, clientId) });
}
