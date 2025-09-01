"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEditProductAction = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const icons_1 = require("@wordpress/icons");
const router_1 = require("@wordpress/router");
const i18n_1 = require("@wordpress/i18n");
/**
 * Internal dependencies
 */
const lock_unlock_1 = require("../../lock-unlock");
const { useHistory, useLocation } = (0, lock_unlock_1.unlock)(router_1.privateApis);
const useEditProductAction = ({ postType }) => {
    const history = useHistory();
    const location = useLocation();
    return (0, element_1.useMemo)(() => ({
        id: 'edit-product',
        label: (0, i18n_1.__)('Edit', 'fincommerce'),
        isPrimary: true,
        icon: icons_1.edit,
        supportsBulk: true,
        isEligible(product) {
            if (product.status === 'trash') {
                return false;
            }
            return true;
        },
        callback(items) {
            const product = items[0];
            history.push({
                ...location.params,
                postId: product.id,
                postType,
                quickEdit: true,
            });
        },
    }), [history, location.params]);
};
exports.useEditProductAction = useEditProductAction;
