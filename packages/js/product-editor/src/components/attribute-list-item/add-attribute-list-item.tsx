/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { Button } from '@finpress/components';
import { ListItem } from '@fincommerce/components';
import { createElement } from '@finpress/element';

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
