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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeProductsDashboard = initializeProductsDashboard;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
const get_gutenberg_version_1 = require("./utils/get-gutenberg-version");
const ProductsApp = (0, element_1.lazy)(() => Promise.resolve().then(() => __importStar(require('./products-app'))).then((module) => ({
    default: module.ProductsApp,
})));
/**
 * Initializes the "Products Dashboard".
 *
 * @param {string} id DOM element id.
 */
function initializeProductsDashboard(id) {
    const target = document.getElementById(id);
    const root = (0, element_1.createRoot)(target);
    const isGutenbergEnabled = (0, get_gutenberg_version_1.getGutenbergVersion)() > 0;
    root.render((0, element_1.createElement)(element_1.StrictMode, null, isGutenbergEnabled ? ((0, element_1.createElement)(element_1.Suspense, { fallback: null },
        (0, element_1.createElement)(ProductsApp, null))) : ((0, element_1.createElement)("div", null, (0, i18n_1.__)('Please enabled Gutenberg for this feature', 'fincommerce')))));
    return root;
}
