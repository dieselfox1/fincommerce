/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { Disabled } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export interface Attributes {
	className?: string;
}

const Edit = () => {
	const blockProps = useBlockProps( {
		className: 'fincommerce wc-block-breadcrumbs',
	} );

	return (
		<div { ...blockProps }>
			<Disabled>
				<a href="/">{ __( 'Breadcrumbs', 'fincommerce' ) }</a>
				{ __( ' / Navigation / Path', 'fincommerce' ) }
			</Disabled>
		</div>
	);
};

export default Edit;
