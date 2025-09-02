/**
 * External dependencies
 */
import { useEntityProp } from '@finpress/core-data';
import type { BlockEditProps } from '@finpress/blocks';
import {
	dateI18n,
	humanTimeDiff,
	getSettings as getDateSettings,
} from '@finpress/date';
import { PanelBody, ToggleControl } from '@finpress/components';
import { __, _x } from '@finpress/i18n';
import {
	InspectorControls,
	useBlockProps,
	// @ts-expect-error - Experimental component
	// eslint-disable-next-line @finpress/no-unsafe-wp-apis
	__experimentalDateFormatPicker as DateFormatPicker,
} from '@finpress/block-editor';

export default function Edit( {
	attributes: { format, isLink },
	context: { commentId },
	setAttributes,
}: BlockEditProps< {
	format: string;
	isLink: boolean;
} > & {
	context: { commentId: number };
} ) {
	const blockProps = useBlockProps();

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error - the type of useEntityProp is not correct
	let [ date ] = useEntityProp( 'root', 'comment', 'date', commentId );
	const [ siteFormat = getDateSettings().formats.date ] = useEntityProp(
		'root',
		'site',
		'date_format'
	);

	if ( ! commentId || ! date ) {
		date = _x( 'Review Date', 'block title', 'fincommerce' );
	}

	let reviewDate =
		date instanceof Date ? (
			<time dateTime={ dateI18n( 'c', date, true ) }>
				{ format === 'human-diff'
					? humanTimeDiff( date, new Date() )
					: dateI18n( format || siteFormat, date, true ) }
			</time>
		) : (
			<time>{ date }</time>
		);

	if ( isLink ) {
		reviewDate = (
			<a
				href="#review-date-pseudo-link"
				onClick={ ( event ) => event.preventDefault() }
			>
				{ reviewDate }
			</a>
		);
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'fincommerce' ) }>
					<DateFormatPicker
						format={ format }
						defaultFormat={ siteFormat }
						onChange={ ( nextFormat: string ) =>
							setAttributes( { format: nextFormat } )
						}
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Link to review', 'fincommerce' ) }
						onChange={ () => setAttributes( { isLink: ! isLink } ) }
						checked={ isLink }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>{ reviewDate }</div>
		</>
	);
}
