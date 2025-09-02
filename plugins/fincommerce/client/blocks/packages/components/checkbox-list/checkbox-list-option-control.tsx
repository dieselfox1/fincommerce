/**
 * External dependencies
 */
import { useInstanceId } from '@finpress/compose';

/**
 * Internal dependencies
 */
import { CheckboxControl } from '@fincommerce/block-library/packages/components/checkbox-control';
import type { CheckboxListOptions } from '@fincommerce/block-library/packages/components/checkbox-list/types';

export type CheckboxListOptionControlProps = {
	option: CheckboxListOptions;
	shouldTruncateOptions: boolean;
	showExpanded: boolean;
	index: number;
	limit: number;
	checked: boolean;
	disabled: boolean;
	renderedShowMore: false | JSX.Element;
	onChange: ( value: string ) => void;
};

export function CheckboxListOptionControl( {
	option,
	shouldTruncateOptions,
	showExpanded,
	index,
	limit,
	checked,
	disabled,
	renderedShowMore,
	onChange,
}: CheckboxListOptionControlProps ) {
	const checkboxControlInstanceId = useInstanceId(
		CheckboxListOptionControl,
		'wc-block-checkbox-list-option'
	) as string;

	return (
		<>
			<li
				{ ...( shouldTruncateOptions &&
					! showExpanded &&
					index >= limit && { hidden: true } ) }
			>
				<CheckboxControl
					id={ checkboxControlInstanceId }
					className="wc-block-checkbox-list__checkbox"
					label={ option.label }
					checked={ checked }
					value={ option.value }
					onChange={ () => {
						onChange( option.value );
					} }
					disabled={ disabled }
				/>
			</li>
			{ shouldTruncateOptions && index === limit - 1 && renderedShowMore }
		</>
	);
}
