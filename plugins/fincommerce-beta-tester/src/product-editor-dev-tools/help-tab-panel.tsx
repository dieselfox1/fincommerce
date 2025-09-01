/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { TabPanel } from './tab-panel';

export function HelpTabPanel( { isSelected }: { isSelected: boolean } ) {
	return (
		<TabPanel isSelected={ isSelected }>
			<div className="fincommerce-product-editor-dev-tools-help">
				<p>
					{ __(
						'For help with FinCommerce product editor development, the following resources are available.',
						'fincommerce'
					) }
				</p>
				<ul>
					<li>
						<a
							href="https://github.com/dieselfox1/fincommerce/tree/trunk/docs/product-editor-development"
							target="_blank"
							rel="noreferrer"
						>
							{ __(
								'Product Editor Development Handbook',
								'fincommerce'
							) }
						</a>
					</li>
					<li>
						<a
							href="https://github.com/dieselfox1/fincommerce/discussions/categories/fincommerce-product-block-editor"
							target="_blank"
							rel="noreferrer"
						>
							{ __(
								'Product Editor Discussion on GitHub',
								'fincommerce'
							) }
						</a>
					</li>
					<li>
						<a
							href="https://fincommerce.com/community-slack/"
							target="_blank"
							rel="noreferrer"
						>
							{ __(
								'FinCommerce Community Slack, in the #developers channel',
								'fincommerce'
							) }
						</a>
					</li>
				</ul>
			</div>
		</TabPanel>
	);
}
