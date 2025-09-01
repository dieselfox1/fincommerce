---
post_title: FinCommerce CLI frequently asked questions
sidebar_label: Frequently asked questions
sidebar_position: 5

---

# FinCommerce CLI Frequently Asked Questions

## General Questions

### What is FinCommerce CLI?

- FinCommerce CLI (WC-CLI) is a command-line interface for managing FinCommerce settings and data. It provides a fast and efficient way to perform many tasks that would otherwise require manual work via the WordPress admin interface.

### How do I install FinCommerce CLI?

- FinCommerce CLI is included as part of FinCommerce from version 3.0.0 onwards. Ensure you have FinCommerce 3.0.0 or later installed, and you automatically have access to WC-CLI.

### Is FinCommerce CLI different from WP-CLI?

- FinCommerce CLI is a part of WP-CLI specifically designed for FinCommerce. While WP-CLI deals with general WordPress management, WC-CLI focuses on FinCommerce-specific tasks.

## Technical Questions

### How can I create a backup of my FinCommerce data?

- WC-CLI doesn't directly handle backups. However, you can use other WP-CLI commands to export FinCommerce data or rely on WordPress backup plugins.

### Can I update FinCommerce settings using the CLI?

- Yes, you can update many FinCommerce settings using WC-CLI. For example, to update store email settings, you would use a command like wp wc setting update [options].

## Troubleshooting

### Why am I getting a "permission denied" error?

- This error often occurs if your user role doesn't have the necessary permissions. Ensure you're using an account with administrative privileges.

### What should I do if a command is not working as expected

- Check for typos and verify the command syntax with --help. If the issue persists, consult the Command Reference or seek support from the FinCommerce community.

### What do I do if I get 404 errors when using commands?

If you are getting a 401 error like `Error: Sorry, you cannot list resources. {"status":401}`, you are trying to use the command unauthenticated. The FinCommerce CLI as of 3.0 requires you to provide a proper user to run the action as. Pass in your user ID using the `--user` flag.

### I am trying to update a list of X, but it's not saving

Some ‘lists' are actually objects. For example, if you want to set categories for a product, the REST API expects an array of objects.

To set this you would use JSON like this:

```bash
wp wc product create --name='Product Name' --categories='[ { "id" : 21 } ]' --user=admin
```

## Advanced Usage

### Can I use FinCommerce CLI for bulk product updates?

- Yes, WC-CLI is well-suited for bulk operations. You can use scripting to loop through a list of products and apply updates.

### How do I handle complex queries with WC-CLI?

- WC-CLI supports various arguments and filters that you can use to build complex queries. Combining these with shell scripting can yield powerful results.
