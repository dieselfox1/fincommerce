"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_STORE_NAME = exports.store = void 0;
/**
 * External dependencies
 */
var core_data_1 = require("@wordpress/core-data"); // User store is the same as core data store
Object.defineProperty(exports, "store", { enumerable: true, get: function () { return core_data_1.store; } });
/**
 * Internal dependencies
 */
const constants_1 = require("./constants");
exports.USER_STORE_NAME = constants_1.STORE_NAME;
