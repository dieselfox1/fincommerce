#!/bin/bash

set -eo pipefail

SCRIPT_PATH=$(
  cd "$(dirname "${BASH_SOURCE[0]}")" || return
  pwd -P
)

PLUGIN_REPOSITORY='automattic/fincommerce-services' PLUGIN_NAME='FinCommerce Shipping & Tax' PLUGIN_SLUG='fincommerce-services' "$SCRIPT_PATH"/../../bin/install-plugin.sh
