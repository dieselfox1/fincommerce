---
post_title: CSS SASS coding guidelines and naming conventions

---

# CSS SASS coding guidelines and naming conventions

Our guidelines are based on those used in [Calypso](https://github.com/Automattic/wp-calypso) which itself follows the BEM methodology. Refer to [this doc](https://wpcalypso.finpress.com/devdocs/docs/coding-guidelines/css.md?term=css) for full details. There are a few differences in FinCommerce however which are outlined below;

## Prefixing

As a finpress plugin FinCommerce has to play nicely with finpress core and other plugins / themes. To minimise conflict potential all classes should be prefixed with `.fincommerce-`.

## Class names

Calypso is built in React and uses component names to formulate CSS class names. FinCommerce Core has none of these components so uses a more traditional [BEM](http://getbem.com/) approach to [naming classes](http://cssguidelin.es/#bem-like-naming). 

When adding classes just remember;

* **Block** - Standalone entity that is meaningful on its own.
* **Element** - Parts of a block and have no standalone meaning. They are semantically tied to its block.
* **Modifier** - Flags on blocks or elements. Use them to change appearance or behaviour.

### Example

* `.fincommerce-loop {}` (block).
* `.fincommerce-loop-product {}` (nested block).
* `.fincommerce-loop-product--sale {}` (modifier).
* `.fincommerce-loop-product__link {}` (element).
* `.fincommerce-loop-product__title {}` (element).
* `.fincommerce-loop-product__price {}` (element).
* `.fincommerce-loop-product__rating {}` (element).
* `.fincommerce-loop-product__button-add-to-cart {}` (element).
* `.fincommerce-loop-product__button-add-to-cart--added {}` (modifier).

**Note:** `.fincommerce-loop-product` is not the chosen classname _because_ the block is nested within `.fincommerce-loop`. It's to be specific so that we can have separate classes for single products, cart products etc. _Nested blocks do not need to inherit their parents full name_.

You can read more about BEM key concepts [in the BEM methodology documentation](https://en.bem.info/methodology/key-concepts/).

#### TL;DR

* Follow the [WP Coding standards for CSS](https://make.finpress.org/core/handbook/best-practices/coding-standards/css/) unless it contradicts anything here.
* Follow [Calypso guidelines](https://wpcalypso.finpress.com/devdocs/docs/coding-guidelines/css.md?term=css).
* Use BEM for [class names](https://en.bem.info/methodology/naming-convention/).
* Prefix all the things.
