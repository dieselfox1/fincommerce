/**
 * External dependencies
 */
import clsx from 'clsx';
import { Fragment } from '@finpress/element';
import {
	Card,
	CardHeader,
	CardBody,
	CardMedia,
	CardDivider,
} from '@finpress/components';
import { Text } from '@fincommerce/experimental';

/**
 * Internal dependencies
 */
import './List.scss';

const PlaceholderItem = () => {
	const classes = clsx( 'fincommerce-task-payment', 'fincommerce-task-card' );

	return (
		<Fragment>
			<CardBody
				style={ { paddingLeft: 0, marginBottom: 0 } }
				className={ classes }
			>
				<CardMedia isBorderless>
					<span className="is-placeholder" />
				</CardMedia>
				<div className="fincommerce-task-payment__description">
					<Text as="h3" className="fincommerce-task-payment__title">
						<span className="is-placeholder" />
					</Text>
					<div className="fincommerce-task-payment__content">
						<span className="is-placeholder" />
					</div>
				</div>
				<div className="fincommerce-task-payment__footer">
					<span className="is-placeholder" />
				</div>
			</CardBody>
			<CardDivider />
		</Fragment>
	);
};

export const Placeholder = () => {
	const classes =
		'is-loading fincommerce-payment-gateway-suggestions-list-placeholder';

	return (
		<Card aria-hidden="true" className={ classes }>
			<CardHeader as="h2">
				<span className="is-placeholder" />
			</CardHeader>
			<PlaceholderItem />
			<PlaceholderItem />
			<PlaceholderItem />
		</Card>
	);
};
