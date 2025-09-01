import { BlockFillProps } from '../types';
export type SectionActionsProps = Omit<BlockFillProps, 'name' | 'slotContainerBlockName'> & {
    containerBlockName?: string | string[];
};
export declare function SectionActions({ containerBlockName, ...restProps }: SectionActionsProps): JSX.Element;
//# sourceMappingURL=index.d.ts.map