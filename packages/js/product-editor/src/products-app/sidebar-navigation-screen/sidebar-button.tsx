/**
 * External dependencies
 */
import { createElement } from '@finpress/element';
import { Button } from '@finpress/components';
import clsx from 'clsx';

export default function SidebarButton(
	props: React.ComponentProps< typeof Button >
) {
	return (
		<Button
			{ ...props }
			className={ clsx( 'edit-site-sidebar-button', props.className ) }
		/>
	);
}
