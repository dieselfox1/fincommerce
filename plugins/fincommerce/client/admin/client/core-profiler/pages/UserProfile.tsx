/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { Button } from '@finpress/components';
import { useState } from '@finpress/element';
import { SelectControl } from '@fincommerce/components';
import { Icon, chevronDown } from '@finpress/icons';
import clsx from 'clsx';

/**
 * Internal dependencies
 */
import { CoreProfilerStateMachineContext } from '../index';
import { UserProfileEvent } from '../events';
import { Navigation } from '../components/navigation/navigation';
import { Heading } from '../components/heading/heading';
import { Choice } from '../components/choice/choice';
import { MultipleSelector } from '../components/multiple-selector/multiple-selector';

const businessOptions = [
	{
		title: __( 'I’m just starting my business', 'fincommerce' ),
		value: 'im_just_starting_my_business' as const,
	},
	{
		title: __( 'I’m already selling', 'fincommerce' ),
		value: 'im_already_selling' as const,
	},
	{
		title: __( 'I’m setting up a store for a client', 'fincommerce' ),
		value: 'im_setting_up_a_store_for_a_client' as const,
	},
];

const sellingOnlineOptions = [
	{
		label: __( 'Yes, I’m selling online', 'fincommerce' ),
		value: 'yes_im_selling_online' as const,
		key: 'yes_im_selling_online' as const,
	},
	{
		label: __( 'No, I’m selling offline', 'fincommerce' ),
		value: 'no_im_selling_offline' as const,
		key: 'no_im_selling_offline' as const,
	},
	{
		label: __( 'I’m selling both online and offline', 'fincommerce' ),
		value: 'im_selling_both_online_and_offline' as const,
		key: 'im_selling_both_online_and_offline' as const,
	},
];

const platformOptions = [
	{
		label: __( 'Amazon', 'fincommerce' ),
		value: 'amazon' as const,
	},
	{
		label: __( 'Adobe Commerce', 'fincommerce' ),
		value: 'adobe_commerce' as const,
	},
	{
		label: __( 'Big Cartel', 'fincommerce' ),
		value: 'big_cartel' as const,
	},
	{
		label: __( 'Big Commerce', 'fincommerce' ),
		value: 'big_commerce' as const,
	},
	{
		label: __( 'Ebay', 'fincommerce' ),
		value: 'ebay' as const,
	},
	{
		label: __( 'Ecwid', 'fincommerce' ),
		value: 'ecwid' as const,
	},
	{
		label: __( 'Etsy', 'fincommerce' ),
		value: 'etsy' as const,
	},
	{
		label: __( 'Facebook Marketplace', 'fincommerce' ),
		value: 'facebook_marketplace' as const,
	},
	{
		label: __( 'Google Shopping', 'fincommerce' ),
		value: 'google_shopping' as const,
	},
	{
		label: __( 'Pinterest', 'fincommerce' ),
		value: 'pinterest' as const,
	},
	{
		label: __( 'Shopify', 'fincommerce' ),
		value: 'shopify' as const,
	},
	{
		label: __( 'Square', 'fincommerce' ),
		value: 'square' as const,
	},
	{
		label: __( 'Squarespace', 'fincommerce' ),
		value: 'squarespace' as const,
	},
	{
		label: __( 'Wix', 'fincommerce' ),
		value: 'wix' as const,
	},
	{
		label: __( 'finpress', 'fincommerce' ),
		value: 'finpress' as const,
	},
];

export type BusinessChoice = ( typeof businessOptions )[ 0 ][ 'value' ];
export type SellingOnlineAnswer =
	( typeof sellingOnlineOptions )[ 0 ][ 'value' ];
export type SellingPlatform = ( typeof platformOptions )[ 0 ][ 'value' ];

