import * as actionTypes from '../actionTypes/indexActionTypes';


export const clear_message = () => {
    return {
        type: actionTypes.CLEAR_MESSAGE,
    }
};

export const set_title = (title) => {
    return {
        type: actionTypes.SET_TITLE,
        title,
    }
};


