/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { useState } from '@finpress/element';
import {
	Button,
	Modal,
	Icon,
	Flex,
	FlexBlock,
	FlexItem,
} from '@finpress/components';
import { chevronUp, chevronDown, external } from '@finpress/icons';
import clsx from 'clsx';

/**
 * Internal dependencies
 */
import {
	useRecommendedChannels,
	useCampaignTypes,
	useRegisteredChannels,
	useInstalledPluginsWithoutChannels,
} from '~/marketing/hooks';
import { SmartPluginCardBody } from '~/marketing/components';
import './CreateNewCampaignModal.scss';

const isExternalURL = ( url: string ) =>
	new URL( url ).origin !== location.origin;

/**
 * Props for CreateNewCampaignModal, which is based on Modal.
 *
 * Modal's title and children props are omitted because they are specified within the component
 * and not needed to be specified by the consumer.
 */
type CreateCampaignModalProps = Omit<
	React.ComponentProps< typeof Modal >,
	'title' | 'children'
>;

export const CreateNewCampaignModal = ( props: CreateCampaignModalProps ) => {
	const { className, ...restProps } = props;
	const [ collapsed, setCollapsed ] = useState( true );
	const { data: campaignTypes, refetch: refetchCampaignTypes } =
		useCampaignTypes();
	const { refetch: refetchRegisteredChannels } = useRegisteredChannels();
	const { data: recommendedChannels } = useRecommendedChannels();
	const { loadInstalledPluginsAfterActivation } =
		useInstalledPluginsWithoutChannels();

	const hasCampaignTypes = !! campaignTypes?.length;
	const hasRecommendedChannels = !! recommendedChannels?.length;

	const onInstalledAndActivated = ( pluginSlug: string ) => {
		refetchCampaignTypes();
		refetchRegisteredChannels();
		loadInstalledPluginsAfterActivation( pluginSlug );
	};

	return (
		<Modal
			{ ...restProps }
			className={ clsx(
				className,
				'fincommerce-marketing-create-campaign-modal'
			) }
			title={ __( 'Create a new campaign', 'fincommerce' ) }
		>
			<div className="fincommerce-marketing-new-campaigns">
				<div className="fincommerce-marketing-new-campaigns__question-label">
					{ hasCampaignTypes
						? __(
								'Where would you like to promote your products?',
								'fincommerce'
						  )
						: __( 'No campaign types found.', 'fincommerce' ) }
				</div>
				{ campaignTypes?.map( ( el ) => (
					<Flex
						key={ el.id }
						className="fincommerce-marketing-new-campaign-type"
						gap={ 4 }
					>
						<FlexItem>
							<img
								src={ el.icon }
								alt={ el.name }
								width="32"
								height="32"
							/>
						</FlexItem>
						<FlexBlock>
							<Flex direction="column" gap={ 1 }>
								<FlexItem className="fincommerce-marketing-new-campaign-type__name">
									{ el.name }
								</FlexItem>
								<FlexItem className="fincommerce-marketing-new-campaign-type__description">
									{ el.description }
								</FlexItem>
							</Flex>
						</FlexBlock>
						<FlexItem>
							<Button
								variant="secondary"
								href={ el.createUrl }
								target={
									isExternalURL( el.createUrl )
										? '_blank'
										: '_self'
								}
							>
								<Flex gap={ 1 }>
									<FlexItem>
										{ __( 'Create', 'fincommerce' ) }
									</FlexItem>
									{ isExternalURL( el.createUrl ) && (
										<FlexItem>
											<Icon
												icon={ external }
												size={ 16 }
											/>
										</FlexItem>
									) }
								</Flex>
							</Button>
						</FlexItem>
					</Flex>
				) ) }
			</div>
			{ hasRecommendedChannels && (
				<div className="fincommerce-marketing-add-channels">
					<Flex direction="column">
						<FlexItem>
							<Button
								variant="link"
								onClick={ () => setCollapsed( ! collapsed ) }
							>
								{ __(
									'Add channels for other campaign types',
									'fincommerce'
								) }
								<Icon
									icon={ collapsed ? chevronDown : chevronUp }
									size={ 24 }
								/>
							</Button>
						</FlexItem>
						{ ! collapsed && (
							<FlexItem>
								{ recommendedChannels.map( ( el ) => (
									<SmartPluginCardBody
										key={ el.plugin }
										plugin={ el }
										onInstalledAndActivated={
											onInstalledAndActivated
										}
									/>
								) ) }
							</FlexItem>
						) }
					</Flex>
				</div>
			) }
		</Modal>
	);
};
