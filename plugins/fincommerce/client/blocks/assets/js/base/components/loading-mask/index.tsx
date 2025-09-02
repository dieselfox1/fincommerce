/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import clsx from 'clsx';
import { Spinner } from '@fincommerce/blocks-components';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/base/components/loading-mask/style.scss';

export interface LoadingMaskProps {
	children?: React.ReactNode | React.ReactNode[];
	className?: string;
	screenReaderLabel?: string;
	showSpinner?: boolean;
	isLoading?: boolean;
}
// @todo Find a way to block buttons/form components when LoadingMask isLoading
const LoadingMask = ( {
	children,
	className,
	screenReaderLabel,
	showSpinner = false,
	isLoading = true,
}: LoadingMaskProps ): JSX.Element => {
	return (
		<div
			className={ clsx( className, {
				'wc-block-components-loading-mask': isLoading,
			} ) }
		>
			{ isLoading && showSpinner && <Spinner /> }
			<div
				className={ clsx( {
					'wc-block-components-loading-mask__children': isLoading,
				} ) }
				aria-hidden={ isLoading }
			>
				{ children }
			</div>
			{ isLoading && (
				<span className="screen-reader-text">
					{ screenReaderLabel || __( 'Loading…', 'fincommerce' ) }
				</span>
			) }
		</div>
	);
};

export default LoadingMask;
