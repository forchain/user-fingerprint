import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import {Home} from './Home';
import {TodoManage} from './TodoManage';
import {SignUp} from './SignUp';
import {SignIn} from './SignIn';
import {Fingerprint} from '../components/Fingerprint';
import style from './style.css';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {indexActions, userActions} from '../actions'

import {userService} from '../services'
import {PrivateRoute} from '../components/PrivateRoute';
import {MessageDialog} from '../components/MessageDialog';


class IndexApp extends Component {

    constructor(props) {
        super(props);

        this.handleDialogClose = this.handleDialogClose.bind(this);
    }

    handleDialogClose() {
        this.props.indexActions.clear_message();
    }

    render() {
        const {msg} = this.props.index;
        const authenticated = !!this.props.user.id;
        return (
            <div>
                <h1 className='app-page-title'>Todo Manager</h1>
                <Fingerprint fingerprint={this.props.user.fingerprint}/>
                <MessageDialog
                    title="Attention"
                    open={msg != null}
                    onRequestClose={this.handleDialogClose}
                    message={msg && msg.content}
                />
                < Router>
                    < Switch>
                        < Route
                            authenticated={authenticated}
                            exact
                            path={'/'}
                            component={Home}
                        />
                        <Route authenticated={authenticated} exact path={'/create-todo'} component={TodoManage}/>
                        < Route
                            authenticated={authenticated}
                            exact
                            path={'/create-todo/:id'}
                            component={TodoManage}
                        />
                        <Route exact path={'/sign-up'} component={SignUp}/>
                        < Route
                            exact
                            path={'/sign-in'}
                            component={SignUp}
                        />
                    </Switch>
                </Router>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        index: state.index,
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        indexActions: bindActionCreators(indexActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IndexApp);
