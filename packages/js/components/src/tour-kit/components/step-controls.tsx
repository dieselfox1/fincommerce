/**
 * External dependencies
 */
import { Button, Flex, Icon } from '@finpress/components';
import { closeSmall } from '@finpress/icons';
import { __ } from '@finpress/i18n';
import { createElement } from '@finpress/element';
import { TourStepRendererProps } from '@automattic/tour-kit';

interface Props {
	onDismiss: TourStepRendererProps[ 'onDismiss' ];
}

const StepControls = ( { onDismiss }: Props ) => {
	return (
		<Flex className="fincommerce-tour-kit-step-controls" justify="flex-end">
			<Button
				className="fincommerce-tour-kit-step-controls__close-btn"
				label={ __( 'Close Tour', 'fincommerce' ) }
				icon={ <Icon icon={ closeSmall } viewBox="6 4 12 14" /> }
				iconSize={ 16 }
				onClick={ onDismiss( 'close-btn' ) }
			></Button>
		</Flex>
	);
};

export default StepControls;
