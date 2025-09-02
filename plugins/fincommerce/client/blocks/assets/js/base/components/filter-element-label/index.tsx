/**
 * External dependencies
 */
import { _n, sprintf } from '@finpress/i18n';
import { Label } from '@fincommerce/blocks-components';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/base/components/filter-element-label/style.scss';

interface FilterElementLabelProps {
	name: string;
	count: number | null;
}
/**
 * The label for a filter element.
 *
 * @param {Object} props       Incoming props for the component.
 * @param {string} props.name  The name for the label.
 * @param {number} props.count The count of products this status is attached to.
 */
const FilterElementLabel = ( {
	name,
	count,
}: FilterElementLabelProps ): JSX.Element => {
	return (
		<>
			{ name }
			{ count !== null && Number.isFinite( count ) && (
				<Label
					label={ count.toString() }
					screenReaderLabel={ sprintf(
						/* translators: %s number of products. */
						_n( '%s product', '%s products', count, 'fincommerce' ),
						count
					) }
					wrapperElement="span"
					wrapperProps={ {
						className: 'wc-filter-element-label-list-count',
					} }
				/>
			) }
		</>
	);
};

export default FilterElementLabel;
