/**
 * External dependencies
 */
import { useBlockProps } from '@finpress/block-editor';

export const Save = () => {
	return <div { ...useBlockProps.save() }></div>;
};
