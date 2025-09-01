/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * Internal dependencies
 */
import { CardBody } from '~/marketing/components';
import './PluginCardBody.scss';

type PluginCardBodyProps = {
	className?: string;
	icon: JSX.Element;
	name: string;

	/**
	 * FinCommerce's Pill component to be rendered beside the name.
	 */
	pills?: Array< JSX.Element >;

	description: React.ReactNode;
	button?: JSX.Element;
};

/**
 * Renders a CardBody layout component to display plugin info and button.
 */
export const PluginCardBody = ( {
	className,
	icon,
	name,
	pills,
	description,
	button,
}: PluginCardBodyProps ) => {
	return (
		<CardBody
			className={ clsx(
				'fincommerce_marketing_plugin_card_body',
				className
			) }
		>
			<div className="fincommerce_marketing_plugin_card_body__icon">
				{ icon }
			</div>
			<div className="fincommerce_marketing_plugin_card_body__details">
				<div className="fincommerce_marketing_plugin_card_body__details-name">
					{ name }
					{ pills }
				</div>
				<div className="fincommerce_marketing_plugin_card_body__details-description">
					{ description }
				</div>
			</div>
			{ button }
		</CardBody>
	);
};
