/**
 * External dependencies
 */
import { Button, DateTimePicker, Modal } from '@finpress/components';
import { createElement, useState } from '@finpress/element';
import { __ } from '@finpress/i18n';
import clsx from 'clsx';

/**
 * Internal dependencies
 */
import {
	getSiteDatetime,
	isSiteSettingsTime12HourFormatted,
} from '../../utils';
import { SchedulePublishModalProps } from './types';

export function SchedulePublishModal( {
	postType,
	title = __( 'Schedule product', 'fincommerce' ),
	description = __(
		'Decide when this product should become visible to customers.',
		'fincommerce'
	),
	value,
	className,
	onCancel,
	onSchedule,
	isScheduling,
	...props
}: SchedulePublishModalProps ) {
	const [ date, setDate ] = useState< string | undefined >(
		() => value ?? getSiteDatetime()
	);

	function handleDateTimePickerChange( newDate?: string | null ) {
		setDate( newDate ?? '' );
	}

	return (
		<Modal
			{ ...props }
			title={ title }
			className={ clsx(
				className,
				'fincommerce-schedule-publish-modal'
			) }
			onRequestClose={ () => onCancel?.() }
		>
			<p className="fincommerce-schedule-publish-modal__description">
				{ description }
			</p>

			<div className="fincommerce-schedule-publish-modal__content">
				<div className="fincommerce-schedule-publish-modal__button-now">
					<strong>{ __( 'Publish', 'fincommerce' ) }</strong>

					<Button
						variant="link"
						onClick={ () =>
							handleDateTimePickerChange( getSiteDatetime() )
						}
					>
						{ __( 'Now', 'fincommerce' ) }
					</Button>
				</div>

				<DateTimePicker
					currentDate={ date }
					onChange={ handleDateTimePickerChange }
					is12Hour={ isSiteSettingsTime12HourFormatted() }
				/>
			</div>

			<div className="fincommerce-schedule-publish-modal__buttons">
				<Button variant="tertiary" onClick={ onCancel }>
					{ __( 'Cancel', 'fincommerce' ) }
				</Button>
				<Button
					variant="primary"
					isBusy={ isScheduling }
					disabled={ isScheduling }
					onClick={ () => onSchedule?.( date ) }
				>
					{ __( 'Schedule', 'fincommerce' ) }
				</Button>
			</div>
		</Modal>
	);
}
