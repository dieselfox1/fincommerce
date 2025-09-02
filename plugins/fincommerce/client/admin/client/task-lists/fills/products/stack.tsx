/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { List, Link, Spinner } from '@fincommerce/components';
import { Text } from '@fincommerce/experimental';
import interpolateComponents from '@automattic/interpolate-components';
import { getAdminLink } from '@fincommerce/settings';
import { recordEvent } from '@fincommerce/tracks';

/**
 * Internal dependencies
 */
import { ProductType } from './constants';
import './stack.scss';
import useRecordCompletionTime from '../use-record-completion-time';

type StackProps = StackWithLoadSampleBlurb | StackWithoutText;

type StackWithLoadSampleBlurb = {
	items: ( ProductType & {
		onClick: () => void;
	} )[];
	onClickLoadSampleProduct: () => void;
	showOtherOptions?: boolean;
	isTaskListItemClicked?: boolean;
};

type StackWithoutText = {
	items: ( ProductType & {
		onClick: () => void;
	} )[];
	showOtherOptions: false;
	onClickLoadSampleProduct?: () => void;
	isTaskListItemClicked?: boolean;
};

const Stack = ( {
	items,
	onClickLoadSampleProduct = () => {},
	showOtherOptions = true,
	isTaskListItemClicked = false,
}: StackProps ) => {
	const { recordCompletionTime } = useRecordCompletionTime( 'products' );

	return (
		<div className="fincommerce-products-stack">
			{ isTaskListItemClicked && (
				<div className="fincommerce-stack__overlay-spinner">
					<Spinner className="list-overlay" />
				</div>
			) }
			<List items={ items } />
			{ showOtherOptions && (
				<Text className="fincommerce-stack__other-options">
					{ interpolateComponents( {
						mixedString: __(
							'Can’t find your product type? {{sbLink}}Start Blank{{/sbLink}} or {{LspLink}}Load Sample Products{{/LspLink}} to see what they look like in your store.',
							'fincommerce'
						),
						components: {
							sbLink: (
								<Link
									onClick={ () => {
										recordEvent( 'tasklist_add_product', {
											method: 'manually',
										} );
										recordCompletionTime();
										window.location.href = getAdminLink(
											'post-new.php?post_type=product&wc_onboarding_active_task=products&tutorial=true'
										);
										return false;
									} }
									href=""
									type="wc-admin"
								>
									<></>
								</Link>
							),
							LspLink: (
								<Link
									href=""
									type="wc-admin"
									onClick={ () => {
										onClickLoadSampleProduct();
										return false;
									} }
								>
									<></>
								</Link>
							),
						},
					} ) }
				</Text>
			) }
		</div>
	);
};

export default Stack;
