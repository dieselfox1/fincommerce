"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecondarySidebar = SecondarySidebar;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
const context_1 = require("../context");
const inserter_sidebar_1 = __importDefault(require("./inserter-sidebar"));
const document_overview_sidebar_1 = require("./document-overview-sidebar");
function SecondarySidebar() {
    const { isInserterOpened, isDocumentOverviewOpened: isListViewOpened } = (0, element_1.useContext)(context_1.EditorContext);
    if (isInserterOpened) {
        return (0, element_1.createElement)(inserter_sidebar_1.default, null);
    }
    if (isListViewOpened) {
        return (0, element_1.createElement)(document_overview_sidebar_1.DocumentOverviewSidebar, null);
    }
    return null;
}
