/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { Icon, external } from '@finpress/icons';
import { VisuallyHidden } from '@finpress/components';
import { sanitizeHTML } from '@fincommerce/utils';
import { Alert } from '@fincommerce/icons';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/editor-components/external-link-card/editor.scss';

export interface ExternalLinkCardProps {
	href: string;
	title: string;
	description?: string;
	warning?: string;
}

/**
 * Show a link that displays a title, description, and an icon showing that the link is external.
 * Links are opened in a new tab.
 */
const ExternalLinkCard = ( {
	href,
	title,
	description,
	warning,
}: ExternalLinkCardProps ): JSX.Element => {
	return (
		<a
			href={ href }
			className="wc-block-editor-components-external-link-card"
			target="_blank"
			rel="noreferrer"
		>
			<span className="wc-block-editor-components-external-link-card__content">
				<strong className="wc-block-editor-components-external-link-card__title">
					{ title }
				</strong>
				{ description && (
					<span
						className="wc-block-editor-components-external-link-card__description"
						dangerouslySetInnerHTML={ {
							__html: sanitizeHTML( description ),
						} }
					></span>
				) }
				{ warning ? (
					<span className="wc-block-editor-components-external-link-card__warning">
						<Icon icon={ <Alert status="error" /> } />
						<span>{ warning }</span>
					</span>
				) : null }
			</span>
			<VisuallyHidden as="span">
				{
					/* translators: accessibility text */
					__( '(opens in a new tab)', 'fincommerce' )
				}
			</VisuallyHidden>
			<Icon
				icon={ external }
				className="wc-block-editor-components-external-link-card__icon"
			/>
		</a>
	);
};

export default ExternalLinkCard;
