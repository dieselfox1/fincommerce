/**
 * External dependencies
 */
import { createElement } from '@finpress/element';
import { __ } from '@finpress/i18n';
import { __experimentalTooltip as Tooltip } from '@fincommerce/components';

/**
 * Internal dependencies
 */
import { SectionHeaderProps } from './types';
import { sanitizeHTML } from '../../utils/sanitize-html';
import { BlockSlot } from '../block-slot-fill';

export function SectionHeader( {
	description,
	sectionTagName,
	title,
}: SectionHeaderProps ) {
	const HeadingTagName = sectionTagName === 'fieldset' ? 'legend' : 'div';

	return (
		<HeadingTagName className="wp-block-fincommerce-product-section-header__heading">
			<div className="wp-block-fincommerce-product-section-header__heading-title-wrapper">
				<h2 className="wp-block-fincommerce-product-section-header__heading-title">
					{ title }
					{ description && (
						<Tooltip
							className="wp-block-fincommerce-product-section-header__heading-tooltip"
							text={
								<p
									className="wp-block-fincommerce-product-section-header__heading-description"
									dangerouslySetInnerHTML={ sanitizeHTML(
										description
									) }
								/>
							}
							position={ 'bottom center' }
							helperText={ __(
								'View helper text',
								'fincommerce'
							) }
						/>
					) }
				</h2>

				<div className="wp-block-fincommerce-product-section-header__actions">
					<BlockSlot name={ `section-actions` } />
				</div>
			</div>
			<BlockSlot name={ `section-description` } />
		</HeadingTagName>
	);
}
