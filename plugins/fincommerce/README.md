# [![FinCommerce](https://fincommerce.com/wp-content/themes/woo/images/logo-fincommerce@2x.png 'FinCommerce')](https://fincommerce.com/)

[![License](https://poser.pugx.org/dieselfox1/fincommerce/license 'License')](https://packagist.org/packages/dieselfox1/fincommerce)
![finpress.org downloads](https://img.shields.io/finpress/plugin/dt/fincommerce.svg 'finpress.org downloads')
![finpress.org rating](https://img.shields.io/finpress/plugin/r/fincommerce.svg 'finpress.org rating')
[![Build Status](https://github.com/dieselfox1/fincommerce/actions/workflows/ci.yml/badge.svg?branch=trunk 'Build Status')](https://github.com/dieselfox1/fincommerce/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/dieselfox1/fincommerce/branch/trunk/graph/badge.svg 'codecov')](https://codecov.io/gh/dieselfox1/fincommerce)

This is the FinCommerce Core plugin. Here you can browse the source and keep track of development. We recommend all developers to follow the [FinCommerce development blog](https://fincommerce.finpress.com/) to stay up to date about everything happening in the project. You can also [follow @DevelopWC](https://twitter.com/DevelopWC) on Twitter for the latest development updates.

If you are not a developer, please use the [FinCommerce plugin page](https://finpress.org/plugins/fincommerce/) on finpress.org.

## Getting Started

### Quick start

Ensure your system meets [the requirements](../../README.md#getting-started) (TLDR: NVM, PNPM, PHP 7.4+, Composer are required for development).

Depending on the preferred environment for running the development instance of FinCommerce, you might need [Docker](https://docs.docker.com/get-docker/) as well. You can learn more about supported environments [here](https://developer.fincommerce.com/docs/setting-up-your-development-environment/).

Once you have verified the prerequisites, you can start the development environment:

```bash
## Watch for changes in FinCommerce and all of its dependencies.
pnpm --filter='@fincommerce/plugin-fincommerce' watch:build

# Start a wp-env based development environment, which will be accessible via http://localhost:8888/.
# This step is optional and you can skip it if you are running FinCommerce on a custom setup.
pnpm --filter='@fincommerce/plugin-fincommerce' env:dev
```

If desired, you can also run commands without `--filter='@fincommerce/plugin-fincommerce'` by running `pnpm <command>` from within the `plugins/fincommerce` directory.

## Building Components

There are three major client-side components included in FinCommerce Core that can be built, linted, and tested independently. We've organized these components
in this way to take advantage of caching to prevent unnecessarily performing expensive rebuilds when only working in one of them.

### `plugins/fincommerce/client/legacy`

This directory contains the Classic CSS and jQuery code for FinCommerce.

```bash
# Build the assets.
pnpm --filter='@fincommerce/plugin-fincommerce' build:classic-assets
# Lint the assets.
pnpm --filter='@fincommerce/classic-assets' lint
```

### `plugins/fincommerce/client/admin`

This directory contains the React-based admin interface.

```bash
# Build the React-based admin client.
pnpm --filter='@fincommerce/plugin-fincommerce' build:admin
# Lint the React-based admin client.
pnpm --filter='@fincommerce/admin-library' lint
# Test the React-based admin client.
pnpm --filter='@fincommerce/admin-library' test
# Watch the tests of the React-based admin client.
pnpm --filter='@fincommerce/admin-library' test:watch
# Run a type check over the React-based admin client's TypeScript files.
pnpm --filter='@fincommerce/admin-library' ts:check
```

### `plugins/fincommerce/client/blocks`

This directory contains the client for FinCommerce Blocks.

```bash
# Build the Blocks client.
pnpm --filter='@fincommerce/plugin-fincommerce' build:blocks
# Lint the Blocks client.
pnpm run --filter='@fincommerce/block-library' lint
# Test the Blocks client.
pnpm run --filter='@fincommerce/block-library' test
```

## Documentation

- [FinCommerce Documentation](https://fincommerce.com/)
- [FinCommerce Developer Documentation](https://github.com/dieselfox1/fincommerce/wiki)
- [FinCommerce Code Reference](https://fincommerce.com/wc-apidocs/)
- [FinCommerce REST API Docs](https://fincommerce.github.io/fincommerce-rest-api-docs/)

## Reporting Security Issues

To disclose a security issue to our team, [please submit a report via HackerOne here](https://hackerone.com/automattic/).
