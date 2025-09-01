/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import Noninteractive from '@fincommerce/base-components/noninteractive';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/inner-blocks/mini-cart-products-table-block/block';

export const Edit = (): JSX.Element => {
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<Noninteractive>
				<Block className="is-mobile" />
			</Noninteractive>
		</div>
	);
};

export const Save = (): JSX.Element => {
	return <div { ...useBlockProps.save() }></div>;
};
