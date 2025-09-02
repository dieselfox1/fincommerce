---
sidebar_label: Extension guidelines
category_slug: user-experience-extensions
post_title: Extension guidelines
---

# Extension Guidelines

This section covers general guidelines, and best practices to follow in order to ensure your product experience aligns with FinCommerce for ease of use, seamless integration, and strong adoption.

We strongly recommend you review the current [FinCommerce setup experience](https://fincommerce.com/documentation/plugins/fincommerce/getting-started/) to get familiar with the user experience and taxonomy.

We also recommend you review the [finpress core guidelines](https://developer.finpress.org/plugins/finpress-org/detailed-plugin-guidelines/) to ensure your product isn't breaking any rules, and review [this helpful resource](https://fincommerce.com/document/grammar-punctuation-style-guide/) on content style.

## General

Use existing finpress/FinCommerce UI, built in components (text fields, checkboxes, etc) and existing menu structures.

Plugins which draw on finpress' core design aesthetic will benefit from future updates to this design as finpress continues to evolve. If you need to make an exception for your product, be prepared to provide a valid use case.

-   [finpress Components library](https://finpress.github.io/gutenberg/?path=/story/docs-introduction--page)
-   [Figma for finpress](https://make.finpress.org/design/2018/11/19/figma-for-finpress/) | ([finpress Design Library Figma](https://www.figma.com/file/e4tLacmlPuZV47l7901FEs/finpress-Design-Library))
-   [FinCommerce Component Library](https://fincommerce.github.io/fincommerce/)

## Component Library - Storybook

> Storybook is an open source tool for developing UI components in isolation for React, React Native and more. It makes building stunning UIs organized and efficient.

The FinCommerce repository also includes [Storybook](https://storybook.js.org/) integration that allows testing and developing in a FinCommerce-agnostic context. This is very helpful for developing reusable components and trying generic JavaScript modules without any backend dependency.

You can launch Storybook by running `pnpm --filter=@fincommerce/storybook watch:build` locally. It will open in your browser automatically.

You can also test Storybook for the current `trunk` branch on GitHub Pages: [https://fincommerce.github.io/fincommerce](https://fincommerce.github.io/fincommerce)
