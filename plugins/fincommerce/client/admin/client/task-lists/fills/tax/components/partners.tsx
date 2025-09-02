/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { Button, Card, CardBody, CardHeader } from '@finpress/components';
import { Children } from '@finpress/element';
import clsx from 'clsx';
import { getAdminLink } from '@fincommerce/settings';

/**
 * Internal dependencies
 */
import { TaxChildProps } from '../utils';
import { TrackedLink } from '~/components/tracked-link/tracked-link';
import './partners.scss';
import { isFeatureEnabled } from '~/utils/features';

export const Partners = ( {
	children,
	isPending,
	onManual,
	onDisable,
}: TaxChildProps ) => {
	const classes = clsx(
		'fincommerce-task-card',
		'fincommerce-tax-partners',
		`fincommerce-tax-partners__partners-count-${ Children.count(
			children
		) }`
	);
	return (
		<>
			<Card className={ classes }>
				<CardHeader>
					{ __( 'Choose a tax partner', 'fincommerce' ) }
				</CardHeader>
				<CardBody>
					<div className="fincommerce-tax-partners__partners">
						{ children }
					</div>
					<ul className="fincommerce-tax-partners__other-actions">
						<li>
							<Button
								isTertiary
								disabled={ isPending }
								isBusy={ isPending }
								onClick={ () => {
									onManual();
								} }
							>
								{ __( 'Set up taxes manually', 'fincommerce' ) }
							</Button>
						</li>
						<li>
							<Button
								isTertiary
								disabled={ isPending }
								isBusy={ isPending }
								onClick={ () => {
									onDisable();
								} }
							>
								{ __(
									'I don’t charge sales tax',
									'fincommerce'
								) }
							</Button>
						</li>
					</ul>
				</CardBody>
			</Card>
			<TrackedLink
				textProps={ {
					as: 'div',
					className:
						'fincommerce-task-dashboard__container fincommerce-task-marketplace-link',
				} }
				message={ __(
					// translators: {{Link}} is a placeholder for a html element.
					'Visit {{Link}}the FinCommerce Marketplace{{/Link}} to find more tax solutions.',
					'fincommerce'
				) }
				eventName="tasklist_tax_visit_marketplace_click"
				targetUrl={
					isFeatureEnabled( 'marketplace' )
						? getAdminLink(
								'admin.php?page=wc-admin&tab=extensions&path=/extensions&category=operations'
						  )
						: 'https://fincommerce.com/product-category/fincommerce-extensions/operations/'
				}
				linkType={
					isFeatureEnabled( 'marketplace' ) ? 'wc-admin' : 'external'
				}
			/>
		</>
	);
};
