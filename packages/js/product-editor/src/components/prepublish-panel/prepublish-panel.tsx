/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { createElement, Fragment, useRef, useEffect } from '@finpress/element';
import { Button } from '@finpress/components';
import { useDispatch } from '@finpress/data';
import { recordEvent } from '@fincommerce/tracks';
import { useEntityProp } from '@finpress/core-data';
import { closeSmall } from '@finpress/icons';
import clsx from 'clsx';
import type { Product } from '@fincommerce/data';
import { isInTheFuture } from '@finpress/date';

/**
 * Internal dependencies
 */
import { PublishButton } from '../header/publish-button';
import { PrepublishPanelProps } from './types';
import { wooProductEditorUiStore } from '../../store/product-editor-ui';
import { TRACKS_SOURCE } from '../../constants';
import { VisibilitySection } from './visibility-section';
import { ScheduleSection } from './schedule-section';
import { PostPublishSection, PostPublishTitle } from './post-publish';

export function PrepublishPanel( {
	productType = 'product',
	title = __( 'Are you ready to publish this product?', 'fincommerce' ),
	description = __(
		'Double-check your settings before sharing this product with customers.',
		'fincommerce'
	),
}: PrepublishPanelProps ) {
	const [ editedDate ] = useEntityProp< string >(
		'postType',
		productType,
		'date_created_gmt'
	);

	const [ productStatus, , prevStatus ] = useEntityProp<
		Product[ 'status' ]
	>( 'postType', productType, 'status' );

	const { closePrepublishPanel } = useDispatch( wooProductEditorUiStore );

	const isPublishedOrScheduled =
		productType === 'product' && prevStatus !== 'future'
			? productStatus === 'publish'
			: true;

	if ( isInTheFuture( editedDate ) ) {
		title = __( 'Are you ready to schedule this product?', 'fincommerce' );
		description = __(
			'Your product will be published at the specified date and time.',
			'fincommerce'
		);
	}
	const panelRef = useRef< HTMLDivElement >( null );

	function handleClickOutside( event: MouseEvent ) {
		if (
			panelRef.current &&
			! panelRef.current.contains( event.target as Node )
		) {
			closePrepublishPanel();
		}
	}

	useEffect( () => {
		if ( ! isPublishedOrScheduled ) {
			return;
		}
		document.addEventListener( 'mouseup', handleClickOutside );
		return () => {
			document.removeEventListener( 'mouseup', handleClickOutside );
		};
	}, [ isPublishedOrScheduled ] );

	function getHeaderActions() {
		if ( isPublishedOrScheduled ) {
			return (
				<Button
					className="fincommerce-publish-panel-close"
					icon={ closeSmall }
					label={ __( 'Close panel', 'fincommerce' ) }
					onClick={ () => {
						recordEvent( 'product_prepublish_panel', {
							source: TRACKS_SOURCE,
							action: 'close',
						} );
						closePrepublishPanel();
					} }
				/>
			);
		}
		return (
			<>
				<PublishButton productType={ productType } />
				<Button
					variant={ 'secondary' }
					onClick={ () => {
						recordEvent( 'product_prepublish_panel', {
							source: TRACKS_SOURCE,
							action: 'cancel',
						} );
						closePrepublishPanel();
					} }
				>
					{ __( 'Cancel', 'fincommerce' ) }
				</Button>
			</>
		);
	}

	function getPanelTitle() {
		if ( isPublishedOrScheduled ) {
			return <PostPublishTitle productType={ productType } />;
		}
		return (
			<>
				<h4>{ title }</h4>
				<span>{ description }</span>
			</>
		);
	}

	function getPanelSections() {
		if ( isPublishedOrScheduled ) {
			return <PostPublishSection postType={ productType } />;
		}
		return (
			<>
				<VisibilitySection productType={ productType } />
				<ScheduleSection postType={ productType } />
			</>
		);
	}

	return (
		<div
			ref={ panelRef }
			className={ clsx( 'fincommerce-product-publish-panel', {
				'is-published': isPublishedOrScheduled,
			} ) }
		>
			<div className="fincommerce-product-publish-panel__header">
				{ getHeaderActions() }
			</div>
			<div className="fincommerce-product-publish-panel__title">
				{ getPanelTitle() }
			</div>
			<div className="fincommerce-product-publish-panel__content">
				{ getPanelSections() }
			</div>
			<div className="fincommerce-product-publish-panel__footer" />
		</div>
	);
}
