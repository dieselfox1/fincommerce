"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomView = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const dompurify_1 = require("dompurify");
/**
 * Sometimes extensions will place a <script /> tag in the custom output of a settings field,
 * this function will extract the script content and return it as a SettingsField and the clean HTML.
 *
 * @param {string} html - The HTML content to process.
 * @return {Object} An object containing the clean HTML and script settings.
 */
const processCustomView = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const scripts = Array.from(doc.getElementsByTagName('script')).filter((script) => script.textContent?.trim());
    // Remove scripts from the HTML.
    scripts.forEach((script) => {
        script.remove();
    });
    return {
        cleanHTML: (0, dompurify_1.sanitize)(doc.documentElement.outerHTML),
        scripts,
    };
};
const SettingsScript = ({ script }) => {
    (0, element_1.useEffect)(() => {
        try {
            document.body.appendChild(script);
            return () => {
                document.body.removeChild(script);
            };
        }
        catch (error) {
            // eslint-disable-next-line no-console
            console.error('Failed to execute script:', error);
        }
    }, [script]);
    return null;
};
const CustomView = ({ html }) => {
    const { cleanHTML, scripts } = (0, element_1.useMemo)(() => processCustomView(html), [html]);
    return ((0, element_1.createElement)(element_1.Fragment, null,
        (0, element_1.createElement)("div", { dangerouslySetInnerHTML: { __html: cleanHTML } }),
        scripts.map((script, index) => ((0, element_1.createElement)(SettingsScript, { key: index, script: script })))));
};
exports.CustomView = CustomView;
