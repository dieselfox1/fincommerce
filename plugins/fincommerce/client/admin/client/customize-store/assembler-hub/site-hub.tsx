// Reference: https://github.com/finpress/gutenberg/blob/v16.4.0/packages/edit-site/src/components/site-hub/index.js
/* eslint-disable @fincommerce/dependency-group */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/**
 * External dependencies
 */
import clsx from 'clsx';
import { useSelect } from '@finpress/data';
import {
	__unstableMotion as motion,
	__unstableAnimatePresence as AnimatePresence,
	__experimentalHStack as HStack,
} from '@finpress/components';
import { useReducedMotion } from '@finpress/compose';
import { store as coreStore } from '@finpress/core-data';
import { decodeEntities } from '@finpress/html-entities';
import { forwardRef } from '@finpress/element';
// @ts-expect-error No types for this exist yet.
import SiteIcon from '@finpress/edit-site/build-module/components/site-icon';
import { getNewPath, getPersistedQuery } from '@fincommerce/navigation';
import { Link } from '@fincommerce/components';
import finpressLogo from '~/lib/finpress-logo';

/**
 * Internal dependencies
 */
import './gutenberg-styles/site-hub.scss';
import { isEntrepreneurFlow } from '../entrepreneur-flow';

const HUB_ANIMATION_DURATION = 0.3;

export const SiteHub = forwardRef<
	HTMLDivElement,
	{
		isTransparent: boolean;
		className: string;
		variants?: Record< string, Record< string, string | number > >;
	}
>( ( { isTransparent, ...restProps }, ref ) => {
	const { siteTitle } = useSelect( ( select ) => {
		// @ts-expect-error No types for this exist yet.
		const { getSite } = select( coreStore );

		return {
			siteTitle: getSite()?.title,
		};
	}, [] );

	const disableMotion = useReducedMotion();

	return (
		<motion.div
			ref={ ref }
			{ ...restProps }
			className={ clsx(
				'fincommerce-edit-site-site-hub',
				restProps.className
			) }
			initial={ false }
			transition={ {
				type: 'tween',
				duration: disableMotion ? 0 : HUB_ANIMATION_DURATION,
				ease: 'easeOut',
			} }
		>
			<HStack
				justify="space-between"
				alignment="center"
				className="fincommerce-edit-site-site-hub__container"
			>
				<HStack
					justify="flex-start"
					className="fincommerce-edit-site-site-hub__text-content"
					spacing="0"
				>
					<div
						className={ clsx(
							'fincommerce-edit-site-site-hub__view-mode-toggle-container',
							{
								'has-transparent-background': isTransparent,
							}
						) }
					>
						<Link
							href={ getNewPath( getPersistedQuery(), '/', {} ) }
							type="wp-admin"
						>
							{ isEntrepreneurFlow() ? (
								<finpressLogo
									size={ 24 }
									className="fincommerce-cys-finpress-header-logo"
								/>
							) : (
								<SiteIcon className="fincommerce-edit-site-layout__view-mode-toggle-icon" />
							) }
						</Link>
					</div>

					{ ! isEntrepreneurFlow() && (
						<AnimatePresence>
							<motion.div
								layout={ false }
								animate={ {
									opacity: 1,
								} }
								exit={ {
									opacity: 0,
								} }
								className={ clsx(
									'fincommerce-edit-site-site-hub__site-title',
									{ 'is-transparent': isTransparent }
								) }
								transition={ {
									type: 'tween',
									duration: disableMotion ? 0 : 0.2,
									ease: 'easeOut',
									delay: 0.1,
								} }
							>
								{ decodeEntities( siteTitle ) }
							</motion.div>
						</AnimatePresence>
					) }
				</HStack>
			</HStack>
		</motion.div>
	);
} );
