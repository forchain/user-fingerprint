import {take, call, put, select} from 'redux-saga/effects';
import {get, post, update, remove} from '../fetch';
import {TodoActionTypes, IndexActionTypes, UserActionTypes} from '../actionTypes';

import {userService} from '../services'

export function* getFingerprint() {
    let fingerprint = yield select(state => {
        return state.user.fingerprint
    });
    if (!fingerprint) {
        fingerprint = yield call(userService.getFingerprintPromise);
        yield put({type: UserActionTypes.CHANGE_FINGERPRINT, fingerprint})
    }

    return yield  fingerprint
}

export function* saveUser(username, password) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        let fingerprint = yield call(getFingerprint);
        let data = {username, password};
        return yield call(post, '/users', data, {headers: {fingerprint}});
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: "Can't Save Todo", msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* newUserFlow() {
    while (true) {
        let request = yield take(UserActionTypes.SIGN_UP);
        let res = yield call(saveUser, request.username, request.password);
        yield put({type: UserActionTypes.SIGN_UP_RESPONSE, user: res || {}})
    }
}
