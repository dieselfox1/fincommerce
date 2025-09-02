/**
 * External dependencies
 */
import { __, _x } from '@finpress/i18n';
import {
	Flex,
	FlexItem,
	RadioControl,
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore - Ignoring because `__experimentalToggleGroupControl` is not yet in the type definitions.
	// eslint-disable-next-line @finpress/no-unsafe-wp-apis
	__experimentalToggleGroupControl as ToggleGroupControl,
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore - Ignoring because `__experimentalToggleGroupControlOption` is not yet in the type definitions.
	// eslint-disable-next-line @finpress/no-unsafe-wp-apis
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	// @ts-expect-error Using experimental features
	// eslint-disable-next-line @finpress/no-unsafe-wp-apis
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@finpress/components';

/**
 * Internal dependencies
 */
import {
	CoreFilterNames,
	ETimeFrameOperator,
	QueryControlProps,
} from '@fincommerce/block-library/assets/js/blocks/product-collection/types';
import { DEFAULT_FILTERS } from '@fincommerce/block-library/assets/js/blocks/product-collection/constants';

const CreatedControl = ( props: QueryControlProps ) => {
	const { query, trackInteraction, setQueryAttribute } = props;
	const { timeFrame } = query;

	const deselectCallback = () => {
		setQueryAttribute( {
			timeFrame: DEFAULT_FILTERS.timeFrame,
		} );
		trackInteraction( CoreFilterNames.CREATED );
	};

	return (
		<ToolsPanelItem
			label={ __( 'Created', 'fincommerce' ) }
			hasValue={ () => timeFrame?.operator && timeFrame?.value }
			onDeselect={ deselectCallback }
			resetAllFilter={ deselectCallback }
		>
			<Flex direction="column" gap={ 3 }>
				<FlexItem>
					<ToggleGroupControl
						label={ __( 'Created', 'fincommerce' ) }
						isBlock
						onChange={ ( value: ETimeFrameOperator ) => {
							setQueryAttribute( {
								timeFrame: {
									...timeFrame,
									operator: value,
								},
							} );
							trackInteraction( CoreFilterNames.CREATED );
						} }
						value={ timeFrame?.operator || ETimeFrameOperator.IN }
					>
						<ToggleGroupControlOption
							value={ ETimeFrameOperator.IN }
							label={ _x(
								'Within',
								'Product Collection query operator',
								'fincommerce'
							) }
						/>
						<ToggleGroupControlOption
							value={ ETimeFrameOperator.NOT_IN }
							label={ _x(
								'Before',
								'Product Collection query operator',
								'fincommerce'
							) }
						/>
					</ToggleGroupControl>
				</FlexItem>
				<FlexItem>
					<RadioControl
						onChange={ ( value: string ) => {
							setQueryAttribute( {
								timeFrame: {
									operator: ETimeFrameOperator.IN,
									...timeFrame,
									value,
								},
							} );
							trackInteraction( CoreFilterNames.CREATED );
						} }
						options={ [
							{
								label: 'last 24 hours',
								value: '-1 day',
							},
							{
								label: 'last 7 days',
								value: '-7 days',
							},
							{
								label: 'last 30 days',
								value: '-30 days',
							},
							{
								label: 'last 3 months',
								value: '-3 months',
							},
						] }
						selected={ timeFrame?.value }
					/>
				</FlexItem>
			</Flex>
		</ToolsPanelItem>
	);
};

export default CreatedControl;
