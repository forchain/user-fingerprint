import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {indexActions, todoActions} from '../../actions';
import {TodoForm} from '../../components/TodoForm';

class TodoManage extends Component {

    constructor(props) {
        super(props);
        this.addTodo = this.addTodo.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeDescription = this.changeDescription.bind(this);
        this.changeDeadline = this.changeDeadline.bind(this);
    }

    componentDidMount() {
        const {match} = this.props;
        const {id} = match.params;
        if (id) {
            this.props.todoActions.get_todo_by_id(id);
            this.props.indexActions.set_title('Edit ToDo');
        } else {
            this.props.todoActions.clear_todo_data();
            this.props.indexActions.set_title('Create ToDo');
        }
    }

    changeName(event) {
        const {todoActions} = this.props;
        todoActions.change_todo_name(event.target.value);
    }

    changeDescription(event) {
        const {todoActions} = this.props;
        todoActions.change_todo_description(event.target.value);
    }

    changeDeadline(time) {
        const {todoActions} = this.props;
        todoActions.change_todo_deadline(time);
    }

    addTodo(event) {
        const {todoActions, history, todo} = this.props;
        const {name, description, deadline, id} = todo;

        event.preventDefault();
        todo.id
            ? todoActions.edit_todo(name, description, deadline, id)
            : todoActions.create_todo(name, description, deadline);
        history.push('/');
    }

    render() {
        const {todo} = this.props;

        return (
            <TodoForm
                todo={todo}
                onFormSubmit={this.addTodo}
                onNameChange={this.changeName}
                onDescriptionChange={this.changeDescription}
                onDeadlineChange={this.changeDeadline}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        todo: state.todo,
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        todoActions: bindActionCreators(todoActions, dispatch),
        indexActions: bindActionCreators(indexActions, dispatch),
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoManage));
