"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionalWrapper = void 0;
const ConditionalWrapper = ({ condition, wrapper, children, }) => condition ? wrapper(children) : children;
exports.ConditionalWrapper = ConditionalWrapper;
