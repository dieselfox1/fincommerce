/**
 * External dependencies
 */
import { Button } from '@finpress/components';
import clsx from 'clsx';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/editor-components/text-toolbar-button/style.scss';

function TextToolbarButton( { className = '', ...props } ) {
	const classes = clsx( 'wc-block-text-toolbar-button', className );
	return <Button className={ classes } { ...props } />;
}

export default TextToolbarButton;
