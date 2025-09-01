interface LinkProps {
    /** Type of link. For wp-admin and wc-admin, the correct prefix is appended. */
    type?: 'wc-admin' | 'wp-admin' | 'external';
    /** The resource to link to. */
    href: string;
}
/**
 * Use `Link` to create a link to another resource. It accepts a type to automatically
 * create wp-admin links, wc-admin links, and external links.
 */
export declare const Link: ({ href, children, type, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps) => React.ReactElement;
export default Link;
//# sourceMappingURL=index.d.ts.map