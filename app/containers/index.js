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
import * as indexActions from '../actions/indexAction';

import {userService} from '../services'

class IndexApp extends Component {

    componentDidMount() {
        const {actions} = this.props;

        userService.getFingerprint((fpID) => {
            actions.change_fingerprint(fpID);
        })
    }

    render() {
        return (
            <div>
                <h1 className='app-page-title'>Todo Manager</h1>
                <Fingerprint fingerprint={this.props.index.fingerprint}/>
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
        index: state.index
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(indexActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IndexApp);
