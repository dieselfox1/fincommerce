/**
 * Internal dependencies
 */
import { Route } from './types';
type LayoutProps = {
    route: Route;
    settingsPage?: SettingsPage;
    activeSection?: string;
    tabs?: Array<{
        name: string;
        title: string;
    }>;
};
export declare function Layout({ route, settingsPage, tabs, activeSection, }: LayoutProps): JSX.Element;
export {};
//# sourceMappingURL=layout.d.ts.map