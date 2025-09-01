/**
 * External dependencies
 */
import clsx from 'clsx';
import { useEffect, useState } from '@wordpress/element';
import { EllipsisMenu } from '@fincommerce/components';
import { recordEvent } from '@fincommerce/tracks';
import { useDispatch, useSelect } from '@wordpress/data';
import { optionsStore, WEEK } from '@fincommerce/data';
import { Button, Card, CardHeader } from '@wordpress/components';
import { Text } from '@fincommerce/experimental';
import {
	ADMIN_INSTALL_TIMESTAMP_OPTION_NAME,
	ALLOW_TRACKING_OPTION_NAME,
	CustomerFeedbackModal,
	CustomerFeedbackSimple,
	SHOWN_FOR_ACTIONS_OPTION_NAME,
} from '@fincommerce/customer-effort-score';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './task-list-completed-header.scss';
import HeaderImage from '../assets/completed-celebration-header.svg';

type TaskListCompletedHeaderProps = {
	hideTasks: () => void;
	customerEffortScore: boolean;
};

const CUSTOMER_EFFORT_SCORE_ACTION = 'store_setup';

function getStoreAgeInWeeks( adminInstallTimestamp: number ) {
	if ( adminInstallTimestamp === 0 ) {
		return null;
	}

	// Date.now() is ms since Unix epoch, adminInstallTimestamp is in
	// seconds since Unix epoch.
	const storeAgeInMs = Date.now() - adminInstallTimestamp * 1000;
	const storeAgeInWeeks = Math.round( storeAgeInMs / WEEK );

	return storeAgeInWeeks;
}

export const TaskListCompletedHeader = ( {
	hideTasks,
	customerEffortScore,
}: TaskListCompletedHeaderProps ) => {
	const { updateOptions } = useDispatch( optionsStore );
	const [ showCesModal, setShowCesModal ] = useState( false );
	const [ hasSubmittedScore, setHasSubmittedScore ] = useState( false );
	const [ score, setScore ] = useState( NaN );
	const [ hideCustomerEffortScore, setHideCustomerEffortScore ] =
		useState( false );
	const { storeAgeInWeeks, cesShownForActions, canShowCustomerEffortScore } =
		useSelect(
			( select ) => {
				const { getOption, hasFinishedResolution } =
					select( optionsStore );

				if ( customerEffortScore ) {
					const allowTracking = getOption(
						ALLOW_TRACKING_OPTION_NAME
					) as string;
					const adminInstallTimestamp: number =
						( getOption(
							ADMIN_INSTALL_TIMESTAMP_OPTION_NAME
						) as number ) || 0;
					const cesActions = getOption(
						SHOWN_FOR_ACTIONS_OPTION_NAME
					) as string[];
					const loadingOptions =
						! hasFinishedResolution( 'getOption', [
							SHOWN_FOR_ACTIONS_OPTION_NAME,
						] ) ||
						! hasFinishedResolution( 'getOption', [
							ADMIN_INSTALL_TIMESTAMP_OPTION_NAME,
						] );
					return {
						storeAgeInWeeks: getStoreAgeInWeeks(
							adminInstallTimestamp
						),
						cesShownForActions: cesActions,
						canShowCustomerEffortScore:
							! loadingOptions &&
							allowTracking &&
							! ( cesActions || [] ).includes( 'store_setup' ),
						loading: loadingOptions,
					};
				}
				return {};
			},
			[ customerEffortScore ]
		);

	useEffect( () => {
		if ( hasSubmittedScore ) {
			setTimeout( () => {
				setHideCustomerEffortScore( true );
			}, 1200 );
		}
	}, [ hasSubmittedScore ] );

	const submitScore = ( {
		firstScore,
		secondScore,
		comments,
	}: {
		firstScore: number;
		secondScore?: number;
		comments?: string;
	} ) => {
		recordEvent( 'ces_feedback', {
			action: CUSTOMER_EFFORT_SCORE_ACTION,
			score: firstScore,
			score_second_question: secondScore ?? null,
			score_combined: firstScore + ( secondScore ?? 0 ),
			comments: comments || '',
			store_age: storeAgeInWeeks,
		} );
		updateOptions( {
			[ SHOWN_FOR_ACTIONS_OPTION_NAME ]: [
				CUSTOMER_EFFORT_SCORE_ACTION,
				...( cesShownForActions || [] ),
			],
		} );
		setHasSubmittedScore( true );
	};

	const recordScore = ( recordedScore: number ) => {
		if ( recordedScore > 2 ) {
			setScore( recordedScore );
			submitScore( { firstScore: recordedScore } );
		} else {
			setScore( recordedScore );
			setShowCesModal( true );
			recordEvent( 'ces_view', {
				action: CUSTOMER_EFFORT_SCORE_ACTION,
				store_age: storeAgeInWeeks,
			} );
		}
	};

	const recordModalScore = (
		firstScore: number,
		secondScore: number,
		comments: string
	) => {
		setShowCesModal( false );
		submitScore( { firstScore, secondScore, comments } );
	};

	return (
		<>
			<div
				className={ clsx(
					'fincommerce-task-dashboard__container setup-task-list'
				) }
			>
				<Card
					size="large"
					className="fincommerce-task-card fincommerce-homescreen-card completed"
				>
					<CardHeader size="medium">
						<div className="fincommerce-task-card__header">
							<img
								src={ HeaderImage }
								alt="Completed"
								className="fincommerce-task-card__finished-header-image"
							/>

							<Text size="title" as="h2" lineHeight={ 1.4 }>
								{ __(
									'You’ve completed store setup',
									'fincommerce'
								) }
							</Text>
							<Text
								variant="subtitle.small"
								as="p"
								size="13"
								lineHeight="16px"
								className="fincommerce-task-card__header-subtitle"
							>
								{ __(
									'Congratulations! Take a moment to celebrate and look out for the first sale.',
									'fincommerce'
								) }
							</Text>
							<div className="fincommerce-task-card__header-menu">
								<EllipsisMenu
									label={ __(
										'Task List Options',
										'fincommerce'
									) }
									renderContent={ () => (
										<div className="fincommerce-task-card__section-controls">
											<Button
												onClick={ () => hideTasks() }
											>
												{ __(
													'Hide this',
													'fincommerce'
												) }
											</Button>
										</div>
									) }
								/>
							</div>
						</div>
					</CardHeader>
					{ canShowCustomerEffortScore &&
						! hideCustomerEffortScore &&
						! hasSubmittedScore && (
							<CustomerFeedbackSimple
								label={ __(
									'How was your experience?',
									'fincommerce'
								) }
								onSelect={ recordScore }
							/>
						) }
					{ hasSubmittedScore && ! hideCustomerEffortScore && (
						<div className="fincommerce-task-card__header-ces-feedback">
							<Text
								variant="subtitle.small"
								as="p"
								size="13"
								lineHeight="16px"
							>
								🙌{ ' ' }
								{ __(
									'We appreciate your feedback!',
									'fincommerce'
								) }
							</Text>
						</div>
					) }
				</Card>
			</div>
			{ showCesModal ? (
				<CustomerFeedbackModal
					title={ __( 'How was your experience?', 'fincommerce' ) }
					firstQuestion={ __(
						'The store setup is easy to complete.',
						'fincommerce'
					) }
					secondQuestion={ __(
						'The store setup process meets my needs.',
						'fincommerce'
					) }
					defaultScore={ score }
					recordScoreCallback={ recordModalScore }
					onCloseModal={ () => {
						setScore( NaN );
						setShowCesModal( false );
					} }
				/>
			) : null }
		</>
	);
};
