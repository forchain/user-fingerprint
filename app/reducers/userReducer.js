import {UserActionTypes} from '../actionTypes';

const initialState = {
    fingerprint: '',
};

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case UserActionTypes.CHANGE_FINGERPRINT:
            return {
                ...state, fingerprint: action.fingerprint
            };
        default:
            return state
    }
}
