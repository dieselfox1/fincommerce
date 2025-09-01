/**
 * External dependencies
 */
import { useEffect } from '@wordpress/element';
import clsx from 'clsx';

/**
 * Internal dependencies
 */
import NoticeBanner, { NoticeBannerProps } from '@fincommerce/block-library/assets/js/base/components/notice-banner';
import { SNACKBAR_TIMEOUT } from '@fincommerce/block-library/assets/js/base/components/snackbar-list/constants';

export interface SnackbarProps extends NoticeBannerProps {
	// A ref to the list that contains the snackbar.
	listRef?: React.MutableRefObject< HTMLDivElement | null >;
}

export const Snackbar = ( {
	onRemove = () => void 0,
	children,
	listRef,
	className,
	...notice
}: SnackbarProps ) => {
	// Only set up the timeout dismiss if we're not explicitly dismissing.
	useEffect( () => {
		const timeoutHandle = setTimeout( () => {
			onRemove();
		}, SNACKBAR_TIMEOUT );

		return () => clearTimeout( timeoutHandle );
	}, [ onRemove ] );

	return (
		<NoticeBanner
			className={ clsx(
				className,
				'wc-block-components-notice-snackbar'
			) }
			{ ...notice }
			onRemove={ () => {
				// Prevent focus loss by moving it to the list element.
				if ( listRef && listRef.current ) {
					listRef.current.focus();
				}
				onRemove();
			} }
		>
			{ children }
		</NoticeBanner>
	);
};

export default Snackbar;
