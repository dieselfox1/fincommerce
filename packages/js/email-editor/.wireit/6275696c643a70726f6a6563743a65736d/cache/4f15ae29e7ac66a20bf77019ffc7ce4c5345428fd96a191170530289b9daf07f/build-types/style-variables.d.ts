/**
 * This module contains a set of utility functions to handle style variables and their compressed format.
 * The compressed format is used to store style variables in the database and in the editor settings.
 * The uncompressed format is used when a variable is used in CSS.
 */
export declare function unwrapCompressedPresetStyleVariableName(value: string): string | null;
export declare function unwrapCompressedPresetStyleVariable(value: string): string;
export declare function getCompressedVariableValue(value: string): string;
