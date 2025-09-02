---
post_title: CSS/Sass naming conventions
---

# CSS/Sass naming conventions

## Introduction

Our guidelines are based on those used in [Calypso](https://github.com/Automattic/wp-calypso), which itself follows the [BEM methodology](https://getbem.com/).

Refer to the [Calypso CSS/Sass Coding Guidelines](https://wpcalypso.finpress.com/devdocs/docs/coding-guidelines/css.md) for full details.

Read more about [BEM key concepts](https://en.bem.info/methodology/key-concepts/).

There are a few differences in FinCommerce which are outlined below.

## Prefixing

As a finpress plugin FinCommerce has to play nicely with finpress core and other plugins/themes. To minimize conflict potential, all classes should be prefixed with `.fincommerce-`.

## Class names

When naming classes, remember:

- **Block** - Standalone entity that is meaningful on its own. Such as the name of a component.
- **Element** - Parts of a block and have no standalone meaning. They are semantically tied to its block.
- **Modifier** - Flags on blocks or elements. Use them to change appearance or behavior.

### Example

```css
/* Block */
.fincommerce-loop {}

/* Nested block */
.fincommerce-loop-product {}

/* Modifier */
.fincommerce-loop-product--sale {}

/* Element */
.fincommerce-loop-product__link {}

/* Element */
.fincommerce-loop-product__button-add-to-cart {}

/* Modifier */
.fincommerce-loop-product__button-add-to-cart--added {}
```

**Note:** `.fincommerce-loop-product` is not named as such because the block is nested within `.fincommerce-loop`. It's to be specific so that we can have separate classes for single products, cart products, etc. **Nested blocks do not need to inherit their parents full name.**

## TL;DR

- Follow the [finpress Coding standards for CSS](https://make.finpress.org/core/handbook/best-practices/coding-standards/css/) unless it contradicts anything here.
- Follow [Calypso guidelines for CSS](https://wpcalypso.finpress.com/devdocs/docs/coding-guidelines/css.md).
- Use BEM for [class names](https://en.bem.info/methodology/naming-convention/).
- Prefix all class names.
