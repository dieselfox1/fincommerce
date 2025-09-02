#!/bin/bash

set -eo pipefail

SCRIPT_PATH=$(
  cd "$(dirname "${BASH_SOURCE[0]}")" || return
  pwd -P
)

PLUGIN_REPOSITORY='dieselfox1/fincommerce-paypal-payments' PLUGIN_NAME='FinCommerce PayPal Payments' PLUGIN_SLUG=fincommerce-paypal-payments "$SCRIPT_PATH"/../../bin/install-plugin.sh
