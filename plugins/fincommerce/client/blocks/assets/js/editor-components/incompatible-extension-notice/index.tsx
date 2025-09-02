/**
 * External dependencies
 */
import { __, _n, sprintf } from '@finpress/i18n';
import { Notice, ExternalLink } from '@finpress/components';
import { createInterpolateElement } from '@finpress/element';
import { Alert } from '@fincommerce/icons';
import { Icon, chevronDown } from '@finpress/icons';

/**
 * Internal dependencies
 */
import { useCombinedIncompatibilityNotice } from '@fincommerce/block-library/assets/js/editor-components/incompatible-extension-notice/use-combined-incompatibility-notice';
import { SwitchToClassicShortcodeButton } from '@fincommerce/block-library/assets/js/editor-components/switch-to-classic-shortcode-button';
import '@fincommerce/block-library/assets/js/editor-components/incompatible-extension-notice/editor.scss';

interface ExtensionNoticeProps {
	block: 'fincommerce/cart' | 'fincommerce/checkout';
	clientId: string;
}

/**
 * Shows a notice when there are incompatible extensions.
 *
 * Tracks events:
 * - switch_to_classic_shortcode_click
 * - switch_to_classic_shortcode_confirm
 * - switch_to_classic_shortcode_cancel
 * - switch_to_classic_shortcode_undo
 */
export function IncompatibleExtensionsNotice( {
	block,
	clientId,
}: ExtensionNoticeProps ) {
	const [
		isVisible,
		dismissNotice,
		incompatibleExtensions,
		incompatibleExtensionsCount,
	] = useCombinedIncompatibilityNotice( block );

	if ( ! isVisible ) {
		return null;
	}

	const noticeContent = (
		<>
			{ incompatibleExtensionsCount > 1
				? createInterpolateElement(
						__(
							'Some active extensions do not yet support this block. This may impact the shopper experience. <a>Learn more</a>',
							'fincommerce'
						),
						{
							a: (
								<ExternalLink href="https://fincommerce.com/document/fincommerce-store-editing/customizing-cart-and-checkout/#incompatible-extensions/" />
							),
						}
				  )
				: createInterpolateElement(
						sprintf(
							// translators: %s is the name of the extension.
							__(
								'<strong>%s</strong> does not yet support this block. This may impact the shopper experience. <a>Learn more</a>',
								'fincommerce'
							),
							Object.values( incompatibleExtensions )[ 0 ]
						),
						{
							strong: <strong />,
							a: (
								<ExternalLink href="https://fincommerce.com/document/fincommerce-store-editing/customizing-cart-and-checkout/#incompatible-extensions/" />
							),
						}
				  ) }
		</>
	);

	const entries = Object.entries( incompatibleExtensions );
	const remainingEntries = entries.length - 2;

	return (
		<Notice
			className="wc-blocks-incompatible-extensions-notice"
			status={ 'warning' }
			onRemove={ dismissNotice }
			spokenMessage={ noticeContent }
		>
			<div className="wc-blocks-incompatible-extensions-notice__content">
				<Icon
					className="wc-blocks-incompatible-extensions-notice__warning-icon"
					icon={ <Alert /> }
				/>
				<div>
					<p>{ noticeContent }</p>
					{ incompatibleExtensionsCount > 1 && (
						<ul>
							{ entries.slice( 0, 2 ).map( ( [ id, title ] ) => (
								<li
									key={ id }
									className="wc-blocks-incompatible-extensions-notice__element"
								>
									{ title }
								</li>
							) ) }
						</ul>
					) }

					{ entries.length > 2 && (
						<details>
							<summary>
								<span>
									{ sprintf(
										// translators: %s is the number of incompatible extensions.
										_n(
											'%s more incompatibility',
											'%s more incompatibilities',
											remainingEntries,
											'fincommerce'
										),
										remainingEntries
									) }
								</span>
								<Icon icon={ chevronDown } />
							</summary>
							<ul>
								{ entries.slice( 2 ).map( ( [ id, title ] ) => (
									<li
										key={ id }
										className="wc-blocks-incompatible-extensions-notice__element"
									>
										{ title }
									</li>
								) ) }
							</ul>
						</details>
					) }
					<SwitchToClassicShortcodeButton
						block={ block }
						clientId={ clientId }
						type={ 'incompatible' }
					/>
				</div>
			</div>
		</Notice>
	);
}
