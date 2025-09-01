import { Button } from '@wordpress/components';
import type { InstallPluginsResponse } from '@fincommerce/data';
type ButtonProps = React.ComponentProps<typeof Button>;
type PluginsProps = {
    onComplete: (activePlugins: string[], response: InstallPluginsResponse) => void;
    onError: (errors: unknown, response: InstallPluginsResponse) => void;
    onClick?: () => void;
    onSkip?: () => void;
    skipText?: string;
    autoInstall?: boolean;
    pluginSlugs?: string[];
    onAbort?: () => void;
    abortText?: string;
    installText?: string;
    installButtonVariant?: ButtonProps['variant'];
    learnMoreLink?: string;
    learnMoreText?: string;
    onLearnMore?: () => void;
};
export declare const Plugins: ({ autoInstall, onAbort, onComplete, onError, onClick, pluginSlugs, onSkip, installText, skipText, abortText, installButtonVariant, learnMoreLink, learnMoreText, onLearnMore, }: PluginsProps) => JSX.Element | null;
export default Plugins;
//# sourceMappingURL=index.d.ts.map