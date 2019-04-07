import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {AddButton} from '../../components/AddButton';
import {TodoList} from '../TodoList';

import {connect} from 'react-redux';

class Home extends Component {

    constructor(props) {
        super(props);
    }

    addTodo = () => {
        const {history} = this.props;
        history.push('/create-todo')
    };

    render() {
        return (
            <div>
                <TodoList/>
                <AddButton addButtonHandler={this.addTodo}/>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default withRouter(connect(
    mapStateToProps,
)(Home));
