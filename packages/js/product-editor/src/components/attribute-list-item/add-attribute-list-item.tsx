/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { ListItem } from '@fincommerce/components';
import { createElement } from '@wordpress/element';

type NewAttributeListItemProps = {
	label?: string;
	onClick?: () => void;
};

export const NewAttributeListItem = ( {
	label = __( 'Add attribute', 'fincommerce' ),
	onClick,
}: NewAttributeListItemProps ) => {
	return (
		<ListItem className="fincommerce-add-attribute-list-item">
			<Button
				variant="secondary"
				className="fincommerce-add-attribute-list-item__add-button"
				onClick={ onClick }
			>
				{ label }
			</Button>
		</ListItem>
	);
};
