/**
 * External dependencies
 */
import clsx from 'clsx';
import { withFilteredAttributes } from '@fincommerce/shared-hocs';
import { FormStep } from '@fincommerce/blocks-components';
import { useDispatch, useSelect } from '@finpress/data';
import { checkoutStore as checkoutStoreDescriptor } from '@fincommerce/block-data';
import { useShippingData } from '@fincommerce/base-context/hooks';
import {
	LOCAL_PICKUP_ENABLED,
	SHIPPING_METHODS_EXIST,
	SHIPPING_ENABLED,
} from '@fincommerce/block-settings';
import { useCheckoutBlockContext } from '@fincommerce/blocks/checkout/context';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-shipping-method-block/block';
import attributes from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-shipping-method-block/attributes';

const FrontendBlock = ( {
	title,
	description,
	children,
	className,
	showPrice,
	showIcon,
	shippingText,
	localPickupText,
}: {
	title: string;
	description: string;
	children: JSX.Element;
	className?: string;
	showPrice: boolean;
	showIcon: boolean;
	shippingText: string;
	localPickupText: string;
} ) => {
	const { showFormStepNumbers } = useCheckoutBlockContext();
	const { checkoutIsProcessing, prefersCollection } = useSelect(
		( select ) => {
			const checkoutStore = select( checkoutStoreDescriptor );
			return {
				checkoutIsProcessing: checkoutStore.isProcessing(),
				prefersCollection: checkoutStore.prefersCollection(),
			};
		}
	);

	const { setPrefersCollection } = useDispatch( checkoutStoreDescriptor );
	const { needsShipping, isCollectable } = useShippingData();

	// Note that display logic is also found in plugins/fincommerce/client/blocks/assets/js/blocks/checkout/inner-blocks/register-components.ts
	// where the block is not registered if the conditions are not met.
	if (
		! SHIPPING_ENABLED ||
		! needsShipping ||
		! isCollectable ||
		! LOCAL_PICKUP_ENABLED ||
		! SHIPPING_METHODS_EXIST
	) {
		return null;
	}

	const onChange = ( method: string ) => {
		if ( method === 'pickup' ) {
			setPrefersCollection( true );
		} else {
			setPrefersCollection( false );
		}
	};

	return (
		<FormStep
			id="shipping-method"
			disabled={ checkoutIsProcessing }
			className={ clsx(
				'wc-block-checkout__shipping-method',
				className
			) }
			title={ title }
			description={ description }
			showStepNumber={ showFormStepNumbers }
		>
			<Block
				checked={ prefersCollection ? 'pickup' : 'shipping' }
				onChange={ onChange }
				showPrice={ showPrice }
				showIcon={ showIcon }
				localPickupText={ localPickupText }
				shippingText={ shippingText }
			/>
			{ children }
		</FormStep>
	);
};

export default withFilteredAttributes( attributes )( FrontendBlock );
