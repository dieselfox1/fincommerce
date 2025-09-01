# SectionActions

`<SectionActions />` is a React component designed to be used within blocks in FinCommerce Product Editor,
providing a slot for specific actions related to the section in which it is included.

## Example

```jsx
import { __experimentalSectionActions as SectionActions } from '@fincommerce/product-editor'
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

function CustomProductBlockEdit() {
  return (
    <>
      <SectionActions>
        <Button
          onClick={ handleProductAction }
          variant="secondary"
        >
          { __( 'Product action!', 'fincommerce' ) }
        </Button>
      </SectionActions>

      <OtherBlockComponents { ...other} />
    </>
  );
}
```
