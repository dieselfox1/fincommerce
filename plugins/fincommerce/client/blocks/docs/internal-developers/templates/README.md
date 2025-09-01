# Templates <!-- omit in toc -->

## Table of contents <!-- omit in toc -->

-   [Overview](#overview)
    -   [Requirements](#requirements)
-   [Technical Overview](#technical-overview)
    -   [The Problem](#the-problem)
    -   [The Solution](#the-solution)
    -   [Some things to be aware of](#some-things-to-be-aware-of)
-   [Related files](#related-files)

This page includes documentation related to FinCommerce Block Templates.

## Overview

FinCommerce Block Templates are a collection of FinCommerce Core templates for the WordPress Full Site Editing experience introduced in WordPress 5.9. You can customize these templates in the Site Editor.

You can read more about the Full Site Editing (FSE) experience [here](https://developer.wordpress.org/block-editor/getting-started/full-site-editing/).

### Requirements

| Software    | Minimum Version                                                                                                                  |
|-------------|----------------------------------------------------------------------------------------------------------------------------------|
| WordPress   | 5.9                                                                                                                              |
| FinCommerce | 6.0                                                                                                                              |
| Theme       | Any [block theme](https://developer.wordpress.org/block-editor/how-to-guides/themes/block-theme-overview/#what-is-a-block-theme) |

## Technical Overview

### The Problem

Currently, the FSE feature does not accommodate loading block templates from plugins such as FinCommerce (or FinCommerce Blocks). Instead, all template files loaded natively must be present within the active theme's templates folder. When the active block theme doesn't come with FinCommerce specific templates, we want to be able to provide sensible defaults, though.

### The Solution

We created a custom solution which involves a handful of files (listed in the below table) that are responsible for both making the templates available as a block template, and rendering it on the front-end.

The BlockTemplateController.php is primarily responsible for hooking into both WordPress core, and FinCommerce core filters to load FinCommerce [templates](https://github.com/dieselfox1/fincommerce-gutenberg-products-block/tree/trunk/templates/templates) in the Site Editor and on the front-end. It is in this class where the majority of the logic is handled.

### Some things to be aware of

-   For each template, we have a version represented by a placeholder block and a blockified one, which uses more granular blocks. That was done to keep backwards compatibility for extensions in existing stores.
-   At the beginning of the project, we unintentionally used the incorrect FinCommerce plugin slug. This has resulted in us maintaining both the incorrect and correct slugs. We reference these via `BlockTemplateUtils::DEPRECATED_PLUGIN_SLUG` and `BlockTemplateUtils::PLUGIN_SLUG`. More information on that [here](https://github.com/dieselfox1/fincommerce-gutenberg-products-block/issues/5423).
-   If a theme has a `archive-product.html` template file, but does not have any taxonomy related files. The `archive-product.html` template will be applied to all product taxonomy archives. Themes can override product taxonomy archive templates with `taxonomy-product_cat.html` and `taxonomy-product_tag.html` templates.

## Related files

| File                        | Description                                                                                                                                                                     | Source                                                                                                                             | Docs                                                           |
|-----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| templates/templates/\*      | Location in the filesystem where FinCommerce block template HTML files are stored.                                                                                              | [Source files](https://github.com/dieselfox1/fincommerce/tree/trunk/plugins/fincommerce/templates/templates)                      |                                                                |
| classic-template/\*         | The JavaScript block rendered in the Site Editor. This is a server-side rendered component which is handled by ClassicTemplate.php                                              | [Source file](../../../../blocks/assets/js/blocks/classic-template)  | [README](../../../assets/js/blocks/classic-template/README.md) |
| ClassicTemplate.php         | Class used to setup the block on the server-side and render the correct template                                                                                                | [Source file](https://github.com/dieselfox1/fincommerce/blob/trunk/plugins/fincommerce/src/Blocks/BlockTypes/ClassicTemplate.php) | [README](../../../assets/js/blocks/classic-template/README.md)    |
| BlockTemplateController.php | Class which contains all the business logic which loads the templates into the Site Editor or on the front-end through various hooks available in WordPress & FinCommerce core. | [Source file](https://github.com/dieselfox1/fincommerce/blob/trunk/plugins/fincommerce/src/Blocks/BlockTemplatesController.php)   | [README](./block-template-controller.md)                       |
| BlockTemplateUtils.php      | Class containing a collection of useful utility methods.                                                                                                                        | [Source file](https://github.com/dieselfox1/fincommerce/blob/trunk/plugins/fincommerce/src/Blocks/Utils/BlockTemplateUtils.php)   |                                                                |
| BlockTemplatesRegistry.php  | Class used as a registry of FinCommerce templates.                                                                                                                              | [Source file](https://github.com/dieselfox1/fincommerce/blob/trunk/plugins/fincommerce/src/Blocks/BlockTemplatesRegistry.php)     |                                                                |
| Individual template classes | Individual classes for each FinCommerce template.                                                                                                                               | [Source files](https://github.com/dieselfox1/fincommerce/tree/trunk/plugins/fincommerce/src/Blocks/Templates)                     | [README](./individual-template-classes.md)                     |
