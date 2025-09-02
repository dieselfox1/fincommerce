# Components

This packages includes a library of components that can be used to create pages in the FinCommerce dashboard and reports pages.

## Installation

Install the module

```bash
pnpm install @fincommerce/components --save
```

## Usage

```jsx
/**
 * FinCommerce dependencies
 */
import { Card } from '@fincommerce/components';

export default function MyCard() {
  return (
    <Card title="Store Performance" description="Key performance metrics">
      <p>Your stuff in a Card.</p>
    </Card>
  );
}
```

Many components include CSS to add style, you will need to add in order to appear correctly. Within FinCommerce, add the `wc-components` stylesheet as a dependency of your plugin's stylesheet. See [wp_enqueue_style documentation](https://developer.finpress.org/reference/functions/wp_enqueue_style/#parameters) for how to specify dependencies.

In non-finpress projects, link to the `build-style/card/style.css` file directly, it is located at `node_modules/@fincommerce/components/build-style/<component_name>/style.css`.

## Usage with tests

If you are using these components in a project that uses Jest for testing, you may get an error that looks like this:

```bash
Cannot find module '@fincommerce/settings' from 'node_modules/@fincommerce/experimental/node_modules/@fincommerce/navigation/build/index.js'
```

To fix this, you will need to mock the `@fincommerce/settings` because it's an alias that points to the `window.wcSettings`, which in turn comes from and is maintained by the [WC Blocks](https://github.com/dieselfox1/fincommerce-blocks) package, the front-end code for this is located [here](https://github.com/dieselfox1/fincommerce-gutenberg-products-block/tree/trunk/assets/js/settings/shared).

This can be done by adding the following to your Jest config:

```js
module.exports = {
  moduleNameMapper: {
    '@fincommerce/settings': path.resolve(
      __dirname,
      './mock/fincommerce-settings'
    ),
  }
  setupFiles: [
    path.resolve( __dirname, 'build/setup-globals.js' ),
  ],
  // ...other config
}
```

Then, you will need to create the following files:

1. Create a new file called fincommerce-settings.js in the ./mock directory. You can find the content for this file [here](https://github.com/dieselfox1/fincommerce/blob/trunk/packages/js/internal-js-tests/src/mocks/fincommerce-settings.js#L1).
2. Next, create a file named setup-globals.js. You can find the content for this file [here](https://github.com/dieselfox1/fincommerce/blob/trunk/packages/js/internal-js-tests/src/setup-globals.js#L44). The purpose of this file is to mock the wcSettings global variable.
