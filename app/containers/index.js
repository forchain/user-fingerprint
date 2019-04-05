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
import Fingerprint2 from "fingerprintjs2";

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as indexActions from '../actions/indexAction';


class IndexApp extends Component {

    componentDidMount() {
        const {actions} = this.props;

        Fingerprint2.get(function (components) {
            const fp = Fingerprint2.x64hash128(components.map(function (pair) {
                return pair.value
            }).join(), 31);
            actions.change_fingerprint(fp);
        });
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
