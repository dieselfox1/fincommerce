"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sidebar = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const url_1 = require("@wordpress/url");
const components_1 = require("@wordpress/components");
const IconPackage = __importStar(require("@wordpress/icons"));
const site_admin_1 = require("@automattic/site-admin");
const { Icon, ...icons } = IconPackage;
const SidebarNavigationScreenContent = ({ activePage, pages, }) => {
    return ((0, element_1.createElement)(components_1.__experimentalItemGroup, null, Object.keys(pages).map((slug) => {
        const { label, icon } = pages[slug];
        const isCurrentPage = activePage === slug;
        const to = isCurrentPage
            ? undefined
            : (0, url_1.addQueryArgs)('wc-settings', { tab: slug });
        return ((0, element_1.createElement)(site_admin_1.SidebarNavigationItem, { icon: icons[icon] ||
                icons.settings, "aria-current": isCurrentPage, uid: slug, key: slug, to: to }, label));
    })));
};
const Sidebar = ({ activePage, pages, pageTitle, }) => {
    return ((0, element_1.createElement)(site_admin_1.SidebarNavigationScreen, { title: pageTitle, isRoot: true, exitLink: (0, url_1.addQueryArgs)('admin.php', { page: 'wc-admin' }), content: (0, element_1.createElement)(SidebarNavigationScreenContent, { activePage: activePage, pages: pages }) }));
};
exports.Sidebar = Sidebar;
