import * as actionTypes from '../actionTypes/indexActionTypes';

export const change_fingerprint = (fingerprint) => {
    return {
        type: actionTypes.CHANGE_FINGERPRINT,
        fingerprint
    }
};
