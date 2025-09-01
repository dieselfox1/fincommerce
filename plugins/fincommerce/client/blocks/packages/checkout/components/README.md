# Components <!-- omit in toc -->

A library of components to be used for creating common UI elements shared between features of the FinCommerce Cart and Checkout Blocks.

## Usage

When FinCommerce Blocks is installed and activated, these components can be accessed by importing from the `blocks-checkout` package.

```ts
// Aliased import
import { Button } from '@fincommerce/blocks-components';

// Global import
// const { Button } = wc.blocksCheckout;

export default function MyButton() {
	return <Button>Click Me!</Button>;
}
```

These components are here so they can be consumed by extensions.

<!-- FEEDBACK -->

---

[We're hiring!](https://fincommerce.com/careers/) Come work with us!

🐞 Found a mistake, or have a suggestion? [Leave feedback about this document here.](https://github.com/dieselfox1/fincommerce/issues/new?assignees=&labels=type%3A+documentation&template=suggestion-for-documentation-improvement-correction.md&title=Feedback%20on%20./packages/checkout/components/README.md)

<!-- /FEEDBACK -->