export const UserProfile = ( {
	sendEvent,
	navigationProgress,
	context,
}: {
	sendEvent: ( event: UserProfileEvent ) => void;
	navigationProgress: number;
	context: Pick< CoreProfilerStateMachineContext, 'userProfile' >;
} ) => {
	const [ businessChoice, setBusinessChoice ] = useState< BusinessChoice >(
		context.userProfile.businessChoice || 'im_just_starting_my_business'
	);
	const [ sellingOnlineAnswer, setSellingOnlineAnswer ] =
		useState< SellingOnlineAnswer | null >(
			context.userProfile.sellingOnlineAnswer || null
		);
	const [ sellingPlatforms, setSellingPlatforms ] =
		useState< Array< SellingPlatform > | null >(
			context.userProfile.sellingPlatforms || null
		);
	const [ isPlatformDropdownOpen, setIsPlatformDropdownOpen ] =
		useState( false );

	const renderAlreadySellingOptions = () => {
		return (
			<>
				<div className="fincommerce-profiler-selling-online-question">
					<p className="fincommerce-profiler-question-label">
						{ __( 'Are you selling online?', 'fincommerce' ) }
					</p>
					<SelectControl
						className="fincommerce-profiler-select-control__selling-online-question"
						instanceId={ 1 }
						label={ __( 'Select an option', 'fincommerce' ) }
						autoComplete="new-password" // disable autocomplete and autofill
						options={ sellingOnlineOptions }
						excludeSelectedOptions={ false }
						help={ <Icon icon={ chevronDown } /> }
						onChange={ ( selectedOptionKey ) => {
							setSellingOnlineAnswer(
								selectedOptionKey as SellingOnlineAnswer
							);
						} }
						multiple={ false }
						selected={ String( sellingOnlineAnswer ) }
					/>
				</div>
				{ sellingOnlineAnswer &&
					[
						'yes_im_selling_online',
						'im_selling_both_online_and_offline',
					].includes( sellingOnlineAnswer ) && (
						<div className="fincommerce-profiler-selling-platform">
							<p className="fincommerce-profiler-question-label">
								{ __(
									'Which platform(s) are you currently using?',
									'fincommerce'
								) }
							</p>
							<MultipleSelector
								options={ platformOptions }
								selectedOptions={ platformOptions.filter(
									( option ) =>
										sellingPlatforms?.includes(
											option.value
										)
								) }
								onSelect={ ( items ) => {
									setSellingPlatforms(
										items.map(
											( item ) =>
												item.value as SellingPlatform
										)
									);
								} }
								onOpenClose={ setIsPlatformDropdownOpen }
							/>
						</div>
					) }
			</>
		);
	};

	const onContinue = () => {
		sendEvent( {
			type: 'USER_PROFILE_COMPLETED',
			payload: {
				userProfile: {
					businessChoice,
					sellingOnlineAnswer:
						businessChoice === 'im_already_selling'
							? sellingOnlineAnswer
							: null,
					sellingPlatforms:
						businessChoice === 'im_already_selling'
							? sellingPlatforms
							: null,
				},
			},
		} );
	};

	return (
		<div
			className="fincommerce-profiler-user-profile"
			data-testid="core-profiler-user-profile"
		>
			<Navigation
				percentage={ navigationProgress }
				skipText={ __( 'Skip this step', 'fincommerce' ) }
				onSkip={ () =>
					sendEvent( {
						type: 'USER_PROFILE_SKIPPED',
						payload: { userProfile: { skipped: true } },
					} )
				}
			/>
			<div
				className={ clsx(
					'fincommerce-profiler-page__content fincommerce-profiler-user-profile__content',
					{
						'is-platform-selector-open': isPlatformDropdownOpen,
					}
				) }
			>
				<Heading
					className="fincommerce-profiler__stepper-heading"
					title={ __(
						'Which one of these best describes you?',
						'fincommerce'
					) }
					subTitle={ __(
						'Let us know where you are in your commerce journey so that we can tailor your Woo experience for you.',
						'fincommerce'
					) }
				/>
				<form className="fincommerce-user-profile-choices">
					<fieldset>
						<legend className="screen-reader-text">
							{ __(
								'Which one of these best describes you?',
								'fincommerce'
							) }
						</legend>
						{ businessOptions.map( ( { title, value } ) => {
							return (
								<Choice
									key={ value }
									name="user-profile-choice"
									title={ title }
									selected={ businessChoice === value }
									value={ value }
									onChange={ ( _value ) => {
										setBusinessChoice(
											_value as BusinessChoice
										);
									} }
									subOptionsComponent={
										value === 'im_already_selling'
											? renderAlreadySellingOptions()
											: null
									}
								/>
							);
						} ) }
					</fieldset>
				</form>
				<div className="fincommerce-profiler-button-container">
					<Button
						className="fincommerce-profiler-button"
						variant="primary"
						onClick={ onContinue }
					>
						{ __( 'Continue', 'fincommerce' ) }
					</Button>
				</div>
			</div>
		</div>
	);
};
