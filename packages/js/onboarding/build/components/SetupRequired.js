"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetupRequired = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const notice_outline_1 = __importDefault(require("gridicons/dist/notice-outline"));
const i18n_1 = require("@wordpress/i18n");
const experimental_1 = require("@fincommerce/experimental");
const SetupRequired = () => {
    return ((0, element_1.createElement)("span", { className: "fincommerce-task-payment__setup_required" },
        (0, element_1.createElement)(notice_outline_1.default, null),
        (0, element_1.createElement)(experimental_1.Text, { variant: "small", size: "14", lineHeight: "20px" }, (0, i18n_1.__)('Setup required', 'fincommerce'))));
};
exports.SetupRequired = SetupRequired;
