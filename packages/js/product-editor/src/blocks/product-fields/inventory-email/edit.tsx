/**
 * External dependencies
 */
import { __, sprintf } from '@finpress/i18n';
import { useWooBlockProps } from '@fincommerce/block-templates';
import { Link } from '@fincommerce/components';
import { Product } from '@fincommerce/data';
import {
	createElement,
	Fragment,
	createInterpolateElement,
} from '@finpress/element';
import { getSetting } from '@fincommerce/settings';
import { useInstanceId } from '@finpress/compose';
import {
	BaseControl,
	__experimentalInputControl as InputControl,
} from '@finpress/components';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore No types for this exist yet.
// eslint-disable-next-line @fincommerce/dependency-group
import { useEntityProp } from '@finpress/core-data';

/**
 * Internal dependencies
 */
import { useValidation } from '../../../contexts/validation-context';
import { InventoryEmailBlockAttributes } from './types';
import { ProductEditorBlockEditProps } from '../../../types';

export function Edit( {
	attributes,
	clientId,
}: ProductEditorBlockEditProps< InventoryEmailBlockAttributes > ) {
	const blockProps = useWooBlockProps( attributes );
	const notifyLowStockAmount = getSetting( 'notifyLowStockAmount', 2 );

	const [ lowStockAmount, setLowStockAmount ] = useEntityProp< number >(
		'postType',
		'product',
		'low_stock_amount'
	);

	const id = useInstanceId( BaseControl, 'low_stock_amount' ) as string;

	const {
		ref: lowStockAmountRef,
		error: lowStockAmountValidationError,
		validate: validateLowStockAmount,
	} = useValidation< Product >(
		`low_stock_amount-${ clientId }`,
		async function stockQuantityValidator() {
			if ( lowStockAmount && lowStockAmount < 0 ) {
				return {
					message: __(
						'This field must be a positive number.',
						'fincommerce'
					),
				};
			}
		},
		[ lowStockAmount ]
	);

	return (
		<>
			<div { ...blockProps }>
				<div className="wp-block-columns">
					<div className="wp-block-column">
						<BaseControl
							id={ id }
							label={ __(
								'Email me when stock reaches',
								'fincommerce'
							) }
							help={
								lowStockAmountValidationError ||
								createInterpolateElement(
									__(
										'Make sure to enable notifications in <link>store settings.</link>',
										'fincommerce'
									),
									{
										link: (
											<Link
												href={ `${ getSetting(
													'adminUrl'
												) }admin.php?page=wc-settings&tab=products&section=inventory` }
												target="_blank"
												type="external"
											></Link>
										),
									}
								)
							}
							className={
								lowStockAmountValidationError && 'has-error'
							}
						>
							<InputControl
								id={ id }
								ref={ lowStockAmountRef }
								name={ 'low_stock_amount' }
								placeholder={ sprintf(
									// translators: Default quantity to notify merchants of low stock.
									__( '%d (store default)', 'fincommerce' ),
									notifyLowStockAmount
								) }
								onChange={ ( nextValue ) => {
									setLowStockAmount(
										parseInt( nextValue ?? '', 10 )
									);
								} }
								onBlur={ async () =>
									await validateLowStockAmount()
								}
								value={ lowStockAmount?.toString() }
								type="number"
								min={ 0 }
							/>
						</BaseControl>
					</div>
					<div className="wp-block-column"></div>
				</div>
			</div>
		</>
	);
}
