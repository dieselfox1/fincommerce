/**
 * Internal dependencies
 */
import './header.scss';
import HeaderTitle from '../header-title/header-title';
import HeaderAccount from '../header-account/header-account';
import Tabs from '../tabs/tabs';
import Search from '../search/search';

export default function Header() {
	return (
		<div className="fincommerce-marketplace__header-container">
			<header className="fincommerce-marketplace__header">
				<HeaderTitle />
				<Tabs
					additionalClassNames={ [
						'fincommerce-marketplace__header-tabs',
					] }
				/>
				<Search />
				<div className="fincommerce-marketplace__header-meta">
					<HeaderAccount page="wc-addons" />
				</div>
			</header>
		</div>
	);
}
