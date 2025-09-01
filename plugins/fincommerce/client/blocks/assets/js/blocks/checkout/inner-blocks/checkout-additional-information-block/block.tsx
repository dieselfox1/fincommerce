/**
 * External dependencies
 */
import { Fragment } from '@wordpress/element';
import { noticeContexts, useEditorContext } from '@fincommerce/base-context';
import { StoreNoticesContainer } from '@fincommerce/blocks-components';
import { useDispatch, useSelect } from '@wordpress/data';
import { checkoutStore } from '@fincommerce/block-data';
import { ORDER_FORM_KEYS } from '@fincommerce/block-settings';
import { Form } from '@fincommerce/base-components/cart-checkout';
import Noninteractive from '@fincommerce/base-components/noninteractive';
import type { FunctionComponent } from 'react';
import type { OrderFormValues } from '@fincommerce/settings';

const Block: FunctionComponent = () => {
	const { additionalFields } = useSelect( ( select ) => {
		const store = select( checkoutStore );
		return {
			additionalFields: store.getAdditionalFields(),
		};
	}, [] );
	const { isEditor } = useEditorContext();
	const { setAdditionalFields } = useDispatch( checkoutStore );

	const onChangeForm = ( additionalValues: OrderFormValues ) => {
		setAdditionalFields( additionalValues );
	};

	const additionalFieldValues = {
		...additionalFields,
	};

	const WrapperComponent = isEditor ? Noninteractive : Fragment;

	return (
		<>
			<StoreNoticesContainer
				context={ noticeContexts.ORDER_INFORMATION }
			/>
			<WrapperComponent>
				<Form
					id="order"
					addressType="order"
					onChange={ onChangeForm }
					fields={ ORDER_FORM_KEYS }
					values={ additionalFieldValues }
				/>
			</WrapperComponent>
		</>
	);
};

export default Block;
