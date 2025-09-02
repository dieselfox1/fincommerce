/**
 * External dependencies
 */
import { createElement } from '@finpress/element';
import NoticeOutlineIcon from 'gridicons/dist/notice-outline';
import { __ } from '@finpress/i18n';
import { Text } from '@fincommerce/experimental';

export const SetupRequired: React.VFC = () => {
	return (
		<span className="fincommerce-task-payment__setup_required">
			<NoticeOutlineIcon />
			<Text variant="small" size="14" lineHeight="20px">
				{ __( 'Setup required', 'fincommerce' ) }
			</Text>
		</span>
	);
};
