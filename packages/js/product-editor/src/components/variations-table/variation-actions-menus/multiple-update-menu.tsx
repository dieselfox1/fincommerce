/**
 * External dependencies
 */
import { Button, Dropdown } from '@finpress/components';
import { createElement } from '@finpress/element';
import { __ } from '@finpress/i18n';
import { chevronDown, chevronUp } from '@finpress/icons';

/**
 * Internal dependencies
 */
import { VariationActionsMenuProps } from './types';
import { VariationActions } from './variation-actions';

export function MultipleUpdateMenu( {
	selection,
	disabled,
	onChange,
	onDelete,
}: VariationActionsMenuProps ) {
	if ( ! selection ) {
		return null;
	}

	return (
		<Dropdown
			popoverProps={ {
				placement: 'bottom-end',
			} }
			renderToggle={ ( { isOpen, onToggle } ) => (
				<Button
					disabled={ disabled }
					aria-expanded={ isOpen }
					icon={ isOpen ? chevronUp : chevronDown }
					variant="secondary"
					onClick={ onToggle }
					className="variations-actions-menu__toggle"
				>
					<span>{ __( 'Quick update', 'fincommerce' ) }</span>
				</Button>
			) }
			renderContent={ ( { onClose }: { onClose: () => void } ) => (
				<VariationActions
					selection={ selection }
					onClose={ onClose }
					onChange={ onChange }
					onDelete={ onDelete }
					supportsMultipleSelection={ true }
				/>
			) }
		/>
	);
}
