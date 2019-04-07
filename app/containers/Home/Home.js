import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {AddButton} from '../../components/AddButton';
import {TodoList} from '../TodoList';

import {connect} from 'react-redux';
import {indexActions} from '../../actions';
import {bindActionCreators} from 'redux';

class Home extends Component {

    constructor(props) {
        super(props);

        this.props.indexActions.set_title('ToDo Manager');
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

function mapDispatchToProps(dispatch) {
    return {
        indexActions: bindActionCreators(indexActions, dispatch),
    }
}
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Home));
