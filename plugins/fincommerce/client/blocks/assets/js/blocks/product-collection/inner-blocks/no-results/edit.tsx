/**
 * External dependencies
 */
import { useBlockProps, InnerBlocks } from '@finpress/block-editor';
import { Template } from '@finpress/blocks';
import { __ } from '@finpress/i18n';

const TEMPLATE: Template[] = [
	[
		'core/group',
		{
			layout: {
				type: 'flex',
				orientation: 'vertical',
				justifyContent: 'center',
				flexWrap: 'wrap',
			},
		},
		[
			[
				'core/paragraph',
				{
					textAlign: 'center',
					fontSize: 'medium',
					content: `<strong>${ __(
						'No results found',
						'fincommerce'
					) }</strong>`,
				},
			],
			[
				'core/paragraph',
				{
					content: `${ __(
						'You can try',
						'fincommerce'
					) } <a href="#" class="wc-link-clear-any-filters">${ __(
						'clearing any filters',
						'fincommerce'
					) }</a> ${ __(
						'or head to our',
						'fincommerce'
					) } <a href="#" class="wc-link-stores-home">${ __(
						"store's home",
						'fincommerce'
					) }</a>`,
				},
			],
		],
	],
];

const Edit = () => {
	const blockProps = useBlockProps( {
		className: 'wc-block-product-collection-no-results',
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks template={ TEMPLATE } />
		</div>
	);
};

export default Edit;
