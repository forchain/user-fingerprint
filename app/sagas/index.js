import {fork} from 'redux-saga/effects'
import {newTodoFlow, getTodoListFlow, editTodoFlow, getTodoFlow, deleteTodoFlow} from './newTodoSaga'
import {signUpFlow, signInFlow} from './userSaga'

export default function* rootSaga() {
    yield fork(newTodoFlow);
    yield fork(getTodoListFlow);
    yield fork(getTodoFlow);
    yield fork(editTodoFlow);
    yield fork(deleteTodoFlow);

    yield fork(signUpFlow);
    yield fork(signInFlow);
}
