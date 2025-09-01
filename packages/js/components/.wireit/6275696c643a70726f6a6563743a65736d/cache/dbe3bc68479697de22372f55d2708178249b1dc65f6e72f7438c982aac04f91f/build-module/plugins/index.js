/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { createElement, Fragment, useState, useEffect, } from '@wordpress/element';
import { useCallback } from 'react';
import { useDispatch, useSelect } from '@wordpress/data';
import { pluginsStore } from '@fincommerce/data';
export const Plugins = ({ autoInstall = false, onAbort, onComplete, onError = () => null, onClick = () => null, pluginSlugs = ['fincommerce-services'], onSkip, installText = __('Install & enable', 'fincommerce'), skipText = __('No thanks', 'fincommerce'), abortText = __('Abort', 'fincommerce'), installButtonVariant = 'primary', learnMoreLink, learnMoreText = __('Learn more', 'fincommerce'), onLearnMore, }) => {
    const [hasErrors, setHasErrors] = useState(false);
    // Tracks action so that multiple instances of this button don't all light up when one is clicked
    const [hasBeenClicked, setHasBeenClicked] = useState(false);
    const { installAndActivatePlugins } = useDispatch(pluginsStore);
    const { isRequesting } = useSelect((select) => {
        const { getActivePlugins, getInstalledPlugins, isPluginsRequesting } = select(pluginsStore);
        return {
            isRequesting: isPluginsRequesting('activatePlugins') ||
                isPluginsRequesting('installPlugins'),
            activePlugins: getActivePlugins(),
            installedPlugins: getInstalledPlugins(),
        };
    }, []);
    const handleErrors = useCallback((errors, response) => {
        setHasErrors(true);
        onError(errors, response);
    }, [onError]);
    const handleSuccess = useCallback((plugins, response) => {
        onComplete(plugins, response);
    }, [onComplete]);
    const installAndActivate = useCallback(async (event) => {
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
    useEffect(() => {
        if (autoInstall) {
            installAndActivate();
        }
    }, [autoInstall]);
    if (hasErrors) {
        return (createElement(Fragment, null,
            createElement(Button, { variant: "primary", isBusy: isRequesting, onClick: installAndActivate }, __('Retry', 'fincommerce')),
            onSkip && (createElement(Button, { onClick: onSkip }, __('Continue without installing', 'fincommerce')))));
    }
    if (autoInstall) {
        return null;
    }
    if (!pluginSlugs.length) {
        return (createElement(Fragment, null,
            createElement(Button, { variant: "primary", isBusy: isRequesting, onClick: onSkip }, __('Continue', 'fincommerce'))));
    }
    return (createElement(Fragment, null,
        createElement(Button, { isBusy: isRequesting && hasBeenClicked, variant: isRequesting && hasBeenClicked
                ? 'primary' // set to primary when busy, the other variants look weird when combined with isBusy
                : installButtonVariant, disabled: isRequesting && hasBeenClicked, onClick: () => {
                onClick();
                setHasBeenClicked(true);
                installAndActivate();
            } }, installText),
        onSkip && (createElement(Button, { variant: "tertiary", onClick: onSkip }, skipText)),
        learnMoreLink && (createElement("a", { href: learnMoreLink, target: "_blank", rel: "noreferrer" },
            createElement(Button, { variant: "tertiary", onClick: onLearnMore }, learnMoreText))),
        onAbort && (createElement(Button, { variant: "tertiary", onClick: onAbort }, abortText))));
};
export default Plugins;
