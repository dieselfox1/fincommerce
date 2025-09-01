/**
 * External dependencies
 */
import { registerPlugin } from '@wordpress/plugins';

/**
 * Internal dependencies
 */
import { ProductEditorDevTools } from './product-editor-dev-tools';
import './index.scss';

function registerProductEditorDevTools() {
	registerPlugin( 'fincommerce-product-editor-dev-tools', {
		scope: 'fincommerce-product-block-editor',
		render: ProductEditorDevTools,
	} );
}
registerProductEditorDevTools();
