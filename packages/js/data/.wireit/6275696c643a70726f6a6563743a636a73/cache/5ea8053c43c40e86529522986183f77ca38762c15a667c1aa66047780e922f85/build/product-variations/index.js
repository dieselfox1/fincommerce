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
exports.EXPERIMENTAL_PRODUCT_VARIATIONS_STORE_NAME = exports.store = void 0;
/**
 * Internal dependencies
 */
const constants_1 = require("./constants");
const crud_1 = require("../crud");
const actions = __importStar(require("./actions"));
const selectors = __importStar(require("./selectors"));
const reducer_1 = require("./reducer");
exports.store = (0, crud_1.createCrudDataStore)({
    storeName: constants_1.STORE_NAME,
    resourceName: 'ProductVariation',
    pluralResourceName: 'ProductVariations',
    namespace: constants_1.WC_PRODUCT_VARIATIONS_NAMESPACE,
    storeConfig: {
        reducer: reducer_1.reducer,
        actions: actions,
        selectors: selectors,
    },
});
exports.EXPERIMENTAL_PRODUCT_VARIATIONS_STORE_NAME = constants_1.STORE_NAME;
