"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.success = exports.info = exports.error = exports.code = void 0;
/* eslint-disable no-console */
/**
 * External dependencies
 */
const chalk_1 = __importDefault(require("chalk"));
const code = (input) => {
    console.log(chalk_1.default.cyan(input));
};
exports.code = code;
const error = (input) => {
    console.log(chalk_1.default.bold.red(input));
};
exports.error = error;
const info = (input) => {
    console.log(input);
};
exports.info = info;
const success = (input) => {
    console.log(chalk_1.default.bold.green(input));
};
exports.success = success;
/* eslint-enable no-console */
