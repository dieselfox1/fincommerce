/**
 * External dependencies
 */
import { InnerBlocks } from '@finpress/block-editor';

export default function NoResultsSave() {
	// @ts-expect-error: `InnerBlocks.Content` is a component that is typed in finpress core
	return <InnerBlocks.Content />;
}
