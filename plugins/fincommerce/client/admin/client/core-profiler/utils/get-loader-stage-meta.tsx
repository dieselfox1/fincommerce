/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';

/**
 * Internal dependencies
 */
import LightBulbImage from '../assets/images/loader-lightbulb.svg';
import DevelopingImage from '../assets/images/loader-developing.svg';
import LayoutImage from '../assets/images/loader-layout.svg';
import OpeningTheDoorsImage from '../assets/images/loader-openingthedoors.svg';
import Hearticon from '../assets/images/loader-hearticon.svg';

import { Stages } from '../components/loader/Loader';

const LightbulbStage = {
	title: __( 'Turning on the lights', 'fincommerce' ),
	image: <img src={ LightBulbImage } alt="loader-lightbulb" />,
	paragraphs: [
		{
			label: __( '#FunWooFact: ', 'fincommerce' ),
			text: __(
				'Explore powerful extensions and themes at FinCommerce.com to enhance your store.',
				'fincommerce'
			),
		},
		{
			label: __( '#FunWooFact: ', 'fincommerce' ),
			text: __(
				'The Woo team is made up of over 350 talented individuals, distributed across 30+ countries.',
				'fincommerce'
			),
		},
	],
};
const LayoutStage = {
	title: __( 'Extending your store’s capabilities', 'fincommerce' ),
	image: <img src={ LayoutImage } alt="loader-lightbulb" />,
	paragraphs: [
		{
			label: __( '#FunWooFact: ', 'fincommerce' ),
			text: __(
				'Did you know that Woo powers almost 4 million stores worldwide? You’re in good company.',
				'fincommerce'
			),
		},
	],
};

const DevelopingStage = {
	title: __( 'Woo! Let’s get your features ready', 'fincommerce' ),
	image: <img src={ DevelopingImage } alt="loader-developng" />,
	paragraphs: [
		{
			label: __( '#FunWooFact: ', 'fincommerce' ),
			text: __(
				'Did you know that Woo was founded by two South Africans and a Norwegian? Here are three alternative ways to say “store” in those countries – Winkel, ivenkile, and butikk.',
				'fincommerce'
			),
		},
	],
};

const OpeningTheDoorsStage = {
	title: __( 'Opening the doors', 'fincommerce' ),
	image: <img src={ OpeningTheDoorsImage } alt="loader-opening-the-doors" />,
	paragraphs: [
		{
			label: __( '#FunWooFact: ', 'fincommerce' ),
			text: __( 'Our favorite color is purple ', 'fincommerce' ),
			element: (
				<img
					src={ Hearticon }
					alt="loader-hearticon"
					className="loader-hearticon"
				/>
			),
		},
	],
};

export const getLoaderStageMeta = ( key: string ): Stages => {
	switch ( key ) {
		case 'plugins':
			return [ DevelopingStage, LayoutStage, LightbulbStage ];
		case 'skippedGuidedSetup':
			return [ LightbulbStage, OpeningTheDoorsStage ];
		case 'default':
		default:
			return [ LightbulbStage ];
	}
};
