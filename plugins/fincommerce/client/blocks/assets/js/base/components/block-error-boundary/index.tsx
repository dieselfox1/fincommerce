/**
 * External dependencies
 */
import { Component } from '@wordpress/element';

/**
 * Internal dependencies
 */
import BlockError from '@fincommerce/block-library/assets/js/base/components/block-error-boundary/block-error';
import '@fincommerce/block-library/assets/js/base/components/block-error-boundary/style.scss';

import type {
	DerivedStateReturn,
	ReactError,
	BlockErrorBoundaryProps,
} from '@fincommerce/block-library/assets/js/base/components/block-error-boundary/types';

class BlockErrorBoundary extends Component< BlockErrorBoundaryProps > {
	state = { errorMessage: '', hasError: false };

	static getDerivedStateFromError( error: ReactError ): DerivedStateReturn {
		if (
			typeof error.statusText !== 'undefined' &&
			typeof error.status !== 'undefined'
		) {
			return {
				errorMessage: (
					<>
						<strong>{ error.status }</strong>:&nbsp;
						{ error.statusText }
					</>
				),
				hasError: true,
			};
		}

		return { errorMessage: error.message, hasError: true };
	}

	render(): JSX.Element | React.ReactNode {
		const {
			header,
			imageUrl,
			showErrorMessage = true,
			showErrorBlock = true,
			text,
			errorMessagePrefix,
			renderError,
			button,
		} = this.props;
		const { errorMessage, hasError } = this.state;

		if ( hasError ) {
			if ( typeof renderError === 'function' ) {
				return renderError( { errorMessage } );
			}
			return (
				<BlockError
					showErrorBlock={ showErrorBlock }
					errorMessage={ showErrorMessage ? errorMessage : null }
					header={ header }
					imageUrl={ imageUrl }
					text={ text }
					errorMessagePrefix={ errorMessagePrefix }
					button={ button }
				/>
			);
		}

		return this.props.children;
	}
}

export default BlockErrorBoundary;
