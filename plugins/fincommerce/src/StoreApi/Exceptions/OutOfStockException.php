<?php
namespace Automattic\FinCommerce\StoreApi\Exceptions;

/**
 * OutOfStockException class.
 *
 * This exception is thrown when an item in a draft order is out of stock completely.
 */
class OutOfStockException extends StockAvailabilityException {}
