/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import Noninteractive from '@fincommerce/base-components/noninteractive';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-order-note-block/block';
import '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-order-note-block/editor.scss';

export const Edit = (): JSX.Element => {
	const blockProps = useBlockProps();
	return (
		<div { ...blockProps }>
			<Noninteractive>
				<Block />
			</Noninteractive>
		</div>
	);
};

export const Save = (): JSX.Element => {
	return <div { ...useBlockProps.save() } />;
};
