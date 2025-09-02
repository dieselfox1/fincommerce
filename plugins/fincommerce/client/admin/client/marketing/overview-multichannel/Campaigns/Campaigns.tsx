/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { useState } from '@finpress/element';
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Flex,
	FlexItem,
	FlexBlock,
} from '@finpress/components';
import { Icon, megaphone, cancelCircleFilled } from '@finpress/icons';
import {
	Pagination,
	Table,
	TablePlaceholder,
	Link,
} from '@fincommerce/components';
import { isWCAdmin } from '@fincommerce/navigation';

/**
 * Internal dependencies
 */
import {
	CardHeaderTitle,
	CreateNewCampaignModal,
} from '~/marketing/components';
import { useCampaignTypes, useCampaigns } from '~/marketing/hooks';
import './Campaigns.scss';

const tableCaption = __( 'Campaigns', 'fincommerce' );
const tableHeaders = [
	{
		key: 'campaign',
		label: __( 'Campaign', 'fincommerce' ),
	},
	{
		key: 'cost',
		label: __( 'Cost', 'fincommerce' ),
		isNumeric: true,
	},
	{
		key: 'sales',
		label: __( 'Sales', 'fincommerce' ),
		isNumeric: true,
	},
];

const perPage = 5;

/**
 * Card displaying campaigns in a table.
 *
 * Pagination will be rendered in the card footer if the total number of campaigns is more than one page.
 *
 * If there are no campaigns, there will be no table but an info message instead.
 *
 * If there is an error, there will be no table but an error message instead.
 */
export const Campaigns = () => {
	const [ page, setPage ] = useState( 1 );
	const [ isModalOpen, setModalOpen ] = useState( false );
	const { loading, data, meta } = useCampaigns( page, perPage );
	const { data: dataCampaignTypes } = useCampaignTypes();
	const total = meta?.total;

	const getContent = () => {
		if ( loading ) {
			return (
				<TablePlaceholder
					caption={ tableCaption }
					headers={ tableHeaders }
					numberOfRows={ perPage }
				/>
			);
		}

		if ( ! data ) {
			return (
				<CardBody className="fincommerce-marketing-campaigns-card__content">
					<Icon
						className="fincommerce-marketing-campaigns-card__content-icon fincommerce-marketing-campaigns-card__content-icon--error"
						icon={ cancelCircleFilled }
						size={ 32 }
					/>
					<div className="fincommerce-marketing-campaigns-card__content-title">
						{ __( 'An unexpected error occurred.', 'fincommerce' ) }
					</div>
					<div className="fincommerce-marketing-campaigns-card-body__content-description">
						{ __(
							'Please try again later. Check the logs if the problem persists. ',
							'fincommerce'
						) }
					</div>
				</CardBody>
			);
		}

		if ( data.length === 0 ) {
			return (
				<CardBody className="fincommerce-marketing-campaigns-card__content">
					<Icon
						className="fincommerce-marketing-campaigns-card__content-icon fincommerce-marketing-campaigns-card__content-icon--empty"
						icon={ megaphone }
						size={ 32 }
					/>
					<div className="fincommerce-marketing-campaigns-card__content-title">
						{ __(
							'Advertise with marketing campaigns',
							'fincommerce'
						) }
					</div>
					<div className="fincommerce-marketing-campaigns-card__content-description">
						{ __(
							'Easily create and manage marketing campaigns without leaving FinCommerce.',
							'fincommerce'
						) }
					</div>
				</CardBody>
			);
		}

		return (
			<Table
				caption={ tableCaption }
				headers={ tableHeaders }
				rows={ data.map( ( el ) => {
					return [
						{
							display: (
								<Flex gap={ 4 }>
									<FlexItem className="fincommerce-marketing-campaigns-card__campaign-logo">
										<img
											src={ el.icon }
											alt={ el.channelName }
											width="16"
											height="16"
										/>
									</FlexItem>
									<FlexBlock>
										<Flex direction="column" gap={ 1 }>
											<FlexItem className="fincommerce-marketing-campaigns-card__campaign-title">
												<Link
													type={
														isWCAdmin(
															el.manageUrl
														)
															? 'wc-admin'
															: 'external'
													}
													href={ el.manageUrl }
												>
													{ el.title }
												</Link>
											</FlexItem>
											{ !! el.description && (
												<FlexItem className="fincommerce-marketing-campaigns-card__campaign-description">
													{ el.description }
												</FlexItem>
											) }
										</Flex>
									</FlexBlock>
								</Flex>
							),
						},
						{ display: el.cost },
						{ display: el.sales },
					];
				} ) }
			/>
		);
	};

	const showCreateCampaignButton = !! dataCampaignTypes?.length;
	const showFooter = !! ( total && total > perPage );

	return (
		<Card className="fincommerce-marketing-campaigns-card">
			<CardHeader>
				<CardHeaderTitle>
					{ __( 'Campaigns', 'fincommerce' ) }
				</CardHeaderTitle>
				{ showCreateCampaignButton && (
					<Button
						variant="secondary"
						onClick={ () => setModalOpen( true ) }
					>
						{ __( 'Create new campaign', 'fincommerce' ) }
					</Button>
				) }
				{ isModalOpen && (
					<CreateNewCampaignModal
						onRequestClose={ () => setModalOpen( false ) }
					/>
				) }
			</CardHeader>
			{ getContent() }
			{ showFooter && (
				<CardFooter className="fincommerce-marketing-campaigns-card__footer">
					<Pagination
						showPerPagePicker={ false }
						perPage={ perPage }
						page={ page }
						total={ total }
						onPageChange={ ( newPage: number ) => {
							setPage( newPage );
						} }
					/>
				</CardFooter>
			) }
		</Card>
	);
};
