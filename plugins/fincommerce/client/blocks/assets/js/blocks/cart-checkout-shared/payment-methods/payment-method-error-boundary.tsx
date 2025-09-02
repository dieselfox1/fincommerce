/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { Component } from '@finpress/element';
import { CURRENT_USER_IS_ADMIN } from '@fincommerce/settings';
import { StoreNoticesContainer } from '@fincommerce/blocks-components';
import { noticeContexts } from '@fincommerce/base-context';
import { NoticeType } from '@fincommerce/types';
import {
	DerivedStateReturn,
	ReactError,
} from '@fincommerce/base-components/block-error-boundary/types';

interface PaymentMethodErrorBoundaryProps {
	isEditor: boolean;
	children: React.ReactNode;
}

class PaymentMethodErrorBoundary extends Component< PaymentMethodErrorBoundaryProps > {
	state = { errorMessage: '', hasError: false };
	static getDerivedStateFromError( error: ReactError ): DerivedStateReturn {
		return {
			errorMessage: error.message,
			hasError: true,
		};
	}

	render() {
		const { hasError, errorMessage } = this.state;
		const { isEditor } = this.props;

		if ( hasError ) {
			let errorText = __(
				'We are experiencing difficulties with this payment method. Please contact us for assistance.',
				'fincommerce'
			);
			if ( isEditor || CURRENT_USER_IS_ADMIN ) {
				if ( errorMessage ) {
					errorText = errorMessage;
				} else {
					errorText = __(
						"There was an error with this payment method. Please verify it's configured correctly.",
						'fincommerce'
					);
				}
			}
			const notices: NoticeType[] = [
				{
					id: '0',
					content: errorText,
					isDismissible: false,
					status: 'error',
				},
			];
			return (
				<StoreNoticesContainer
					additionalNotices={ notices }
					context={ noticeContexts.PAYMENTS }
				/>
			);
		}

		return this.props.children;
	}
}
export default PaymentMethodErrorBoundary;
