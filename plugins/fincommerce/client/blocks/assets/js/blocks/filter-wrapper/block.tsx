/**
 * External dependencies
 */
import { useRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/blocks/filter-wrapper/register-components';
import { FilterBlockContext } from '@fincommerce/block-library/assets/js/blocks/filter-wrapper/context';

type Props = {
	children: React.ReactNode;
};

const Block = ( { children }: Props ) => {
	const wrapper = useRef( null );
	return (
		<div className="wc-blocks-filter-wrapper" ref={ wrapper }>
			<FilterBlockContext.Provider value={ { wrapper } }>
				{ children }
			</FilterBlockContext.Provider>
		</div>
	);
};

export default Block;
