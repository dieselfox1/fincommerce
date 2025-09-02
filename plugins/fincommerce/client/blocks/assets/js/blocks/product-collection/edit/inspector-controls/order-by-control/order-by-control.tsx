/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import {
	SelectControl,
	// @ts-expect-error Using experimental features
	// eslint-disable-next-line @finpress/no-unsafe-wp-apis
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@finpress/components';

const OrderByControl = ( {
	hasValue = () => true,
	orderOptions,
	onChange,
	onDeselect = () => void 0,
	selectedValue,
	label,
	help,
}: {
	hasValue?: () => boolean;
	orderOptions: { value: string; label: string }[];
	onChange: ( value: string ) => void;
	onDeselect?: () => void;
	selectedValue: string;
	label?: string;
	help?: string;
} ) => {
	return (
		<ToolsPanelItem
			label={ label || __( 'Order by', 'fincommerce' ) }
			hasValue={ hasValue }
			isShownByDefault
			onDeselect={ onDeselect }
			resetAllFilter={ onDeselect }
		>
			<SelectControl
				value={ selectedValue }
				options={ orderOptions }
				label={ label || __( 'Order by', 'fincommerce' ) }
				onChange={ onChange }
				help={ help }
			/>
		</ToolsPanelItem>
	);
};

export default OrderByControl;
