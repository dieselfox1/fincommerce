/**
 * Internal dependencies
 */
import { parser } from './parser';
export function evaluate(expression, context = {}) {
    return parser.parse(expression, { context });
}
