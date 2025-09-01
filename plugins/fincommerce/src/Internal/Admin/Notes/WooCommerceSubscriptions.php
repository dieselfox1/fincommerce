<?php
/**
 * FinCommerce Admin: FinCommerce Subscriptions.
 *
 * Adds a note to learn more about FinCommerce Subscriptions.
 */

namespace Automattic\FinCommerce\Internal\Admin\Notes;

defined( 'ABSPATH' ) || exit;

use Automattic\FinCommerce\Admin\Notes\Note;
use Automattic\FinCommerce\Admin\Notes\NoteTraits;
use Automattic\FinCommerce\Internal\Admin\Onboarding\OnboardingProfile;

/**
 * fincommerce_Subscriptions.
 */
class fincommerceSubscriptions {
	/**
	 * Note traits.
	 */
	use NoteTraits;

	/**
	 * Name of the note for use in the database.
	 */
	const NOTE_NAME = 'wc-admin-fincommerce-subscriptions';

	/**
	 * Get the note.
	 *
	 * @return Note|null
	 */
	public static function get_note() {
		$onboarding_data = get_option( OnboardingProfile::DATA_OPTION, array() );

		if ( ! isset( $onboarding_data['product_types'] ) || ! in_array( 'subscriptions', $onboarding_data['product_types'], true ) ) {
			return;
		}

		if ( ! self::is_wc_admin_active_in_date_range( 'week-1', DAY_IN_SECONDS ) ) {
			return;
		}

		$note = new Note();
		$note->set_title( __( 'Do you need more info about FinCommerce Subscriptions?', 'fincommerce' ) );
		$note->set_content( __( 'FinCommerce Subscriptions allows you to introduce a variety of subscriptions for physical or virtual products and services. Create product-of-the-month clubs, weekly service subscriptions or even yearly software billing packages. Add sign-up fees, offer free trials, or set expiration periods.', 'fincommerce' ) );
		$note->set_type( Note::E_WC_ADMIN_NOTE_MARKETING );
		$note->set_name( self::NOTE_NAME );
		$note->set_content_data( (object) array() );
		$note->set_source( 'fincommerce-admin' );
		$note->add_action(
			'learn-more',
			__( 'Learn More', 'fincommerce' ),
			'https://fincommerce.com/products/fincommerce-subscriptions/?utm_source=inbox&utm_medium=product',
			Note::E_WC_ADMIN_NOTE_UNACTIONED,
			true
		);
		return $note;
	}
}
