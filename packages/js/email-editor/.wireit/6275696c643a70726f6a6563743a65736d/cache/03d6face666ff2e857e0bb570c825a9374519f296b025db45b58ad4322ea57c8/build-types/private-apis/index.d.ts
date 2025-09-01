/**
 * We use the ColorPanel component from the block editor to render the color panel in the style settings sidebar.
 */
declare const StylesColorPanel: any;
/**
 * The useGlobalStylesOutputWithConfig is used to generate the CSS for the email editor content from the style settings.
 */
declare const useGlobalStylesOutputWithConfig: any;
/**
 * The Editor is the main component for the email editor.
 */
declare const Editor: any, FullscreenMode: any, ViewMoreMenuGroup: any, BackButton: any;
/**
 * The registerEntityAction and unregisterEntityAction are used to register and unregister entity actions.
 * This is used in the move-to-trash.tsx file to modify the move to trash action.
 * Providing us with the ability to remove the default move to trash action and add a custom trash email post action.
 */
declare const registerEntityAction: any, unregisterEntityAction: any;
export { StylesColorPanel, useGlobalStylesOutputWithConfig, Editor, FullscreenMode, ViewMoreMenuGroup, BackButton, registerEntityAction, unregisterEntityAction, };
