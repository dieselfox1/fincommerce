/**
 * External dependencies
 */
import { useBlockProps } from '@finpress/block-editor';
import { __ } from '@finpress/i18n';
import NoticeBanner from '@fincommerce/base-components/notice-banner';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/blocks/store-notices/editor.scss';

const Edit = (): JSX.Element => {
	const blockProps = useBlockProps( {
		className: 'wc-block-store-notices',
	} );

	return (
		<div { ...blockProps }>
			<NoticeBanner status="info" isDismissible={ false }>
				{ __(
					'Notices added by FinCommerce or extensions will show up here.',
					'fincommerce'
				) }
			</NoticeBanner>
		</div>
	);
};

export default Edit;
