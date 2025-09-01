type SidebarNavigationItemProps = {
    className?: string;
    icon?: React.JSX.Element;
    suffix?: string;
    withChevron?: boolean;
    uid?: string;
    params?: Record<string, string>;
    onClick?: (e: React.MouseEvent) => void;
    children: React.ReactNode;
};
export default function SidebarNavigationItem({ className, icon, withChevron, suffix, uid, params, onClick, children, ...props }: SidebarNavigationItemProps): JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map