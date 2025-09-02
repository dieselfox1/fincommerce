/**
 * External dependencies
 */
import { FormEvent } from 'react';
import clsx from 'clsx';
import { useInstanceId } from '@finpress/compose';
import { createElement, useState } from '@finpress/element';
import { __, sprintf } from '@finpress/i18n';
import { BaseControl, Button, Modal } from '@finpress/components';

/**
 * Internal dependencies
 */
import { ManageDownloadLimitsModalProps } from './types';
import { NumberControl } from '../number-control';

const DOWNLOAD_LIMIT_MIN = 0;
const DOWNLOAD_LIMIT_MAX = 10_000_000_000;
const DOWNLOAD_EXPIRY_MIN = 0;
const DOWNLOAD_EXPIRY_MAX = 10_000_000_000;

/**
 * Download limit and download expiry currently support
 * `-1`, `0`/`null` and a positive integer.
 * When the value is `-1` downloads can be unlimited.
 * When the value is `0` or `null` downloads are unabled.
 * When the value is greater then `0` downloads are fixed
 * to the amount set as value.
 *
 * @param value The amount of downloads
 * @return A valid number as string or empty
 */
function getInitialValue( value: number | null ): string {
	if ( value === null ) {
		return '0';
	}
	if ( value === -1 ) {
		return '';
	}
	return String( value );
}

export function ManageDownloadLimitsModal( {
	initialValue,
	onSubmit,
	onClose,
}: ManageDownloadLimitsModalProps ) {
	const [ downloadLimit, setDownloadLimit ] = useState< string >(
		getInitialValue( initialValue.downloadLimit )
	);
	const [ downloadExpiry, setDownloadExpiry ] = useState< string >(
		getInitialValue( initialValue.downloadExpiry )
	);
	const [ errors, setErrors ] = useState< Record< string, string > >( {} );

	function validateDownloadLimit() {
		if ( downloadLimit && ! Number.isInteger( Number( downloadLimit ) ) ) {
			setErrors( ( current ) => ( {
				...current,
				downloadLimit: __(
					'Download limit must be an integer number',
					'fincommerce'
				),
			} ) );
			return false;
		}

		if ( Number.parseInt( downloadLimit, 10 ) < DOWNLOAD_LIMIT_MIN ) {
			setErrors( ( current ) => ( {
				...current,
				downloadLimit: sprintf(
					// translators: %d is the minimum value of the number input.
					__(
						'Download limit must be greater than or equal to %d',
						'fincommerce'
					),
					DOWNLOAD_LIMIT_MIN
				),
			} ) );
			return false;
		}

		setErrors( ( { downloadLimit: _, ...current } ) => current );
		return true;
	}

	function validateDownloadExpiry() {
		if (
			downloadExpiry &&
			! Number.isInteger( Number( downloadExpiry ) )
		) {
			setErrors( ( current ) => ( {
				...current,
				downloadExpiry: __(
					'Expiry period must be an integer number',
					'fincommerce'
				),
			} ) );
			return false;
		}

		if ( Number.parseInt( downloadExpiry, 10 ) < DOWNLOAD_EXPIRY_MIN ) {
			setErrors( ( current ) => ( {
				...current,
				downloadExpiry: sprintf(
					// translators: %d is the minimum value of the number input.
					__(
						'Expiry period must be greater than or equal to %d',
						'fincommerce'
					),
					DOWNLOAD_EXPIRY_MIN
				),
			} ) );
			return false;
		}

		setErrors( ( { downloadExpiry: _, ...current } ) => current );
		return true;
	}

	const downloadLimitProps = {
		value: downloadLimit,
		onChange: setDownloadLimit,
		id: useInstanceId(
			BaseControl,
			'product_download_limit_field'
		) as string,
		min: DOWNLOAD_LIMIT_MIN,
		max: DOWNLOAD_LIMIT_MAX,
		className: clsx( {
			'has-error': errors.downloadLimit,
		} ),
		label: __( 'Download limit', 'fincommerce' ),
		help: __(
			'Decide how many times customers can download files after purchasing the product. Leave blank for unlimited re-downloads.',
			'fincommerce'
		),
		error: errors.downloadLimit,
		placeholder: __( 'Unlimited', 'fincommerce' ),
		suffix: __( 'times', 'fincommerce' ),

		onBlur() {
			validateDownloadLimit();
		},
	};

	const downloadExpiryProps = {
		value: downloadExpiry,
		onChange: setDownloadExpiry,
		id: useInstanceId(
			BaseControl,
			'product_download_expiry_field'
		) as string,
		min: DOWNLOAD_EXPIRY_MIN,
		max: DOWNLOAD_EXPIRY_MAX,
		className: clsx( {
			'has-error': errors.downloadExpiry,
		} ),
		label: __( 'Expiry period', 'fincommerce' ),
		help: __(
			'Decide how long customers can access the files after purchasing the product. Leave blank for unlimited access.',
			'fincommerce'
		),
		error: errors.downloadExpiry,
		placeholder: __( 'Unlimited', 'fincommerce' ),
		suffix: __( 'days', 'fincommerce' ),
		onBlur() {
			validateDownloadExpiry();
		},
	};

	function handleSubmit( event: FormEvent< HTMLFormElement > ) {
		event.preventDefault();

		const isDownloadLimitValid = validateDownloadLimit();
		const isDownloadExpiryValid = validateDownloadExpiry();

		if ( isDownloadLimitValid && isDownloadExpiryValid ) {
			onSubmit( {
				downloadLimit:
					downloadLimit === ''
						? -1
						: Number.parseInt( downloadLimit, 10 ),
				downloadExpiry:
					downloadExpiry === ''
						? -1
						: Number.parseInt( downloadExpiry, 10 ),
			} );
		}
	}

	function handleCancelClick() {
		onClose();
	}

	return (
		<Modal
			title={ __( 'Manage download limits', 'fincommerce' ) }
			className="fincommerce-manage-download-limits-modal"
			onRequestClose={ onClose }
		>
			<form noValidate onSubmit={ handleSubmit }>
				<div className="fincommerce-manage-download-limits-modal__content">
					<NumberControl { ...downloadLimitProps } />

					<NumberControl { ...downloadExpiryProps } />
				</div>

				<div className="fincommerce-manage-download-limits-modal__actions">
					<Button
						variant="tertiary"
						type="button"
						onClick={ handleCancelClick }
					>
						{ __( 'Cancel', 'fincommerce' ) }
					</Button>
					<Button variant="primary" type="submit">
						{ __( 'Save', 'fincommerce' ) }
					</Button>
				</div>
			</form>
		</Modal>
	);
}
