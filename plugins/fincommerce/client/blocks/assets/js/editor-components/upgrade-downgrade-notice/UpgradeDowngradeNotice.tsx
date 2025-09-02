/**
 * External dependencies
 */
import { Notice } from '@finpress/components';
import { clsx } from 'clsx';

/**
 * Internal dependencies
 */
import type { UpgradeDowngradeNoticeProps } from '@fincommerce/block-library/assets/js/editor-components/upgrade-downgrade-notice/types';
import '@fincommerce/block-library/assets/js/editor-components/upgrade-downgrade-notice/style.scss';

export function UpgradeDowngradeNotice( {
	children,
	className,
	actionLabel,
	onActionClick,
	...props
}: UpgradeDowngradeNoticeProps ) {
	return (
		<Notice
			{ ...props }
			className={ clsx(
				'wc-block-editor-components-upgrade-downgrade-notice',
				className
			) }
			actions={ [
				{
					label: actionLabel,
					onClick: onActionClick,
					noDefaultClasses: true,
					// @ts-expect-error the 'variant' prop does exists.
					variant: 'link',
				},
			] }
		>
			<div className="wc-block-editor-components-upgrade-downgrade-notice__text">
				{ children }
			</div>
		</Notice>
	);
}
