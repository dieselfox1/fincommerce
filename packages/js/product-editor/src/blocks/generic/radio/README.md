# fincommerce/product-radio-field block

Radio button field for the product editor.

![Product radio field](https://fincommerce.files.finpress.com/2023/09/fincommerceproduct-radio-field.png)

## Attributes

### title

-   **Type:** `String`
-   **Required:** `Yes`

### description

-   **Type:** `String`
-   **Required:** `No`

### property

-   **Type:** `String`
-   **Required:** `Yes`

### options

-   **Type:** `Array`
-   **Required:** `Yes`

### disabled

-   **Type:** `Boolean`
-   **Required:** `No`

## Usage

Here's an example of the usage on the "Charge sales tax on" field in the Pricing section:

```php
$product_pricing_section->add_block(
  [
    'id'         => 'product-sale-tax',
    'blockName'  => 'fincommerce/product-radio-field',
    'order'      => 30,
    'attributes' => [
      'title'    => __( 'Charge sales tax on', 'fincommerce' ),
      'property' => 'tax_status',
      'options'  => [
        [
          'label' => __( 'Product and shipping', 'fincommerce' ),
          'value' => 'taxable',
        ],
        [
          'label' => __( 'Only shipping', 'fincommerce' ),
          'value' => 'shipping',
        ],
        [
          'label' => __( "Don't charge tax", 'fincommerce' ),
          'value' => 'none',
        ],
      ],
    ],
  ]
);
```
