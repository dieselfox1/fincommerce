import { Component } from '@wordpress/element';
import { Option, Selected } from './types';
type Props = {
    /**
     * Function called when selected results change, passed result list.
     */
    onChange: (selected: Option[]) => void;
    /**
     * An array of objects describing selected values. If the label of the selected
     * value is omitted, the Tag of that value will not be rendered inside the
     * search box.
     */
    selected?: Selected;
    /**
     * Render a 'Clear' button next to the input box to remove its contents.
     */
    showClearButton?: boolean;
};
/**
 * A list of tags to display selected items.
 */
declare class Tags extends Component<Props> {
    constructor(props: Props);
    removeAll(): void;
    removeResult(key: string | undefined): () => void;
    render(): JSX.Element | null;
}
export default Tags;
//# sourceMappingURL=tags.d.ts.map