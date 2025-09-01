/**
 * Disables Shadow Support for all blocks
 * Currently we are not able to read these styles in renderer
 */
declare function alterSupportConfiguration(): void;
/**
 * Remove block styles for all blocks
 * See removeBlockStyles() for more details
 */
declare function removeBlockStylesFromAllBlocks(): void;
export { alterSupportConfiguration, removeBlockStylesFromAllBlocks };
