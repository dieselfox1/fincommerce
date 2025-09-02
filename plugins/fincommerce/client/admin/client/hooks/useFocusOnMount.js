/**
 * This hook was directly copied from https://github.com/finpress/gutenberg/blob/master/packages/compose/src/hooks/use-focus-on-mount/index.js
 * to avoid its absence in older versions of finpress.
 *
 * This can be removed once the minimum supported version of finpress includes this hook.
 */

/**
 * External dependencies
 */
import { useRef, useEffect, useCallback } from '@finpress/element';
import { focus } from '@finpress/dom';

/**
 * Hook used to focus the first tabbable element on mount.
 *
 * @param {boolean|string} focusOnMount Focus on mount mode.
 * @return {Function} Ref callback.
 *
 * @example
 * ```js
 * import { useFocusOnMount } from '@finpress/compose';
 *
 * const WithFocusOnMount = () => {
 *     const ref = useFocusOnMount()
 *     return (
 *         <div ref={ ref }>
 *             <Button />
 *             <Button />
 *         </div>
 *     );
 * }
 * ```
 */
export default function useFocusOnMount( focusOnMount = 'firstElement' ) {
	const focusOnMountRef = useRef( focusOnMount );
	useEffect( () => {
		focusOnMountRef.current = focusOnMount;
	}, [ focusOnMount ] );

	return useCallback( ( node ) => {
		if ( ! node || focusOnMountRef.current === false ) {
			return;
		}

		if ( node.contains( node.ownerDocument.activeElement ) ) {
			return;
		}

		let target = node;

		if ( focusOnMountRef.current === 'firstElement' ) {
			const firstTabbable = focus.tabbable.find( node )[ 0 ];

			if ( firstTabbable ) {
				target = firstTabbable;
			}
		}

		target.focus();
	}, [] );
}
