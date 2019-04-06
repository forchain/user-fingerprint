import React, {PureComponent} from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


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
                <Paper className='paper'>
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
                            <RaisedButton label="SignUp" primary={true} type='submit'/>
                        </div>
                    </form>
                </Paper>
            </div>
        )
    }
}

export default SignUpForm;
