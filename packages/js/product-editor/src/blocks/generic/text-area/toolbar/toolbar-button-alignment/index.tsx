/**
 * External dependencies
 */
import { createElement } from '@finpress/element';
import { __ } from '@finpress/i18n';
import {
	alignCenter,
	alignJustify,
	alignLeft,
	alignRight,
} from '@finpress/icons';
import {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore No types for this exist yet.
	AlignmentControl,
} from '@finpress/block-editor';

export const ALIGNMENT_CONTROLS = [
	{
		icon: alignLeft,
		title: __( 'Align text left', 'fincommerce' ),
		align: 'left',
	},
	{
		icon: alignCenter,
		title: __( 'Align text center', 'fincommerce' ),
		align: 'center',
	},
	{
		icon: alignRight,
		title: __( 'Align text right', 'fincommerce' ),
		align: 'right',
	},
	{
		icon: alignJustify,
		title: __( 'Align text justify', 'fincommerce' ),
		align: 'justify',
	},
];

export default function AlignmentToolbarButton( {
	align,
	setAlignment,
}: AlignmentControl ) {
	return (
		<AlignmentControl
			alignmentControls={ ALIGNMENT_CONTROLS }
			value={ align }
			onChange={ setAlignment }
		/>
	);
}
