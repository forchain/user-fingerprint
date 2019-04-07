import {take, call, put, select} from 'redux-saga/effects';
import {get, post, update, remove} from '../fetch';
import {TodoActionTypes, IndexActionTypes, UserActionTypes} from '../actionTypes';

import {userService} from '../services'

export function* saveUser(username, password) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        let fingerprint = yield call(userService.getFingerprint);
        let data = {username, password, fingerprint};
        let userid = yield call(userService.getId);
        return yield call(post, '/users', data, {headers: {userid}});
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: "Can't Save Todo", msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* signUpFlow() {
    while (true) {
        let request = yield take(UserActionTypes.SIGN_UP);
        let res = yield call(saveUser, request.username, request.password);
        if (res) {
            if (res.code === 1) {
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: "Username conflicts", msgType: 1});
            } else {
                yield put({type: UserActionTypes.SIGN_UP_RESPONSE, user: res})
            }
        }
    }
}

export function* signIn(username, password) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        let data = {username, password};
        return yield call(post, '/sessions', data);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: "Can't Save Todo", msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* signInFlow() {
    while (true) {
        let request = yield take(UserActionTypes.SIGN_IN);
        let res = yield call(signIn, request.username, request.password);
        if (res) {
            if (res.code === 1) {
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: "No User", msgType: 1});
            } else {
                let fingerprint = yield call(userService.getFingerprint);
                if (res.user.fingerprint === fingerprint) {
                    yield put({type: UserActionTypes.SIGN_IN_RESPONSE, user: {...res.user}})
                } else {
                    yield put({
                        type: IndexActionTypes.SET_MESSAGE, msgType: 2,
                        msgContent: `You should use our service on your SIGN-UP DEVICE! Former:${res.user.fingerprint} Current:${fingerprint}`
                    });
                }
            }
        } else {
            yield put({
                type: IndexActionTypes.SET_MESSAGE, msgType: 3,
                msgContent: `NO response`
            });
        }
    }
}
