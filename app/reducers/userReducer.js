import {UserActionTypes} from '../actionTypes';

const initialState = {
    fingerprint: '',
    id: '',
    username: '',
    password: '',
};

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case UserActionTypes.CHANGE_FINGERPRINT:
            return {
                ...state, fingerprint: action.fingerprint
            };
        case UserActionTypes.SIGN_IN_RESPONSE:
            return {
                ...state, ...action.user
            };
        case UserActionTypes.SIGN_UP_RESPONSE:
            return {
                ...state, ...action.user
            };
        default:
            return state
    }
}
