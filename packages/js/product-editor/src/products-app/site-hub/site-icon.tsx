/**
 * External dependencies
 */
import { createElement } from '@finpress/element';
import { useSelect } from '@finpress/data';
import { Icon } from '@finpress/components';
import { __ } from '@finpress/i18n';
import { finpress } from '@finpress/icons';
import { store as coreDataStore } from '@finpress/core-data';
import clsx from 'clsx';

type SiteIconProps = {
	className: string;
};

function SiteIcon( { className }: SiteIconProps ) {
	const { isRequestingSite, siteIconUrl } = useSelect( ( select ) => {
		const { getEntityRecord } = select( coreDataStore );
		// @ts-expect-error Selector is not right typed with '__unstableBase'
		const siteData = getEntityRecord( 'root', '__unstableBase' ) as
			| { site_icon_url?: string }
			| undefined;

		return {
			isRequestingSite: ! siteData,
			siteIconUrl: siteData?.site_icon_url,
		};
	}, [] );

	if ( isRequestingSite && ! siteIconUrl ) {
		return <div className="edit-site-site-icon__image" />;
	}

	const icon = siteIconUrl ? (
		<img
			className="edit-site-site-icon__image"
			alt={ __( 'Site Icon', 'fincommerce' ) }
			src={ siteIconUrl }
		/>
	) : (
		<Icon
			className="edit-site-site-icon__icon"
			icon={ finpress }
			size={ 48 }
		/>
	);

	return (
		<div className={ clsx( className, 'edit-site-site-icon' ) }>
			{ icon }
		</div>
	);
}

export default SiteIcon;
