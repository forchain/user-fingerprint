import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import {Home} from './Home';
import {TodoManage} from './TodoManage';
import {Fingerprint} from '../components/Fingerprint';
import style from './style.css';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {indexActions, userActions} from '../actions'

import {userService} from '../services'

class IndexApp extends Component {

    componentDidMount() {
        const {userActions} = this.props;

        userService.updateFingerprint((fpId) => {
            userActions.change_fingerprint(fpId);
        })
    }

    render() {
        return (
            <div>
                <h1 className='app-page-title'>Todo Manager</h1>
                <Fingerprint fingerprint={this.props.user.fingerprint}/>
                <Router>
                    <Switch>
                        <Route exact path={'/'} component={Home}/>
                        <Route exact path={'/create-todo'} component={TodoManage}/>
                        <Route exact path={'/create-todo/:id'} component={TodoManage}/>
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
