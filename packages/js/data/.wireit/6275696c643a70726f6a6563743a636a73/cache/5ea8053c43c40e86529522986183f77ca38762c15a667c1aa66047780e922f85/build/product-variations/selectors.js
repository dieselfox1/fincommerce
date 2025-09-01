"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProductVariationsError = exports.isGeneratingVariations = void 0;
const utils_1 = require("../crud/utils");
const constants_1 = require("./constants");
const crud_actions_1 = __importDefault(require("./crud-actions"));
const isGeneratingVariations = (state, idQuery) => {
    const urlParameters = (0, utils_1.getUrlParameters)(constants_1.WC_PRODUCT_VARIATIONS_NAMESPACE, idQuery);
    const { key } = (0, utils_1.parseId)(idQuery, urlParameters);
    const itemQuery = (0, utils_1.getRequestIdentifier)(crud_actions_1.default.GENERATE_VARIATIONS, key);
    return state.requesting[itemQuery];
};
exports.isGeneratingVariations = isGeneratingVariations;
const generateProductVariationsError = (state, idQuery) => {
    const urlParameters = (0, utils_1.getUrlParameters)(constants_1.WC_PRODUCT_VARIATIONS_NAMESPACE, idQuery);
    const { key } = (0, utils_1.parseId)(idQuery, urlParameters);
    const itemQuery = (0, utils_1.getRequestIdentifier)(crud_actions_1.default.GENERATE_VARIATIONS, key);
    return state.errors[itemQuery];
};
exports.generateProductVariationsError = generateProductVariationsError;
