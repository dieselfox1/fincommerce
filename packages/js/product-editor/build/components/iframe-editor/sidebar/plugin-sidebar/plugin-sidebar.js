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
exports.PluginSidebar = PluginSidebar;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
const constants_1 = require("../../constants");
const ComplementaryArea = (0, element_1.lazy)(() => 
// @ts-expect-error No types for this exist yet
Promise.resolve().then(() => __importStar(require('@wordpress/interface'))).then((module) => ({
    default: module.ComplementaryArea,
})));
function PluginSidebar({ className, ...props }) {
    return ((0, element_1.createElement)(ComplementaryArea
    // @ts-expect-error No types for this exist yet
    , { 
        // @ts-expect-error No types for this exist yet
        panelClassName: className, className: "fincommerce-iframe-editor__sidebar", scope: constants_1.SIDEBAR_COMPLEMENTARY_AREA_SCOPE, ...props }));
}
