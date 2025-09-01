type SectionProps = {
    /** The wrapper component for this section. Optional, defaults to `div`. If passed false, no wrapper is used. Additional props passed to Section are passed on to the component. */
    component?: React.ComponentType<{
        className?: string;
    }> | string | false;
    /** Optional classname */
    className?: string;
    /** The children inside this section, rendered in the `component`. This increases the context level for the next heading used. */
    children: React.ReactNode;
};
/**
 * The section wrapper, used to indicate a sub-section (and change the header level context).
 */
export declare const Section: React.VFC<SectionProps>;
export {};
//# sourceMappingURL=section.d.ts.map