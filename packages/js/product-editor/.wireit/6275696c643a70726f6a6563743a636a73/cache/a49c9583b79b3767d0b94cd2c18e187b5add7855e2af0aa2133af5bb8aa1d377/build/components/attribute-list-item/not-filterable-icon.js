"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NotFilterableIcon;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
function NotFilterableIcon({ width = 24, height = 24, ...props }) {
    return ((0, element_1.createElement)("svg", { ...props, width: width, height: height, viewBox: `0 0 ${width} ${height}`, fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        (0, element_1.createElement)("g", null,
            (0, element_1.createElement)("path", { d: "M10 17.5H14V16H10V17.5ZM6 6V7.5H18V6H6ZM8 12.5H16V11H8V12.5Z", fill: "#949494" }),
            (0, element_1.createElement)("rect", { x: "16.7734", y: "4", width: "1.22727", height: "16", transform: "rotate(30 16.7734 4)", fill: "#949494" }),
            (0, element_1.createElement)("rect", { x: "16", y: "3", width: "1.22727", height: "16", transform: "rotate(30 16 3)", fill: "white" })),
        (0, element_1.createElement)("defs", null,
            (0, element_1.createElement)("clipPath", { id: "clip0_4951_450432" },
                (0, element_1.createElement)("rect", { width: "24", height: "24", fill: "white" })))));
}
