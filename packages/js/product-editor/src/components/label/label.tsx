/**
 * External dependencies
 */
import {
	createElement,
	createInterpolateElement,
	isValidElement,
} from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Icon, help as helpIcon } from '@wordpress/icons';
import { __experimentalTooltip as Tooltip } from '@fincommerce/components';

/**
 * Internal dependencies
 */
import { sanitizeHTML } from '../../utils/sanitize-html';

export interface LabelProps {
	label: string;
	labelId?: string;
	required?: boolean;
	note?: string;
	tooltip?: string;
	onClick?: ( event: React.MouseEvent ) => void;
}

export const Label = ( {
	label,
	labelId,
	required,
	tooltip,
	note,
	onClick,
}: LabelProps ) => {
	let labelElement: JSX.Element | string = label;

	if ( required ) {
		if ( note?.length ) {
			labelElement = createInterpolateElement(
				__( '<label/> <note /> <required/>', 'fincommerce' ),
				{
					label: (
						<span
							dangerouslySetInnerHTML={ sanitizeHTML( label ) }
						></span>
					),
					note: (
						<span className="fincommerce-product-form-label__note">
							{ note }
						</span>
					),
					required: (
						<span
							aria-hidden="true"
							className="fincommerce-product-form-label__required"
						>
							{ /* translators: field 'required' indicator */ }
							{ __( '*', 'fincommerce' ) }
						</span>
					),
				}
			);
		} else {
			labelElement = createInterpolateElement(
				__( '<label/> <required/>', 'fincommerce' ),
				{
					label: <span>{ label }</span>,
					required: (
						<span
							aria-hidden="true"
							className="fincommerce-product-form-label__required"
						>
							{ /* translators: field 'required' indicator */ }
							{ __( '*', 'fincommerce' ) }
						</span>
					),
				}
			);
		}
	} else if ( note?.length ) {
		labelElement = createInterpolateElement(
			__( '<label/> <note />', 'fincommerce' ),
			{
				label: <span>{ label }</span>,
				note: (
					<span className="fincommerce-product-form-label__note">
						{ note }
					</span>
				),
			}
		);
	}

	const spanAdditionalProps =
		typeof labelElement === 'string'
			? { dangerouslySetInnerHTML: sanitizeHTML( label ) }
			: {};

	return (
		<div className="fincommerce-product-form-label__label">
			{ /* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */ }
			<span id={ labelId } onClick={ onClick } { ...spanAdditionalProps }>
				{ isValidElement( labelElement ) ? labelElement : null }
			</span>

			{ tooltip && (
				<Tooltip
					text={
						<span
							dangerouslySetInnerHTML={ sanitizeHTML( tooltip ) }
						></span>
					}
					position="top center"
					className="fincommerce-product-form-label__tooltip"
				>
					<span className="fincommerce-product-form-label__icon">
						<Icon icon={ helpIcon } size={ 18 } fill="#949494" />
					</span>
				</Tooltip>
			) }
		</div>
	);
};
