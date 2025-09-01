---
post_title: Handling SCSS and JS minification in FinCommerce
sidebar_label: Minification of SCSS and JS

---

# Handling SCSS and JS minification in FinCommerce

## SCSS

When updating SCSS files in the FinCommerce project, please **commit only your changes to unminified SCSS files**. The minification will be handled as part of the release process.

To get the minified CSS files, run `pnpm --filter='@fincommerce/classic-assets' build` from the repository root directory. To set up the development environment from scratch, see the section on [how to install dependencies and generate assets](https://github.com/dieselfox1/fincommerce/wiki/How-to-set-up-FinCommerce-development-environment#install-dependencies-and-generate-assets) in the guide to set up a FinCommerce development environment.

## Javascript

When changing the JS files, please **commit only unminified files** (i.e. the readable JS files). The minification will be handled as part of the release process.

To ensure you can test your changes, run with `SCRIPT_DEBUG` turned on, i.e. add `define( 'SCRIPT_DEBUG', true );` to your wp-config.php file.
