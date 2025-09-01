"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostTypeContext = exports.__experimentalEditorLoadingContext = exports.useValidations = exports.useValidation = exports.TRACKS_SOURCE = exports.TAB_GENERAL_ID = exports.DETAILS_SECTION_ID = void 0;
/**
 * Internal dependencies
 */
const product_editor_ui_1 = __importDefault(require("./store/product-editor-ui"));
const wp_hooks_1 = __importDefault(require("./wp-hooks"));
__exportStar(require("./components"), exports);
var constants_1 = require("./constants");
Object.defineProperty(exports, "DETAILS_SECTION_ID", { enumerable: true, get: function () { return constants_1.DETAILS_SECTION_ID; } });
Object.defineProperty(exports, "TAB_GENERAL_ID", { enumerable: true, get: function () { return constants_1.TAB_GENERAL_ID; } });
Object.defineProperty(exports, "TRACKS_SOURCE", { enumerable: true, get: function () { return constants_1.TRACKS_SOURCE; } });
/**
 * Types
 */
__exportStar(require("./types"), exports);
/**
 * Utils
 */
__exportStar(require("./utils"), exports);
/*
 * Store
 */
__exportStar(require("./store/product-editor-ui"), exports);
/**
 * Hooks
 */
__exportStar(require("./hooks"), exports);
var validation_context_1 = require("./contexts/validation-context");
Object.defineProperty(exports, "useValidation", { enumerable: true, get: function () { return validation_context_1.useValidation; } });
Object.defineProperty(exports, "useValidations", { enumerable: true, get: function () { return validation_context_1.useValidations; } });
__exportStar(require("./contexts/validation-context/types"), exports);
/**
 * Contexts
 */
var editor_loading_context_1 = require("./contexts/editor-loading-context");
Object.defineProperty(exports, "__experimentalEditorLoadingContext", { enumerable: true, get: function () { return editor_loading_context_1.EditorLoadingContext; } });
var post_type_context_1 = require("./contexts/post-type-context");
Object.defineProperty(exports, "PostTypeContext", { enumerable: true, get: function () { return post_type_context_1.PostTypeContext; } });
/**
 * Product data views page.
 */
__exportStar(require("./products"), exports);
// Init the store
(0, product_editor_ui_1.default)();
(0, wp_hooks_1.default)();
