import {todoReducer as todo} from './todoReducer'
import {userReducer as user} from './userReducer'
import {combineReducers} from 'redux';
import {IndexActionTypes} from '../actionTypes';

const initialState = {
    isFetching: true,
    msg: null,
    title: 'ToDo Manager',
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case IndexActionTypes.FETCH_START:
            return {
                ...state, isFetching: true
            };
        case IndexActionTypes.FETCH_END:
            return {
                ...state, isFetching: false
            };
        case IndexActionTypes.SET_MESSAGE:
            return {
                ...state,
                isFetching: false,
                msg: {
                    type: action.msgType,
                    content: action.msgContent
                }
            };
        case IndexActionTypes.CLEAR_MESSAGE:
            return {
                ...state, msg: null
            };
        case IndexActionTypes.SET_TITLE:
            return {
                ...state, title: action.title,
            };
        default:
            return state
    }
}

// state.todo is defined here
export default combineReducers({todo, index: reducer, user})
