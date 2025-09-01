export default Options;
export type InnerOption = import("./index").InnerOption;
/**
 * @typedef {import('./index').InnerOption} InnerOption
 */
/**
 * This component renders a list of options and its children recursively
 *
 * @param {Object}                        props                    Component parameters
 * @param {InnerOption[]}                 props.options            List of options to be rendered
 * @param {InnerOption}                   props.parent             Parent option
 * @param {Function}                      props.onChange           Callback when an option changes
 * @param {Function}                      [props.onExpanderClick]  Callback when an expander is clicked.
 * @param {(option: InnerOption) => void} [props.onToggleExpanded] Callback when requesting an expander to be toggled.
 */
declare function Options({ options, onChange, onExpanderClick, onToggleExpanded, parent, }: {
    options: InnerOption[];
    parent: InnerOption;
    onChange: Function;
    onExpanderClick?: Function | undefined;
    onToggleExpanded?: ((option: InnerOption) => void) | undefined;
}): (JSX.Element | null)[];
//# sourceMappingURL=options.d.ts.map