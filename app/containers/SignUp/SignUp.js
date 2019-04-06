import React, {Component} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';

import {SignUpForm} from '../../components/SignUpForm'

import {userActions} from '../../actions';


class SignUp extends Component {
    constructor(props) {
        super(props);

        this.signUp = this.signUp.bind(this);
    }

    signUp(username, password) {
        const {actions} = this.props;
        actions.sign_up(username, password);
    }

    render() {
        const {user} = this.props;
        if (user.id) {
            return (
                <div>hello, {user.username}</div>
            )
        } else {
            return (
                <SignUpForm onFormSubmit={this.signUp}/>
            )
        }
    }
}


function mapStateToProps(state) {
    return {
        user: state.user,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch)
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp));
