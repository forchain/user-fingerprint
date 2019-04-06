import {UserActionTypes as actionTypes} from '../actionTypes'

export const change_fingerprint = (fingerprint) => {
    return {
        type: actionTypes.CHANGE_FINGERPRINT,
        fingerprint
    }
};


export const sign_up = (username, password) => {
    return {
        type: actionTypes.SIGN_UP,
        username,
        password
    }
};

export const sign_in = (username, password) => {
    return {
        type: actionTypes.SIGN_IN,
        username,
        password
    }
};

export const sign_out = () => {
    return {
        type: actionTypes.SIGN_OUT,
    }
};
