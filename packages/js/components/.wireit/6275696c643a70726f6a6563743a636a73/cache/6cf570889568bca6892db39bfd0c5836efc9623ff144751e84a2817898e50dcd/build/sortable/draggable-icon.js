"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DraggableIcon = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const DraggableIcon = () => ((0, element_1.createElement)("svg", { width: "8", height: "14", viewBox: "0 0 8 14", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    (0, element_1.createElement)("rect", { width: "2", height: "2", fill: "#757575" }),
    (0, element_1.createElement)("rect", { y: "6", width: "2", height: "2", fill: "#757575" }),
    (0, element_1.createElement)("rect", { y: "12", width: "2", height: "2", fill: "#757575" }),
    (0, element_1.createElement)("rect", { x: "6", width: "2", height: "2", fill: "#757575" }),
    (0, element_1.createElement)("rect", { x: "6", y: "6", width: "2", height: "2", fill: "#757575" }),
    (0, element_1.createElement)("rect", { x: "6", y: "12", width: "2", height: "2", fill: "#757575" })));
exports.DraggableIcon = DraggableIcon;
