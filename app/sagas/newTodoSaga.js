import {take, call, put, select} from 'redux-saga/effects';
import {get, post, update, remove} from '../fetch';
import {TodoActionTypes, IndexActionTypes, UserActionTypes} from '../actionTypes';

import {userService} from '../services'

export function* getTodoList() {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        let userid = yield call(userService.getId);
        return yield call(get, `/todo`, {headers: {userid}});
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: "Can't Get Todo List", msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* getTodoListFlow() {
    while (true) {
        let req = yield take(TodoActionTypes.GET_TODOS);
        let res = yield call(getTodoList);
        if (res) {
            yield put({type: TodoActionTypes.GET_TODOS_RESPONSE, data: res})
        }
    }
}

export function* getTodo(id) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        let userid = yield call(userService.getId);
        return yield call(get, `/todo/${id}`, {headers: {userid}});
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: "Can't Get Todo List", msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* getTodoFlow() {
    while (true) {
        let req = yield take(TodoActionTypes.GET_TODO_BY_ID);
        let res = yield call(getTodo, req.id);
        if (res) {

            yield put({type: TodoActionTypes.GET_TODO_BY_ID_RESPONSE, data: res})
        }
    }
}

export function* editTodo(id, name, description, deadline) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        let data = {id, name, description, deadline};
        let userid = yield call(userService.getId);
        return yield call(update, `/todo`, data, {headers: {userid}});
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: "Can't Get Todo List", msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* editTodoFlow() {
    while (true) {
        let req = yield take(TodoActionTypes.EDIT_TODO);
        let res = yield call(editTodo, req.id, req.name, req.description, req.deadline);
        if (res) {
            yield put({type: TodoActionTypes.GET_TODOS_RESPONSE, data: res})
        }
    }
}

export function* deleteTodo(id) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        let userid = yield call(userService.getId);
        return yield call(remove, `/todo/${id}`, {headers: {userid}});
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: "Can't Delete Todo", msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* deleteTodoFlow() {
    while (true) {
        let req = yield take(TodoActionTypes.DELETE_TODO);
        let delResult = yield call(deleteTodo, req.id);
        let res = yield call(getTodoList);
        if (res) {
            yield put({type: TodoActionTypes.GET_TODOS_RESPONSE, data: res})
        }
    }
}

export function* saveTodo(data) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        let id = yield select(state => {
            state.id
        });

        let userid = yield call(userService.getId);
        if (id) {
            data.id = id;
            return yield call(put, '/todo', data, {headers: {userid}});
        } else {
            return yield call(post, '/todo', data, {headers: {userid}});
        }

    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: "Can't Save Todo", msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* newTodoFlow() {
    while (true) {
        let request = yield take(TodoActionTypes.CREATE_TODO);
        let res = yield call(saveTodo, request);
        if (res) {
            if (res.code === 200) {
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res, msgType: 1});
            }
        }
    }
}
