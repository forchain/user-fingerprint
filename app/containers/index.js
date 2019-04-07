import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import {Home} from './Home';
import {TodoManage} from './TodoManage';
import {Sign} from './Sign';
import style from './style.css';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {indexActions, userActions} from '../actions'

import {userService} from '../services'
import {PrivateRoute} from '../components/PrivateRoute';
import {MessageDialog} from '../components/MessageDialog';

import {AppBar, Paper, Drawer, MenuItem} from 'material-ui'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class IndexApp extends Component {

    constructor(props) {
        super(props);

        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.handleToggleNavigation = this.handleToggleNavigation.bind(this);

        this.state = {
            navigationOpen: false,
        }
    }

    handleDialogClose() {
        this.props.indexActions.clear_message();
    }

    handleToggleNavigation() {

        this.setState({navigationOpen: !this.state.navigationOpen})
    }

    render() {
        const {msg} = this.props.index;
        const {user, index} = this.props;
        const authenticated = !!user.id;
        return (
            <Paper>
                <AppBar
                    title={index.title}
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonClick={this.handleToggleNavigation}
                />
                <Card>
                    {user.id &&
                    <CardTitle title={user.username} subtitle={user.fingerprint}/>
                    }
                    <CardText>
                        <MessageDialog
                            title="Attention"
                            open={msg != null}
                            onRequestClose={this.handleDialogClose}
                            message={msg && msg.content}
                        />
                        < Router>
                            <div>
                                < Switch>
                                    <PrivateRoute
                                        authenticated={authenticated}
                                        exact
                                        path={'/'}
                                        component={Home}
                                    />
                                    <PrivateRoute authenticated={authenticated} exact path={'/create-todo'}
                                                  component={TodoManage}/>
                                    <PrivateRoute
                                        authenticated={authenticated}
                                        exact
                                        path={'/create-todo/:id'}
                                        component={TodoManage}
                                    />
                                    <Route exact path={'/sign-up'} component={Sign}/>
                                    <Route
                                        exact
                                        path={'/sign-in'}
                                        component={Sign}
                                    />
                                </Switch>

                                <Drawer docked={false} open={this.state.navigationOpen}
                                        onRequestChange={(open) => this.setState({navigationOpen: open})}>
                                    <MenuItem><a href={'/'}>Home</a></MenuItem>
                                    <MenuItem><a href={'/sign-in'}>Sign In</a></MenuItem>
                                    <MenuItem><a href={'/sign-up'}>Sign Up</a></MenuItem>
                                </Drawer>
                            </div>
                        </Router>
                    </CardText>
                </Card>
                <Router>
                </Router>

            </Paper>
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
