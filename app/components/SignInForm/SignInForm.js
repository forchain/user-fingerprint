import React, {PureComponent} from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/TextField';


class SignInForm extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const {user, onFormSubmit} = this.props;

        return (
            <div>
                <Paper>
                    <form onSubmit={(event) => onFormSubmit(event)}>
                        <TextField hintText="User Name" required>
                        </TextField>

                        <TextField hintText="Password" required type="password">
                        </TextField>

                        <RaisedButton label="SignIn" primary={true}/>
                    </form>
                </Paper>
            </div>
        )
    }
}

export default SignInForm;
