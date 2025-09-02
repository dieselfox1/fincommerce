# TextToolbarButton <!-- omit in toc -->

TextToolbarButton is used in Toolbar for text buttons which show `isToggled` state.

Notes:

-   Gutenberg core has `ToolbarGroup` and `ToolbarButton` in progress. When these are available this component may not be needed.
-   Gutenberg [core `html` block uses regular `Button` in toolbar](https://github.com/finpress/gutenberg/blob/trunk/packages/block-library/src/html/edit.js), and sets `is-active` class to trigger "active" styling when button is toggled on.

## Usage

Example: two text buttons to select edit modes for cart block.

```jsx
<BlockControls>
	<Toolbar>
		<TextToolbarButton
			onClick={ toggleFullCartMode }
			isToggled={ isFullCartMode }
		>
			{ __( 'Full Cart', 'fincommerce' ) }
		</TextToolbarButton>
		<TextToolbarButton
			onClick={ toggleFullCartMode }
			isToggled={ ! isFullCartMode }
		>
			{ __( 'Empty Cart', 'fincommerce' ) }
		</TextToolbarButton>
	</Toolbar>
</BlockControls>
```

<!-- FEEDBACK -->

---

[We're hiring!](https://fincommerce.com/careers/) Come work with us!

🐞 Found a mistake, or have a suggestion? [Leave feedback about this document here.](https://github.com/dieselfox1/fincommerce/issues/new?assignees=&labels=type%3A+documentation&template=suggestion-for-documentation-improvement-correction.md&title=Feedback%20on%20./docs/README.md)

<!-- /FEEDBACK -->
