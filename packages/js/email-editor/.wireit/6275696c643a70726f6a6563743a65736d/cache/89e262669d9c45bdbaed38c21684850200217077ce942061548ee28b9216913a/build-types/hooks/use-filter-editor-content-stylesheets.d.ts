/**
 * Returns a ref callback to be attached to the editor content element (inside the iframe).
 * When attached, it removes non-email, non-core stylesheets from the iframe and installs placeholders
 * to prevent Gutenberg's style-compat feature from cloning them back.
 */
export declare const useFilterEditorContentStylesheets: () => (ref: Element) => void;
