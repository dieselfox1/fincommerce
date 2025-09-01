/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import type { MouseEventHandler } from 'react';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/base/components/load-more-button/style.scss';
import Label from '@fincommerce/block-library/packages/components/label'; // Imported like this because importing from the components package loads the data stores unnecessarily - not a problem in the front end but would require a lot of unit test rewrites to prevent breaking tests due to incorrect mocks.

interface LoadMoreButtonProps {
	onClick: MouseEventHandler;
	label?: string;
	screenReaderLabel?: string;
}

export const LoadMoreButton = ( {
	onClick,
	label = __( 'Load more', 'fincommerce' ),
	screenReaderLabel = __( 'Load more', 'fincommerce' ),
}: LoadMoreButtonProps ): JSX.Element => {
	return (
		<div className="wp-block-button wc-block-load-more wc-block-components-load-more">
			<button className="wp-block-button__link" onClick={ onClick }>
				<Label
					label={ label }
					screenReaderLabel={ screenReaderLabel }
				/>
			</button>
		</div>
	);
};

export default LoadMoreButton;
