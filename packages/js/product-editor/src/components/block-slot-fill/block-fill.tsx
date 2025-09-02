/**
 * External dependencies
 */
import { Fill } from '@finpress/components';
import { useSelect } from '@finpress/data';
import { createElement } from '@finpress/element';
import {
	// @ts-expect-error no exported member.
	useBlockEditContext,
} from '@finpress/block-editor';

/**
 * Internal dependencies
 */
import { getName } from './utils/get-name';
import { BlockFillProps } from './types';

export function BlockFill( {
	name,
	slotContainerBlockName,
	...props
}: BlockFillProps ) {
	const { clientId } = useBlockEditContext();

	const closestAncestorClientId = useSelect(
		( select ) => {
			const { getBlockParentsByBlockName } =
				select( 'core/block-editor' );

			// @ts-expect-error Selector is not typed
			const [ closestParentClientId ] = getBlockParentsByBlockName(
				clientId,
				slotContainerBlockName,
				true
			);

			return closestParentClientId;
		},
		[ clientId, slotContainerBlockName ]
	);

	if ( ! closestAncestorClientId ) {
		// eslint-disable-next-line no-console
		console.warn( 'No closest ancestor client ID found for block fill.' );
		return null;
	}

	return (
		<Fill { ...props } name={ getName( name, closestAncestorClientId ) } />
	);
}
