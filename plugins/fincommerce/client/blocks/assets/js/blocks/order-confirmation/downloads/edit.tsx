/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { Disabled } from '@wordpress/components';
import { __, _x } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/blocks/order-confirmation/downloads/style.scss';

const Edit = (): JSX.Element => {
	const blockProps = useBlockProps( {
		className: 'wc-block-order-confirmation-downloads',
	} );

	const {
		borderBottomColor,
		borderLeftColor,
		borderRightColor,
		borderTopColor,
		borderWidth,
	} = blockProps.style;

	const borderStyles = {
		borderBottomColor,
		borderLeftColor,
		borderRightColor,
		borderTopColor,
		borderWidth,
	} as React.CSSProperties;

	return (
		<div { ...blockProps }>
			<Disabled>
				<table
					style={ borderStyles }
					cellSpacing="0"
					className="wc-block-order-confirmation-downloads__table"
				>
					<thead>
						<tr>
							<th className="download-product">
								<span className="nobr">
									{ __( 'Product', 'fincommerce' ) }
								</span>
							</th>
							<th className="download-remaining">
								<span className="nobr">
									{ __(
										'Downloads remaining',
										'fincommerce'
									) }
								</span>
							</th>
							<th className="download-expires">
								<span className="nobr">
									{ __( 'Expires', 'fincommerce' ) }
								</span>
							</th>
							<th className="download-file">
								<span className="nobr">
									{ __( 'Download', 'fincommerce' ) }
								</span>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td
								className="download-product"
								data-title="Product"
							>
								<a href="https://example.com">
									{ _x(
										'Test Product',
										'sample product name',
										'fincommerce'
									) }
								</a>
							</td>
							<td
								className="download-remaining"
								data-title="Downloads remaining"
							>
								{ _x(
									'∞',
									'infinite downloads remaining',
									'fincommerce'
								) }
							</td>
							<td
								className="download-expires"
								data-title="Expires"
							>
								{ _x(
									'Never',
									'download expires',
									'fincommerce'
								) }
							</td>
							<td className="download-file" data-title="Download">
								<a
									href="https://example.com"
									className="fincommerce-MyAccount-downloads-file button alt"
								>
									{ _x(
										'Test Download',
										'sample download name',
										'fincommerce'
									) }
								</a>
							</td>
						</tr>
					</tbody>
				</table>
			</Disabled>
		</div>
	);
};

export default Edit;
