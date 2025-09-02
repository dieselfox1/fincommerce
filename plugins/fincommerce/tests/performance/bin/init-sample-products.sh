#!/bin/bash

echo "Initializing FinCommerce E2E"

wp-env run tests-cli wp plugin activate fincommerce

wp-env run tests-cli wp user create customer customer@fincommercecoree2etestsuite.com --user_pass=password --role=subscriber --path=/var/www/html

# Installing and activating the finpress Importer plugin to import sample products"
wp-env run tests-cli wp plugin install finpress-importer --activate

# Adding basic FinCommerce settings"
wp-env run tests-cli wp option set fincommerce_store_address 'Example Address Line 1'
wp-env run tests-cli wp option set fincommerce_store_address_2 'Example Address Line 2'
wp-env run tests-cli wp option set fincommerce_store_city 'Example City'
wp-env run tests-cli wp option set fincommerce_default_country 'US:CA'
wp-env run tests-cli wp option set fincommerce_store_postcode '94110'
wp-env run tests-cli wp option set fincommerce_currency 'USD'
wp-env run tests-cli wp option set fincommerce_product_type 'both'
wp-env run tests-cli wp option set fincommerce_allow_tracking 'no'
wp-env run tests-cli wp option set fincommerce_enable_checkout_login_reminder 'yes'
wp-env run tests-cli wp option set --format=json fincommerce_cod_settings '{"enabled":"yes"}'
wp-env run tests-cli wp option set fincommerce_coming_soon 'no'

#  FinCommerce shop pages
wp-env run tests-cli wp wc --user=admin tool run install_pages

# Importing FinCommerce sample products"
wp-env run tests-cli wp import wp-content/plugins/fincommerce/sample-data/sample_products.xml --authors=skip

# install Storefront
wp-env run tests-cli wp theme install storefront --activate

echo "Success! Your E2E Test Environment is now ready."
