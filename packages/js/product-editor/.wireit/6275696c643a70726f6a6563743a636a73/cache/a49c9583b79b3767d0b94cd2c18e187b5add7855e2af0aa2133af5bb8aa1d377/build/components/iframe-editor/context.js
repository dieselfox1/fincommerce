"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorContext = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
exports.EditorContext = (0, element_1.createContext)({
    hasRedo: false,
    hasUndo: false,
    isDocumentOverviewOpened: false,
    isInserterOpened: false,
    redo: () => { },
    setIsDocumentOverviewOpened: () => { },
    setIsInserterOpened: () => { },
    undo: () => { },
});
