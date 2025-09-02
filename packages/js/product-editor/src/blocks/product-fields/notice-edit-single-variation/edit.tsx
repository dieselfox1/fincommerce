/**
 * External dependencies
 */
import { createElement, createInterpolateElement } from '@finpress/element';
import { useSelect } from '@finpress/data';
import { Product } from '@fincommerce/data';
import { useWooBlockProps } from '@fincommerce/block-templates';
import { recordEvent } from '@fincommerce/tracks';
import { Link } from '@fincommerce/components';
import { getNewPath } from '@fincommerce/navigation';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore No types for this exist yet.
// eslint-disable-next-line @fincommerce/dependency-group
import { useEntityProp, store as coreStore } from '@finpress/core-data';

/**
 * Internal dependencies
 */
import { Notice } from '../../../components/notice';
import { ProductEditorBlockEditProps } from '../../../types';
import { NoticeBlockAttributes } from './types';
import { useNotice } from '../../../hooks/use-notice';

export function Edit( {
	attributes,
}: ProductEditorBlockEditProps< NoticeBlockAttributes > ) {
	const blockProps = useWooBlockProps( attributes );
	const { content, isDismissible, title, type = 'info' } = attributes;
	const [ parentId ] = useEntityProp< number >(
		'postType',
		'product_variation',
		'parent_id'
	);
	const { dismissedNotices, dismissNotice, isResolving } = useNotice();
	const {
		parentName,
		isParentResolving,
	}: { parentName: string; isParentResolving: boolean } = useSelect(
		( select ) => {
			const { getEditedEntityRecord, hasFinishedResolution } =
				select( coreStore );

			// @ts-expect-error getEditedEntityRecord of coreStore is not typed
			const { name }: Product = getEditedEntityRecord(
				'postType',
				'product',
				parentId
			);
			// @ts-expect-error hasFinishedResolution of coreStore is not typed
			const isResolutionFinished = ! hasFinishedResolution(
				'getEditedEntityRecord',
				[ 'postType', 'product', parentId ]
			);

			return {
				parentName: name || '',
				isParentResolving: isResolutionFinished,
			};
		},
		[ parentId ]
	);

	if (
		dismissedNotices.includes( parentId ) ||
		isResolving ||
		isParentResolving ||
		parentName === ''
	) {
		return null;
	}

	return (
		<div { ...blockProps }>
			<Notice
				title={ title }
				type={ type }
				isDismissible={ isDismissible }
				handleDismiss={ () => {
					recordEvent( 'product_single_variation_notice_dismissed' );
					dismissNotice( parentId );
				} }
			>
				{ createInterpolateElement( content, {
					strong: <strong />,
					noticeLink: (
						<Link
							href={ getNewPath(
								{ tab: 'variations' },
								`/product/${ parentId }`
							) }
							onClick={ () => {
								recordEvent(
									'product_single_variation_notice_click'
								);
							} }
						/>
					),
					parentProductName: <span>{ parentName }</span>,
				} ) }
			</Notice>
		</div>
	);
}
