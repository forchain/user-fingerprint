import React, {PureComponent} from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Link} from "react-router-dom";


import style from './style.css'

class SignUpForm extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            username: ''
            , password: ''
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        let {onFormSubmit} = this.props;
        onFormSubmit(this.state.username, this.state.password);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <TextField hintText="User Name" required onChange={this.handleUsernameChange}
                                   underlineShow={false} fullWidth={false}/>
                    </div>

                    <div>
                        <TextField hintText="Password" required type="password" onChange={this.handlePasswordChange}
                                   underlineShow={false} fullWidth={false}/>
                    </div>
                    <div>
                        {this.props.isUp ? (
                            <span>
                                    <RaisedButton label="Sign Up" primary={true} type="submit"/>
                                {/*<Link to="/sign-in">*/}
                                {/*    <FlatButton label="Sign In" secondary={true}/>*/}
                                {/*</Link>*/}
                                <a href={'/sign-in'}><FlatButton label="Sign In" secondary={true}/></a>
                                </span>
                        ) : (
                            <span>
                                    <RaisedButton label="Sign In" primary={true} type="submit"/>
                                {/*<Link to="/sign-up">*/}
                                {/*    <FlatButton label="Sign Up" secondary={true}/>*/}
                                {/*</Link>*/}
                                <a href={'/sign-up'}><FlatButton label="Sign Up" secondary={true}/></a>
                                </span>
                        )}
                    </div>
                </form>
            </div>
        )
    }
}

export default SignUpForm;
