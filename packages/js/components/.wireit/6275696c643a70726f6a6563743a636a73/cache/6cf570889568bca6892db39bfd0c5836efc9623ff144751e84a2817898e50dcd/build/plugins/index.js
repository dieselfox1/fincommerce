"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plugins = void 0;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const react_1 = require("react");
const data_1 = require("@wordpress/data");
const data_2 = require("@fincommerce/data");
const Plugins = ({ autoInstall = false, onAbort, onComplete, onError = () => null, onClick = () => null, pluginSlugs = ['fincommerce-services'], onSkip, installText = (0, i18n_1.__)('Install & enable', 'fincommerce'), skipText = (0, i18n_1.__)('No thanks', 'fincommerce'), abortText = (0, i18n_1.__)('Abort', 'fincommerce'), installButtonVariant = 'primary', learnMoreLink, learnMoreText = (0, i18n_1.__)('Learn more', 'fincommerce'), onLearnMore, }) => {
    const [hasErrors, setHasErrors] = (0, element_1.useState)(false);
    // Tracks action so that multiple instances of this button don't all light up when one is clicked
    const [hasBeenClicked, setHasBeenClicked] = (0, element_1.useState)(false);
    const { installAndActivatePlugins } = (0, data_1.useDispatch)(data_2.pluginsStore);
    const { isRequesting } = (0, data_1.useSelect)((select) => {
        const { getActivePlugins, getInstalledPlugins, isPluginsRequesting } = select(data_2.pluginsStore);
        return {
            isRequesting: isPluginsRequesting('activatePlugins') ||
                isPluginsRequesting('installPlugins'),
            activePlugins: getActivePlugins(),
            installedPlugins: getInstalledPlugins(),
        };
    }, []);
    const handleErrors = (0, react_1.useCallback)((errors, response) => {
        setHasErrors(true);
        onError(errors, response);
    }, [onError]);
    const handleSuccess = (0, react_1.useCallback)((plugins, response) => {
        onComplete(plugins, response);
    }, [onComplete]);
    const installAndActivate = (0, react_1.useCallback)(async (event) => {
        if (event) {
            event.preventDefault();
        }
        // Avoid double activating.
        if (isRequesting) {
            return false;
        }
        installAndActivatePlugins(pluginSlugs)
            .then((response) => {
            handleSuccess(response.data.activated, response);
        })
            .catch((response) => {
            setHasBeenClicked(false);
            handleErrors(response.errors, response);
        });
    }, [
        handleErrors,
        handleSuccess,
        installAndActivatePlugins,
        isRequesting,
        pluginSlugs,
    ]);
    (0, element_1.useEffect)(() => {
        if (autoInstall) {
            installAndActivate();
        }
    }, [autoInstall]);
    if (hasErrors) {
        return ((0, element_1.createElement)(element_1.Fragment, null,
            (0, element_1.createElement)(components_1.Button, { variant: "primary", isBusy: isRequesting, onClick: installAndActivate }, (0, i18n_1.__)('Retry', 'fincommerce')),
            onSkip && ((0, element_1.createElement)(components_1.Button, { onClick: onSkip }, (0, i18n_1.__)('Continue without installing', 'fincommerce')))));
    }
    if (autoInstall) {
        return null;
    }
    if (!pluginSlugs.length) {
        return ((0, element_1.createElement)(element_1.Fragment, null,
            (0, element_1.createElement)(components_1.Button, { variant: "primary", isBusy: isRequesting, onClick: onSkip }, (0, i18n_1.__)('Continue', 'fincommerce'))));
    }
    return ((0, element_1.createElement)(element_1.Fragment, null,
        (0, element_1.createElement)(components_1.Button, { isBusy: isRequesting && hasBeenClicked, variant: isRequesting && hasBeenClicked
                ? 'primary' // set to primary when busy, the other variants look weird when combined with isBusy
                : installButtonVariant, disabled: isRequesting && hasBeenClicked, onClick: () => {
                onClick();
                setHasBeenClicked(true);
                installAndActivate();
            } }, installText),
        onSkip && ((0, element_1.createElement)(components_1.Button, { variant: "tertiary", onClick: onSkip }, skipText)),
        learnMoreLink && ((0, element_1.createElement)("a", { href: learnMoreLink, target: "_blank", rel: "noreferrer" },
            (0, element_1.createElement)(components_1.Button, { variant: "tertiary", onClick: onLearnMore }, learnMoreText))),
        onAbort && ((0, element_1.createElement)(components_1.Button, { variant: "tertiary", onClick: onAbort }, abortText))));
};
exports.Plugins = Plugins;
exports.default = exports.Plugins;
