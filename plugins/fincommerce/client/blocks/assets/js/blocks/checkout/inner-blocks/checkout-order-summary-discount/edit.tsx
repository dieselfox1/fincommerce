/**
 * External dependencies
 */
import { useBlockProps } from '@finpress/block-editor';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-order-summary-discount/block';

export const Edit = ( {
	attributes,
}: {
	attributes: {
		className: string;
	};
	setAttributes: ( attributes: Record< string, unknown > ) => void;
} ): JSX.Element => {
	const { className } = attributes;
	const blockProps = useBlockProps();
	return (
		<div { ...blockProps }>
			<Block className={ className } />
		</div>
	);
};

export const Save = (): JSX.Element => {
	return <div { ...useBlockProps.save() } />;
};
