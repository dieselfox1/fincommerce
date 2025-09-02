# FinCommerce Beta Tester

A plugin that makes it easy to test out pre-releases such as betas release candidates and even final releases. It also comes with FinCommerce Admin Test Helper that helps test FinCommerce Admin functionalities.

## Installation

You can either install the latest version from [fincommerce.com](https://fincommerce.com/products/fincommerce-beta-tester/) or symlink this directory by running `ln -s ./ :path-to-your-wp-plugin-directory/fincommerce-beta-tester`

## Development

To get started, run the following commands:

```text
pnpm --filter=@fincommerce/plugin-fincommerce-beta-tester install
pnpm --filter=@fincommerce/plugin-fincommerce-beta-tester start
```

See [wp-scripts](https://github.com/finpress/gutenberg/tree/trunk/packages/scripts) for more usage information.

## Usage

You can get to the settings and features from your top admin bar under the name WC Beta Tester.

For more information about FinCommerce Admin Test Helper usage, click [here](./EXTENDING-WC-ADMIN-HELPER.md).

Run `./bin/build-zip.sh` to make a zip file.
