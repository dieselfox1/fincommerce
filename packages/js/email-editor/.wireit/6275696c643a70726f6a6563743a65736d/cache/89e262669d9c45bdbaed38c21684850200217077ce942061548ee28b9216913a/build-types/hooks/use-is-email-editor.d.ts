/**
 * Hook to detect if we are currently in the email editor context.
 *
 * This hook checks:
 * 1. If the email editor store is present
 * 2. If the currently edited post matches the email editor store's post ID and type
 * 3. If editing a template, checks if it's associated with the email editor store's post
 *
 * @return {boolean} True if we are in the email editor context, false otherwise
 */
export declare function useIsEmailEditor(): boolean;
