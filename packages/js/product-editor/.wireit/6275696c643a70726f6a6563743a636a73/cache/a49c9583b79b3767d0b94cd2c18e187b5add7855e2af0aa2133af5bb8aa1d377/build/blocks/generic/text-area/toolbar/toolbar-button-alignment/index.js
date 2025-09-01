"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALIGNMENT_CONTROLS = void 0;
exports.default = AlignmentToolbarButton;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const icons_1 = require("@wordpress/icons");
const block_editor_1 = require("@wordpress/block-editor");
exports.ALIGNMENT_CONTROLS = [
    {
        icon: icons_1.alignLeft,
        title: (0, i18n_1.__)('Align text left', 'fincommerce'),
        align: 'left',
    },
    {
        icon: icons_1.alignCenter,
        title: (0, i18n_1.__)('Align text center', 'fincommerce'),
        align: 'center',
    },
    {
        icon: icons_1.alignRight,
        title: (0, i18n_1.__)('Align text right', 'fincommerce'),
        align: 'right',
    },
    {
        icon: icons_1.alignJustify,
        title: (0, i18n_1.__)('Align text justify', 'fincommerce'),
        align: 'justify',
    },
];
function AlignmentToolbarButton({ align, setAlignment, }) {
    return ((0, element_1.createElement)(block_editor_1.AlignmentControl, { alignmentControls: exports.ALIGNMENT_CONTROLS, value: align, onChange: setAlignment }));
}
