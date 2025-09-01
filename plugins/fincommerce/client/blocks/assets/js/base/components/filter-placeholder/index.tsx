/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/base/components/filter-placeholder/style.scss';

interface FilterTitlePlaceholderProps {
	children?: React.ReactNode;
}

const FilterTitlePlaceholder = ( {
	children,
}: FilterTitlePlaceholderProps ): JSX.Element => {
	return (
		<div className="wc-block-filter-title-placeholder">{ children }</div>
	);
};

export default FilterTitlePlaceholder;
