import React, {Component} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';

import {SignInForm} from '../../components/SignInForm'

import * as userActions from '../../actions/userActions';


class SignIn extends Component {
    constructor(props) {
        super(props);

        this.signIn = this.signIn.bind(this);
    }

    signIn(event) {
        event.preventDefault();
        history.push('/');
    }

    render() {
        const {user} = this.props;

        return (
            <SignInForm onFormSubmit={this.signIn} user={user}/>
        )
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
)(SignIn));
