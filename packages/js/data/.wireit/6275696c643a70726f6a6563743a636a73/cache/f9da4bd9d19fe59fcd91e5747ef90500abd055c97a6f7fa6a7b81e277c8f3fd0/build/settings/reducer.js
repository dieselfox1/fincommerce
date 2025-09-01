"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const lodash_1 = require("lodash");
/**
 * Internal dependencies
 */
const action_types_1 = __importDefault(require("./action-types"));
const utils_1 = require("../utils");
const updateGroupDataInNewState = (newState, { group, groupIds, data, time, error, }) => {
    groupIds.forEach((id) => {
        newState[(0, utils_1.getResourceName)(group, id)] = {
            data: data[id],
            lastReceived: time,
            error,
        };
    });
    return newState;
};
const reducer = (state = {}, action) => {
    const newState = {};
    switch (action.type) {
        case action_types_1.default.SET_IS_REQUESTING:
            state = {
                ...state,
                [action.group]: {
                    ...state[action.group],
                    isRequesting: action.isRequesting,
                },
            };
            break;
        case action_types_1.default.CLEAR_IS_DIRTY:
            state = {
                ...state,
                [action.group]: {
                    ...state[action.group],
                    dirty: [],
                },
            };
            break;
        case action_types_1.default.UPDATE_SETTINGS_FOR_GROUP:
        case action_types_1.default.UPDATE_ERROR_FOR_GROUP:
            const { data, group, time } = action;
            const groupIds = data ? Object.keys(data) : [];
            const error = action.type === action_types_1.default.UPDATE_ERROR_FOR_GROUP
                ? action.error
                : null;
            if (data === null) {
                state = {
                    ...state,
                    [group]: {
                        data: state[group] ? state[group].data : [],
                        error,
                        lastReceived: time,
                    },
                };
            }
            else {
                const stateGroup = state[group];
                state = {
                    ...state,
                    [group]: {
                        data: stateGroup &&
                            stateGroup.data &&
                            Array.isArray(stateGroup.data)
                            ? [...stateGroup.data, ...groupIds]
                            : groupIds,
                        error,
                        lastReceived: time,
                        isRequesting: state[group]?.isRequesting || false,
                        dirty: state[group] && state[group].dirty
                            ? (0, lodash_1.union)(state[group].dirty, groupIds)
                            : groupIds,
                    },
                    ...updateGroupDataInNewState(newState, {
                        group,
                        groupIds,
                        data,
                        time,
                        error,
                    }),
                };
            }
            break;
        case action_types_1.default.CLEAR_SETTINGS:
            state = {};
    }
    return state;
};
exports.default = reducer;
