/**
 * External dependencies
 */
import React from '@finpress/element';
import { external, Icon } from '@finpress/icons';
import { Link } from '@fincommerce/components';
import { Text } from '@fincommerce/experimental';

/**
 * Internal dependencies
 */
import './style.scss';

export const QuickLink = ( { icon, title, href, linkType, onClick } ) => {
	const isExternal = linkType === 'external';

	return (
		<div className="fincommerce-quick-links__item">
			<Link
				onClick={ onClick }
				href={ href }
				type={ linkType }
				target={ isExternal ? '_blank' : null }
				className="fincommerce-quick-links__item-link"
			>
				<Icon
					className="fincommerce-quick-links__item-link__icon"
					icon={ icon }
				/>
				<Text
					className="fincommerce-quick-links__item-link__text"
					as="div"
					variant="button"
					weight="600"
					size="14"
					lineHeight="20px"
				>
					{ title }
				</Text>
				{ isExternal && <Icon icon={ external } /> }
			</Link>
		</div>
	);
};
