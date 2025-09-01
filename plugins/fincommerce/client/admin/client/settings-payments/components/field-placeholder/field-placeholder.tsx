/**
 * External dependencies
 */
import { Placeholder } from '@wordpress/components';

/**
 * Internal dependencies
 */
import './field-placeholder.scss';

export type FieldPlaceholderSize = 'small' | 'medium' | 'large';

export const FieldPlaceholder = ( {
	size = 'medium',
}: {
	size?: FieldPlaceholderSize;
} ) => {
	return (
		<div
			className={ `fincommerce-field-placeholder fincommerce-field-placeholder--${ size }` }
		>
			<Placeholder />
		</div>
	);
};

export default FieldPlaceholder;
