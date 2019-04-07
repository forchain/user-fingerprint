import React, {Component} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';

import {SignUpForm} from '../../components/SignUpForm'

import {userActions, indexActions} from '../../actions';

import {Redirect} from 'react-router-dom';


class Sign extends Component {

    // actions = this.props.actions;

    constructor(props) {
        super(props);

        this.sign = this.sign.bind(this);

        this.state = {isUp: false}
    }

    componentDidMount() {
        const {match} = this.props;
        const isUp = match.path === '/sign-up';
        this.setState({isUp});

        if (isUp) {
            this.props.indexActions.set_title('Sign Up')
        } else {
            this.props.indexActions.set_title('Sign In')
        }
    }

    sign(username, password) {
        if (this.state.isUp) {
            this.props.userActions.sign_up(username, password);
        } else {
            this.props.userActions.sign_in(username, password);
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
                        <SignUpForm onFormSubmit={this.sign} isUp={this.state.isUp}/>
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
        indexActions: bindActionCreators(indexActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch)
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Sign));
