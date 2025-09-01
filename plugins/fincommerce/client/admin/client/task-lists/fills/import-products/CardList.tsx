/**
 * External dependencies
 */
import { List } from '@fincommerce/components';

/**
 * Internal dependencies
 */
import './cards.scss';

type Card = {
	key: string;
	title: string;
	content: string | JSX.Element;
	before: JSX.Element;
};

type CardListProps = {
	items: Card[];
};

const CardList = ( { items }: CardListProps ) => {
	return (
		<div className="fincommerce-products-card-list">
			<List items={ items } />
		</div>
	);
};

export default CardList;
