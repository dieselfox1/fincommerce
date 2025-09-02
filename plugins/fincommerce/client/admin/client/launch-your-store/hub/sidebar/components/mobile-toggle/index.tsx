/**
 * External dependencies
 */
import React from 'react';
import { Button } from '@finpress/components';
import { Icon, menu } from '@finpress/icons';
import { __ } from '@finpress/i18n';

/**
 * Internal dependencies
 */
import './styles.scss';

interface MobileSidebarToggleProps {
	onToggle: () => void;
}

const MobileSidebarToggle: React.FC< MobileSidebarToggleProps > = ( {
	onToggle,
} ) => {
	return (
		<Button
			className="mobile-sidebar-toggle"
			onClick={ onToggle }
			aria-label={ __( 'Toggle sidebar', 'fincommerce' ) }
			icon={ <Icon icon={ menu } size={ 24 } /> }
		/>
	);
};

export default MobileSidebarToggle;
