/**
 * External dependencies
 */
import {
	usePaymentMethodInterface,
	useStoreEvents,
} from '@fincommerce/base-context/hooks';
import { cloneElement, useCallback } from '@finpress/element';
import { useEditorContext } from '@fincommerce/base-context';
import clsx from 'clsx';
import { RadioControlAccordion } from '@fincommerce/blocks-components';
import { useDispatch, useSelect } from '@finpress/data';
import { getPaymentMethods } from '@fincommerce/blocks-registry';
import { paymentStore } from '@fincommerce/block-data';

/**
 * Internal dependencies
 */
import PaymentMethodCard from '@fincommerce/block-library/assets/js/blocks/cart-checkout-shared/payment-methods/payment-method-card';
import { noticeContexts } from '@fincommerce/block-library/assets/js/base/context/event-emit';

/**
 * Component used to render all non-saved payment method options.
 *
 * @return {*} The rendered component.
 */
const PaymentMethodOptions = () => {
	const {
		activeSavedToken,
		activePaymentMethod,
		isExpressPaymentMethodActive,
		savedPaymentMethods,
		availablePaymentMethods,
	} = useSelect( ( select ) => {
		const store = select( paymentStore );
		return {
			activeSavedToken: store.getActiveSavedToken(),
			activePaymentMethod: store.getActivePaymentMethod(),
			isExpressPaymentMethodActive: store.isExpressPaymentMethodActive(),
			savedPaymentMethods: store.getSavedPaymentMethods(),
			availablePaymentMethods: store.getAvailablePaymentMethods(),
		};
	} );
	const { __internalSetActivePaymentMethod } = useDispatch( paymentStore );
	const paymentMethods = getPaymentMethods();
	const { ...paymentMethodInterface } = usePaymentMethodInterface();
	const { removeNotice } = useDispatch( 'core/notices' );
	const { dispatchCheckoutEvent } = useStoreEvents();
	const { isEditor } = useEditorContext();

	const options = Object.keys( availablePaymentMethods ).map( ( name ) => {
		const { edit, content, label, supports } = paymentMethods[ name ];
		const component = isEditor ? edit : content;
		return {
			value: name,
			label:
				typeof label === 'string'
					? label
					: cloneElement( label, {
							components: paymentMethodInterface.components,
					  } ),
			name: `wc-saved-payment-method-token-${ name }`,
			content: (
				<PaymentMethodCard showSaveOption={ supports.showSaveOption }>
					{ cloneElement( component, {
						__internalSetActivePaymentMethod,
						...paymentMethodInterface,
					} ) }
				</PaymentMethodCard>
			),
		};
	} );

	const onChange = useCallback(
		( value ) => {
			__internalSetActivePaymentMethod( value );
			removeNotice( 'wc-payment-error', noticeContexts.PAYMENTS );
			dispatchCheckoutEvent( 'set-active-payment-method', {
				paymentMethodSlug: value,
			} );
		},
		[
			dispatchCheckoutEvent,
			removeNotice,
			__internalSetActivePaymentMethod,
		]
	);

	const isSinglePaymentMethod =
		Object.keys( savedPaymentMethods ).length === 0 &&
		Object.keys( availablePaymentMethods ).length === 1;

	const singleOptionClass = clsx( {
		'disable-radio-control': isSinglePaymentMethod,
	} );
	return isExpressPaymentMethodActive ? null : (
		<RadioControlAccordion
			highlightChecked={ true }
			id={ 'wc-payment-method-options' }
			className={ singleOptionClass }
			selected={ activeSavedToken ? null : activePaymentMethod }
			onChange={ onChange }
			options={ options }
		/>
	);
};

export default PaymentMethodOptions;
