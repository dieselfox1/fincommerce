/**
 * External dependencies
 */
import { useBlockProps } from '@finpress/block-editor';
import Noninteractive from '@fincommerce/base-components/noninteractive';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-line-items-block/block';

export const Edit = ( {
	attributes,
}: {
	attributes: { className: string };
} ): JSX.Element => {
	const { className } = attributes;
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<Noninteractive>
				<Block className={ className } />
			</Noninteractive>
		</div>
	);
};

export const Save = (): JSX.Element => {
	return <div { ...useBlockProps.save() } />;
};
