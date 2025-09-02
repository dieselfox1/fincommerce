/**
 * External dependencies
 */
import { useBlockProps, InnerBlocks } from '@finpress/block-editor';

export default function Save() {
	return (
		<div { ...useBlockProps.save() }>
			<InnerBlocks.Content />
		</div>
	);
}
