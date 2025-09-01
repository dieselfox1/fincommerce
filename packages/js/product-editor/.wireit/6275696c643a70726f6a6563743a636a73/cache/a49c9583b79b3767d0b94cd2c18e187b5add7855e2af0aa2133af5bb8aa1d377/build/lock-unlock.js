"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlock = exports.lock = void 0;
/**
 * External dependencies
 */
const private_apis_1 = require("@wordpress/private-apis");
const { lock, unlock } = (0, private_apis_1.__dangerousOptInToUnstableAPIsOnlyForCoreModules)('I acknowledge private features are not for use in themes or plugins and doing so will break in the next version of WordPress.', '@wordpress/edit-site');
exports.lock = lock;
exports.unlock = unlock;
