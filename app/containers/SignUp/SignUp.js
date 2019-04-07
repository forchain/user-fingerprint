import React, {Component} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';

import {SignUpForm} from '../../components/SignUpForm'

import {userActions} from '../../actions';

import {Redirect} from 'react-router-dom';


class SignUp extends Component {
    constructor(props) {
        super(props);

        this.signUp = this.signUp.bind(this);

        this.state = {
            signType: 'up'
        }
    }

    componentDidMount() {
        const {match} = this.props;
        if (match.path === '/sign-in') {
            this.setState({signType: 'in'})
        }
    }

    signUp(username, password) {
        const {actions} = this.props;
        if (this.state.signType === 'up') {
            actions.sign_up(username, password);
        } else {
            actions.sign_in(username, password);
        }
    }


    render() {
        const {user} = this.props;
        return (
            <div>
                {user.id ? (
                    <Redirect to={{pathname: '/', state: {from: this.props.location}}}/>
                ) : (
                    <div>
                        <SignUpForm onFormSubmit={this.signUp} type={this.state.signType}/>
                    </div>
                )}
            </div>
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
)(SignUp));
