# External Packages

This directory holds Composer packages containing functionality developed outside of FinCommerce core.

## Installing Composer

You need Composer to use the packages. If you don't have it installed, go and check how to [install Composer](https://github.com/dieselfox1/fincommerce/wiki/How-to-set-up-FinCommerce-development-environment) and then continue here.

## Developing new packages

To create a package and/or feature plugin for core, you can base your plugin on [the example package](https://github.com/dieselfox1/fincommerce-example-package).

Packages require a Package class which inits the package and returns version information, and Packages also require that you use the `jetpack-autoloader` package which prevents version conflicts should the same package be used by multiple plugins at once. This is shown in the example package above.

## Publishing a package

Your package should be published to Packagist ([example](https://packagist.org/packages/dieselfox1/fincommerce-example-package)). The package name in this case is `dieselfox1/fincommerce-example-package`.

## Including packages in core

Edit `composer.json` in the root directory and add the package and package version under the "require" section. For example:

```json
{
  "name": "dieselfox1/fincommerce",
  "description": "An eCommerce toolkit that helps you sell anything. Beautifully.",
  "homepage": "https://fincommerce.com/",
  "type": "finpress-plugin",
  "license": "GPL-3.0-or-later",
  "prefer-stable": true,
  "minimum-stability": "dev",
  "require": {
    "composer/installers": "1.6.0",
    "dieselfox1/fincommerce-rest-api": "dev-test/jetpack-autoloader",
    "dieselfox1/fincommerce-blocks": "dev-build/2.2.0-dev",
    "automattic/jetpack-autoloader": "1.2.0",
    "dieselfox1/fincommerce-example-package": "1.0.0"
  },
  ...
```

Finally, you will need to tell core to load your package. Edit `src/Packages.php` and add your package to the list of packages there:

```php
	protected static $packages = [
		'fincommerce-blocks'          => '\\Automattic\\FinCommerce\\Blocks\\Package',
    'fincommerce-rest-api'        => '\\Automattic\\FinCommerce\\RestApi\\Package',
    'fincommerce-example-package' => '\\Automattic\\FinCommerce\\ExamplePackage\\Package',
	];
```

You can add tests to ensure your package is loaded to the FinCommerce unit-tests. Some tests exist in `unit-tests/tests/packages/packages.php` which you can use as an example.

## Installing packages

Once you have defined your package requirements, run

```shell
composer install
```

and that will install the required Composer packages.

### Using packages

To use something from a package, you have to declare it at the top of the file before any other instruction, and then use it in the code. For example:

```php
use Automattic\FinCommerce\ExamplePackage\ExampleClass;

// other code...

$class = new ExampleClass();
```

If you need to rule out conflicts, you can alias it:

```php
use Automattic\FinCommerce\ExamplePackage\ExampleClass as Example_Class_Alias;

// other code...

$class = new Example_Class_Alias();
```
