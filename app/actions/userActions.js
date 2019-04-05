import {UserActionTypes as actionTypes} from '../actionTypes'

export const change_fingerprint = (fingerprint) => {
    return {
        type: actionTypes.CHANGE_FINGERPRINT,
        fingerprint
    }
};
