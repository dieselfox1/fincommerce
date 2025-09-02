/**
 * External dependencies
 */
import { select, dispatch } from '@finpress/data';
import { store as coreDataStore, useEntityProp } from '@finpress/core-data';
import {
	BaseControl,
	PanelRow,
	TextControl,
	ToggleControl,
} from '@finpress/components';
import { addFilter } from '@finpress/hooks';
import { __ } from '@finpress/i18n';
import clsx from 'clsx';
import { useState } from '@finpress/element';

/**
 * Internal dependencies
 */
import { NAME_SPACE } from './constants';
import { EmailStatus } from './email-status';

const previewTextMaxLength = 150;
const previewTextRecommendedLength = 80;

type SidebarSettings = {
	RichTextWithButton: React.ComponentType< {
		attributeName: string;
		attributeValue: string;
		updateProperty: ( name: string, value: string | boolean ) => void;
		label: string;
		placeholder: string;
		help?: React.ReactNode;
	} >;
	recordEvent: ( name: string, data?: Record< string, unknown > ) => void;
	debouncedRecordEvent: (
		name: string,
		data?: Record< string, unknown >
	) => void;
};

const SidebarSettings = ( {
	RichTextWithButton,
	recordEvent,
	debouncedRecordEvent,
}: SidebarSettings ) => {
	const [ fincommerce_email_data ] = useEntityProp(
		'postType',
		'woo_email',
		'fincommerce_data'
	);

	// Initialize toggle control state
	const [ addBCC, setAddBCC ] = useState( !! fincommerce_email_data?.bcc );
	const [ addCC, setAddCC ] = useState( !! fincommerce_email_data?.cc );

	if ( ! fincommerce_email_data ) {
		return null;
	}

	const updateWooMailProperty = ( name: string, value: string | boolean ) => {
		const editedPost = select( coreDataStore ).getEditedEntityRecord(
			'postType',
			'woo_email',
			window.fincommerceEmailEditor.current_post_id
		);

		// @ts-expect-error Property 'mailpoet_data' does not exist on type 'Updatable<Attachment<any>>'.
		const fincommerce_data = editedPost?.fincommerce_data || {};
		void dispatch( coreDataStore ).editEntityRecord(
			'postType',
			'woo_email',
			window.fincommerceEmailEditor.current_post_id,
			{
				fincommerce_data: {
					...fincommerce_data,
					[ name ]: value,
				},
			}
		);
	};

	const previewTextLength = fincommerce_email_data?.preheader?.length ?? 0;

	return (
		<>
			<br />
			{ fincommerce_email_data.email_type ===
			'customer_refunded_order' ? (
				<>
					<RichTextWithButton
						attributeName="subject_full"
						attributeValue={ fincommerce_email_data.subject_full }
						updateProperty={ updateWooMailProperty }
						label={ __( 'Full Refund Subject', 'fincommerce' ) }
						placeholder={ fincommerce_email_data.default_subject }
					/>
					<br />
					<RichTextWithButton
						attributeName="subject_partial"
						attributeValue={
							fincommerce_email_data.subject_partial
						}
						updateProperty={ updateWooMailProperty }
						label={ __( 'Partial Refund Subject', 'fincommerce' ) }
						placeholder={ fincommerce_email_data.default_subject }
					/>
				</>
			) : (
				<RichTextWithButton
					attributeName="subject"
					attributeValue={ fincommerce_email_data.subject }
					updateProperty={ updateWooMailProperty }
					label={ __( 'Subject', 'fincommerce' ) }
					placeholder={ fincommerce_email_data.default_subject }
				/>
			) }

			<br />
			<RichTextWithButton
				attributeName="preheader"
				attributeValue={ fincommerce_email_data.preheader }
				updateProperty={ updateWooMailProperty }
				label={ __( 'Preview text', 'fincommerce' ) }
				help={
					<span
						className={ clsx(
							'fincommerce-settings-panel__preview-text-length',
							{
								'fincommerce-settings-panel__preview-text-length-warning':
									previewTextLength >
									previewTextRecommendedLength,
								'fincommerce-settings-panel__preview-text-length-error':
									previewTextLength > previewTextMaxLength,
							}
						) }
					>
						{ previewTextLength }/{ previewTextMaxLength }
					</span>
				}
				placeholder={ __(
					'Shown as a preview in the inbox, next to the subject line.',
					'fincommerce'
				) }
			/>
			<PanelRow>
				<BaseControl
					__nextHasNoMarginBottom
					label={ __( 'Recipients', 'fincommerce' ) }
					id="fincommerce-email-editor-recipients"
				>
					{ fincommerce_email_data.recipient === null ? (
						<p className="fincommerce-email-editor-recipients-help">
							{ __(
								'This email is sent to Customer.',
								'fincommerce'
							) }
						</p>
					) : (
						<TextControl
							__nextHasNoMarginBottom
							__next40pxDefaultSize
							name="recipient"
							data-testid="email_recipient"
							value={ fincommerce_email_data.recipient }
							onChange={ ( value ) => {
								updateWooMailProperty( 'recipient', value );
							} }
							help={ __(
								'Separate with commas to add multiple email addresses.',
								'fincommerce'
							) }
						/>
					) }
				</BaseControl>
			</PanelRow>
			<PanelRow>
				<BaseControl __nextHasNoMarginBottom>
					<ToggleControl
						__nextHasNoMarginBottom
						name="add_cc"
						checked={ addCC }
						label={ __( 'Add CC', 'fincommerce' ) }
						onChange={ ( value ) => {
							setAddCC( value );
							if ( ! value ) {
								updateWooMailProperty( 'cc', '' );
							}
							recordEvent( 'email_cc_toggle_clicked', {
								isEnabled: value,
							} );
						} }
					/>
				</BaseControl>
			</PanelRow>
			{ addCC && (
				<PanelRow>
					<BaseControl __nextHasNoMarginBottom>
						<TextControl
							__nextHasNoMarginBottom
							__next40pxDefaultSize
							data-testid="email_cc"
							value={ fincommerce_email_data?.cc || '' }
							onChange={ ( value ) => {
								updateWooMailProperty( 'cc', value );
								debouncedRecordEvent(
									'email_cc_input_updated',
									{
										value,
									}
								);
							} }
							help={ __(
								'Add recipients who will receive a copy of the email. Separate multiple addresses with commas.',
								'fincommerce'
							) }
						/>
					</BaseControl>
				</PanelRow>
			) }
			<PanelRow>
				<BaseControl __nextHasNoMarginBottom>
					<ToggleControl
						__nextHasNoMarginBottom
						name="add_bcc"
						checked={ addBCC }
						label={ __( 'Add BCC', 'fincommerce' ) }
						onChange={ ( value ) => {
							setAddBCC( value );
							if ( ! value ) {
								updateWooMailProperty( 'bcc', '' );
							}
							recordEvent( 'email_bcc_toggle_clicked', {
								isEnabled: value,
							} );
						} }
					/>
				</BaseControl>
			</PanelRow>
			{ addBCC && (
				<PanelRow>
					<BaseControl __nextHasNoMarginBottom>
						<TextControl
							__nextHasNoMarginBottom
							__next40pxDefaultSize
							data-testid="email_bcc"
							value={ fincommerce_email_data?.bcc || '' }
							onChange={ ( value ) => {
								updateWooMailProperty( 'bcc', value );
								debouncedRecordEvent(
									'email_bcc_input_updated',
									{
										value,
									}
								);
							} }
							help={ __(
								'Add recipients who will receive a hidden copy of the email. Separate multiple addresses with commas.',
								'fincommerce'
							) }
						/>
					</BaseControl>
				</PanelRow>
			) }
		</>
	);
};

export function modifySidebar() {
	addFilter(
		'fincommerce_email_editor_setting_sidebar_email_status_component',
		NAME_SPACE,
		( _originalComponent, tracking ) => {
			return () => <EmailStatus recordEvent={ tracking.recordEvent } />;
		}
	);
	addFilter(
		'fincommerce_email_editor_setting_sidebar_extension_component',
		NAME_SPACE,
		( RichTextWithButton, tracking ) => {
			return () => (
				<SidebarSettings
					RichTextWithButton={ RichTextWithButton }
					recordEvent={ tracking.recordEvent }
					debouncedRecordEvent={ tracking.debouncedRecordEvent }
				/>
			);
		}
	);
}
