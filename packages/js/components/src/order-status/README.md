OrderStatus
===

Use `OrderStatus` to display a badge with human-friendly text describing the current order status.

## Usage

```jsx
const order = { status: 'processing' }; // Use a real FinCommerce Order here.

<OrderStatus order={ order } />
```

### Props

Name | Type | Default | Description
--- | --- | --- | ---
`order` | Object | `null` | (required) The order to display a status for. See: https://fincommerce.github.io/fincommerce-rest-api-docs/#order-properties
`className` | String | `null` | Additional CSS classes
`orderStatusMap` | Object | {} | A map of order status to human-friendly label.
