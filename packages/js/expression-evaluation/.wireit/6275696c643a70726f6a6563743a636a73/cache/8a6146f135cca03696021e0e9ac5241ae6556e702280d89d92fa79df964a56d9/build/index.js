"use strict";
/**
 * Internal dependencies
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluate = evaluate;
const parser_1 = require("./parser");
function evaluate(expression, context = {}) {
    return parser_1.parser.parse(expression, { context });
}
