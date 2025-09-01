"use strict";
/**
 * Type helper that maps select() return types to their resolveSelect() return types.
 * This works by mapping over each Selector, and returning a function that
 * returns a Promise of the Selector's return type.
 */
Object.defineProperty(exports, "__esModule", { value: true });
