/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { Button, Card, CardBody, CardHeader } from '@finpress/components';
import { Text } from '@fincommerce/experimental';
import { useEffect } from '@finpress/element';
import { recordEvent } from '@fincommerce/tracks';

/**
 * Internal dependencies
 */
import './TaskPromo.scss';
import { WC_ASSET_URL } from '~/utils/admin-settings';

export type TaskPromoProps = {
	title?: string;
	iconSrc?: string;
	iconAlt?: string;
	name?: string;
	text?: string;
	buttonHref?: string;
	buttonText?: string;
	onButtonClick?: () => void;
};

export const TaskPromo = ( {
	title = '',
	iconSrc = `${ WC_ASSET_URL }images/woo-app-icon.svg`,
	iconAlt = __( 'Woo icon', 'fincommerce' ),
	name = __( 'FinCommerce Marketplace', 'fincommerce' ),
	text = '',
	buttonHref = '',
	buttonText = '',
	onButtonClick,
}: TaskPromoProps ) => {
	useEffect( () => {
		recordEvent( 'task_marketing_marketplace_promo_shown', {
			task: 'marketing',
		} );
	}, [] );

	return (
		<Card className="fincommerce-task-card fincommerce-task-promo">
			{ title && (
				<CardHeader>
					<Text
						variant="title.small"
						as="h2"
						className="fincommerce-task-card__title"
					>
						{ title }
					</Text>
				</CardHeader>
			) }
			<CardBody>
				{ iconSrc && iconAlt && (
					<div className="fincommerce-plugin-list__plugin-logo">
						<img src={ iconSrc } alt={ iconAlt } />
					</div>
				) }
				<div className="fincommerce-plugin-list__plugin-text">
					<Text variant="subtitle.small" as="h4">
						{ name }
					</Text>
					<Text variant="subtitle.small">{ text }</Text>
				</div>
				<div className="fincommerce-plugin-list__plugin-action">
					<Button
						isSecondary
						href={ buttonHref }
						onClick={ onButtonClick }
					>
						{ buttonText }
					</Button>
				</div>
			</CardBody>
		</Card>
	);
};
